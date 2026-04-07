import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthInput } from "@/features/auth/components/AuthInput";
import { useMaintenance } from "../../dashboard/hooks/useMaintenance";
import * as ImagePicker from "expo-image-picker";

const MAINTENANCE_PARTS = [
  "Dầu nhớt máy",
  "Dầu láp (Nhớt hộp số)",
  "Vệ sinh nồi (Côn)",
  "Lọc gió",
  "Bugi",
  "Nước làm mát",
  "Dây curoa",
  "Bố thắng (Má phanh)",
  "Lốp xe (Vỏ xe)",
];

export function MaintenanceLogEntryScreen() {
  const router = useRouter();
  const { part, odo } = useLocalSearchParams<{ part?: string; odo?: string }>();
  const { addLog, isLoading } = useMaintenance();

  const [formData, setFormData] = useState({
    part_name: "",
    current_odo: "",
    cost: "",
    location: "",
    notes: "",
  });
  const [image, setImage] = useState<string | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    if (part) setFormData((prev) => ({ ...prev, part_name: part }));
    if (odo) setFormData((prev) => ({ ...prev, current_odo: odo }));
  }, [part, odo]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể mở thư viện ảnh");
    }
  };

  const handleSave = async () => {
    if (!formData.part_name || !formData.current_odo) {
      Alert.alert("Thông báo", "Vui lòng chọn linh kiện và nhập số ODO");
      return;
    }

    try {
      const data = new FormData();
      data.append("part_name", formData.part_name);
      data.append("current_odo", formData.current_odo);
      data.append("cost", formData.cost || "0");
      data.append("location", formData.location);
      data.append("notes", formData.notes || "");

      if (image) {
        const filename = image.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : `image`;

        // @ts-ignore - FormData expects specialized object for files in RN
        data.append("receiptImage", { uri: image, name: filename, type });
      }

      await addLog(data);
      Alert.alert("Thành công", "Đã lưu nhật ký bảo dưỡng", [
        { text: "OK", onPress: () => router.replace("/(tabs)") },
      ]);
    } catch (err: any) {
      Alert.alert("Lỗi", err.message || "Không thể lưu nhật ký");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Top Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-zinc-950/80 z-50">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-lg bg-zinc-900 active:scale-95"
        >
          <MaterialIcons name="arrow-back" size={24} color="#3079a8" />
        </TouchableOpacity>
        <Text className="text-xl font-bold tracking-[0.2em] text-[#98cdf2] uppercase">
          GHI NHẬT KÝ
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6 bg-[#201f1f99] rounded-2xl border border-white/5 mb-6">
          <Text className="text-lg font-bold text-on-surface mb-6 font-headline uppercase tracking-tight">
            Chi tiết bảo dưỡng
          </Text>

          {/* Part Selection */}
          <View className="mb-6">
            <Text className="text-xs font-bold text-outline-variant tracking-wider uppercase mb-2">
              Linh kiện / Hạng mục
            </Text>
            <TouchableOpacity
              onPress={() => setIsPickerVisible(true)}
              className="w-full flex-row items-center justify-between pl-4 pr-3 py-3 bg-surface-container-lowest border-b-2 border-outline-variant"
            >
              <View className="flex-row items-center">
                <MaterialIcons
                  name="build"
                  size={18}
                  color={formData.part_name ? "#98cdf2" : "#41484d"}
                />
                <Text
                  className={`ml-3 font-bold ${formData.part_name ? "text-on-surface" : "text-outline"}`}
                >
                  {formData.part_name || "Chọn hạng mục bảo trì"}
                </Text>
              </View>
              <MaterialIcons name="arrow-drop-down" size={24} color="#c1c7ce" />
            </TouchableOpacity>
          </View>

          <AuthInput
            label="Ghi chú thêm"
            icon="edit"
            placeholder="Ví dụ: Thay lần 1, Dầu Motul..."
            value={formData.notes}
            onChangeText={(t) => setFormData({ ...formData, notes: t })}
          />

          <AuthInput
            label="Số ODO lúc bảo dưỡng"
            icon="speed"
            placeholder="Ví dụ: 12450"
            keyboardType="numeric"
            suffix="KM"
            value={formData.current_odo}
            onChangeText={(t) => setFormData({ ...formData, current_odo: t })}
          />
          <AuthInput
            label="Chi phí (VND)"
            icon="payments"
            placeholder="0"
            keyboardType="numeric"
            suffix="VND"
            value={formData.cost}
            onChangeText={(t) => setFormData({ ...formData, cost: t })}
          />
          <AuthInput
            label="Địa điểm / Workshop"
            icon="place"
            placeholder="Honda Head..."
            value={formData.location}
            onChangeText={(t) => setFormData({ ...formData, location: t })}
          />

          {/* Image Picker */}
          <View className="mb-8">
            <Text className="text-xs font-bold text-outline-variant tracking-wider uppercase mb-2">
              Ảnh hóa đơn (Tùy chọn)
            </Text>
            <TouchableOpacity
              onPress={pickImage}
              className="w-full h-40 border-2 border-dashed border-outline-variant/30 rounded-xl items-center justify-center bg-surface-container-lowest relative overflow-hidden"
            >
              {image ? (
                <>
                  <Image source={{ uri: image }} className="w-full h-full" />
                  <View className="absolute inset-0 bg-black/30 items-center justify-center">
                    <MaterialIcons name="photo-camera" size={32} color="#fff" />
                  </View>
                </>
              ) : (
                <>
                  <MaterialIcons name="add-a-photo" size={32} color="#3079a8" />
                  <Text className="text-outline text-xs font-bold mt-2 uppercase tracking-widest">
                    Chọn ảnh hóa đơn
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={isLoading}
            className={`w-full py-4 rounded-xl items-center justify-center shadow-lg active:scale-95 transition-all ${isLoading ? "bg-outline-variant" : "bg-primary"}`}
            onPress={handleSave}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-bold tracking-widest text-on-primary uppercase">
                XÁC NHẬN LƯU
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Part Picker Modal */}
      <Modal visible={isPickerVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-surface-container-high rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold text-on-surface uppercase tracking-tighter">
                Chọn hạng mục
              </Text>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                <MaterialIcons name="close" size={24} color="#8b9198" />
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-80">
              {MAINTENANCE_PARTS.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setFormData({ ...formData, part_name: item });
                    setIsPickerVisible(false);
                  }}
                  className={`py-4 border-b border-outline-variant/10 ${formData.part_name === item ? "bg-primary/10 rounded-lg" : ""}`}
                >
                  <Text
                    className={`text-center font-bold ${formData.part_name === item ? "text-primary" : "text-on-surface"}`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
