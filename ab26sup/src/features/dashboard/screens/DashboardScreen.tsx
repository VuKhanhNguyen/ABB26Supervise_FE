import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopAppBar } from "@/shared/components/TopAppBar";
import { HeroOdoCard } from "../components/HeroOdoCard";
import { ComponentStatusCard } from "../components/ComponentStatusCard";
import { useDashboard } from "../hooks/useDashboard";

import * as Notifications from 'expo-notifications';

export function DashboardScreen() {
  const { data, isLoading, error, refresh, updateOdo } = useDashboard();

  const handleUpdateOdo = async (newOdo: number) => {
    try {
      const response = await updateOdo(newOdo);
      
      // Sau khi cập nhật, kiểm tra xem có linh kiện nào "đỏ" không để báo ngay
      const latestData = await refresh();
      const dangerousItems = latestData?.maintenanceItems.filter(item => item.status === 'danger') || [];
      
      if (dangerousItems.length > 0) {
        const firstItem = dangerousItems[0];
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `⚠️ BẢO TRÌ: ${firstItem.title.toUpperCase()}`,
            body: `Linh kiện đang ở mức báo động (${firstItem.distanceLeft}km nữa). Hãy kiểm tra ngay!`,
            sound: true,
            priority: 'max',
          },
          trigger: null, // Send immediately
        });
      }
    } catch (err: any) {
      Alert.alert("Lỗi", err || "Không thể cập nhật ODO");
    }
  };


  const getStatusText = (variant: string) => {
    switch (variant) {
      case "danger":
        return "TỚI HẠN THAY";
      case "warning":
        return "CẢNH BÁO";
      case "normal":
        return "BÌNH THƯỜNG";
      case "safe":
        return "AN TOÀN";
      default:
        return "AN TOÀN";
    }
  };

  if (isLoading && !data) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#3079a8" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <TopAppBar title="AB26 SUPERVISE" />

      <ScrollView
        contentContainerStyle={{
          paddingTop: 110,
          paddingBottom: 100,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            tintColor="#3079a8"
          />
        }
      >
        <HeroOdoCard
          currentOdo={data?.currentOdo || 0}
          onUpdateOdo={handleUpdateOdo}
        />

        <View className="mb-6 flex-row justify-between items-end">
          <Text className="text-xs font-bold tracking-tight uppercase text-primary font-headline">
            Tình trạng linh kiện
          </Text>
          <Text className="text-[10px] font-bold tracking-widest text-outline uppercase">
            {error ? "Lỗi kết nối" : "Cập nhật: Mới nhất"}
          </Text>
        </View>

        {data?.maintenanceItems.map((item) => (
          <ComponentStatusCard
            key={item.id}
            tag={item.tag}
            title={item.title}
            statusText={getStatusText(item.status)}
            statusVariant={
              item.status === "danger" ? "warning" : (item.status as any)
            }
            progressCurrent={item.progressCurrent}
            progressTotal={item.progressTotal}
            distanceLeft={item.distanceLeft}
            nextDistance={item.nextDistance}
          />
        ))}

        {(!data || data.maintenanceItems.length === 0) && !isLoading && (
          <View className="items-center py-10">
            <Text className="text-outline italic">
              Chưa có dữ liệu bảo trì.
            </Text>
          </View>
        )}

        <View className="mt-8 rounded-xl overflow-hidden h-32 relative">
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-FV-LhX7Zk-kk2ffJARg-tTffd8lqMl5cI5Cdhd7W8mRa-skZqDcnNy055T2-cRmHCJOg1RrMl1eV0z1xGbJBIYuAR5AKiJcmalREqeTzZMllbTiD5DhvCSHJY57lpwnVrW1BlUp-OBtQ83ZTLIizrLKG1zfOam79pnyULYeJjtBNqgPfrJK8TwOSf1OVxpa3TTX4iOwofmmd9Ba4e0fOIrusqe8hiYxxylLwfMPE816ePLXbPwRq2O-fyADupQ9N0XwfApqTGQ",
            }}
            className="w-full h-full"
            style={{ opacity: 0.5 }}
          />
          <View className="absolute inset-0 bg-background/20" />
          <View className="absolute bottom-4 left-4">
            <Text className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase shadow-sm shadow-black">
              AB26 Performance Series
            </Text>
            <Text className="text-xs text-outline italic">
              Supervision engineered for endurance.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
