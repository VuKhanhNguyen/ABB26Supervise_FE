import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopAppBar } from "@/shared/components/TopAppBar";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { HistoryItemCard } from "../components/HistoryItemCard";
import { useRouter } from "expo-router";
import { useMaintenance } from "../../dashboard/hooks/useMaintenance";

export function HistoryScreen() {
  const router = useRouter();
  const { history, isLoading, error, fetchHistory } = useMaintenance();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .toUpperCase();
  };

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
            onRefresh={fetchHistory}
            tintColor="#3079a8"
          />
        }
      >
        {/* Hero Action Area */}
        <View className="mb-10 w-full">
          <TouchableOpacity
            className="bg-primary w-full py-4 rounded-xl flex-row items-center justify-center shadow-lg active:scale-95 transition-all"
            onPress={() => router.push("/maintenance")}
          >
            <MaterialIcons name="add-circle" size={20} color="#fff" />
            <Text className="text-on-primary font-bold ml-2 uppercase tracking-widest">
              Thêm nhật ký mới
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View className="mb-8 flex-row justify-between items-end border-l-4 border-primary pl-4">
          <View>
            <Text className="font-bold text-[10px] tracking-[0.2em] uppercase text-outline">
              Timeline
            </Text>
            <Text className="font-headline text-2xl font-bold text-on-surface">
              LỊCH SỬ BẢO DƯỠNG
            </Text>
          </View>
          <View className="items-end">
            <Text className="font-headline text-2xl font-bold text-primary">
              {history.length}
            </Text>
            <Text className="text-[10px] text-outline uppercase font-bold">
              Bản ghi
            </Text>
          </View>
        </View>

        {/* Maintenance Timeline */}
        <View className="relative">
          {/* Timeline Line Decoration */}
          <View className="absolute left-6 top-2 bottom-2 w-[1px] bg-outline-variant/30" />

          {isLoading && history.length === 0 ? (
            <View className="py-20 items-center">
              <ActivityIndicator color="#3079a8" />
            </View>
          ) : error ? (
            <View className="py-20 items-center">
              <Text className="text-red-400 font-bold uppercase tracking-widest">
                Lỗi: {error}
              </Text>
              <TouchableOpacity onPress={fetchHistory} className="mt-4">
                <Text className="text-primary font-bold">Thử lại</Text>
              </TouchableOpacity>
            </View>
          ) : history.length === 0 ? (
            <View className="py-20 items-center">
              <Ionicons
                name="document-text-outline"
                size={48}
                color="#41484d"
              />
              <Text className="text-outline font-bold mt-4 uppercase tracking-widest">
                Chưa có lịch sử bảo dưỡng
              </Text>
            </View>
          ) : (
            history.map((log, index) => (
              <HistoryItemCard
                key={log._id}
                isFirst={index === 0}
                title={log.part_name}
                notes={log.notes}
                date={formatDate(log.createdAt)}
                cost={log.cost ? `${log.cost.toLocaleString()}đ` : "Miễn phí"}
                status="Logged"
                odo={`${log.odo_at_service.toLocaleString()} KM`}
                location={log.location}
                imageUrl={log.receipt_image_url}
              />
            ))
          )}

          {/* End of List indicator */}
          {history.length > 0 && (
            <View className="items-center justify-center py-8 opacity-40">
              <MaterialIcons
                name="settings-input-component"
                size={32}
                color="#8b9198"
                className="mb-2"
              />
              <Text className="font-bold text-[9px] uppercase tracking-[0.4em] text-outline pt-2">
                Hết danh sách
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
