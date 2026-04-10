import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import apiClient from "@/shared/api/apiClient";
import useAuthStore from "../store/useAuthStore";
import useAlertStore from "../store/useAlertStore";

export interface PushNotificationState {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () =>
      ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }) as any,
  });

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  
  const { isAuthenticated, token: userToken } = useAuthStore();

  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  async function registerForPushNotificationsAsync() {
    let token = null;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return null;
      }
      
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) {
        console.warn(
          "EAS ProjectId not found, push notifications might not work. Please ensure it is defined in app.json if using EAS.",
        );
      }

      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId: projectId,
          })
        ).data;
        return pushTokenString;
      } catch (e: any) {
        if (e.message.includes("FirebaseApp is not initialized")) {
          console.warn(
            "Push Notification Error: Firebase is not initialized. " +
              "To use push notifications on Android builds, you must add 'google-services.json' " +
              "and configure it in app.json. Skipping token registration.",
          );
        } else {
          console.error("Error fetching Expo token:", e);
        }
      }
    } else {
      console.log("Must use physical device for push notifications");
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          setExpoPushToken(token);
          console.log("📱 Expo Push Token:", token);
        }
      })
      .catch((err) => {
        console.warn("Push token generation failed gracefully:", err.message);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        // Refresh alerts when a notification is received
        useAlertStore.getState().fetchAlerts();
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User interacted with notification:", response);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  // Send token to backend only when authenticated
  useEffect(() => {
    if (isAuthenticated && expoPushToken && userToken) {
      apiClient
        .put("/auth/push-token", { pushToken: expoPushToken })
        .then(() => console.log("Push token sent to backend!"))
        .catch((err) => {
          console.error("Failed to send push token to backend:", err);
        });
    }
  }, [isAuthenticated, expoPushToken, userToken]);

  return { expoPushToken, notification };
};

