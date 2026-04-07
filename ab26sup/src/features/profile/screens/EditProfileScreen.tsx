import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { AuthInput } from '@/features/auth/components/AuthInput';
import { useProfile } from '../hooks/useProfile';

export function EditProfileScreen() {
  const router = useRouter();
  const { user, isLoading, updateProfile } = useProfile();
  
  const [name, setName] = useState('');
  const [currentOdo, setCurrentOdo] = useState('');
  const [dailyAvg, setDailyAvg] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCurrentOdo(user.current_odo.toString());
      setDailyAvg(user.daily_avg_km.toString());
    }
  }, [user]);

  const pickImage = async () => {
    try {
      // Yêu cầu quyền truy cập thư viện ảnh
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Quyền truy cập', 'Vui lòng cho phép ứng dụng truy cập thư viện ảnh để cập nhật ảnh đại diện');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (err: any) {
      console.error('Lỗi khi chọn ảnh:', err);
      Alert.alert('Lỗi', 'Không thể mở thư viện ảnh hoặc xử lý ảnh. Vui lòng thử lại.');
    }
  };

  const handleUpdate = async () => {
    try {
      if (!name) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên');
        return;
      }

      const data = new FormData();
      data.append('name', name);
      data.append('current_odo', currentOdo);
      data.append('daily_avg_km', dailyAvg);

      if (image) {
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;
        // @ts-ignore
        data.append('avatar', { uri: image, name: filename, type });
      }

      await updateProfile(data);

      Alert.alert('Thành công', 'Thông tin đã được cập nhật', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Không thể cập nhật thông tin');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Top Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-zinc-950/80 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg bg-zinc-900 active:scale-95">
          <MaterialIcons name="arrow-back" size={24} color="#3079a8" />
        </TouchableOpacity>
        <Text className="text-xl font-bold tracking-[0.2em] text-[#98cdf2] uppercase">CHỈNH SỬA</Text>
        <View className="w-10" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Avatar Edit */}
        <View className="items-center mb-10">
          <TouchableOpacity onPress={pickImage} className="relative active:scale-95">
            <View className="w-24 h-24 rounded-full border-2 border-primary overflow-hidden bg-surface-container">
              {image || user?.avatar_url ? (
                <Image 
                  source={{ uri: image || user?.avatar_url }} 
                  className="w-full h-full"
                />
              ) : (
                <View className="w-full h-full items-center justify-center">
                  <Text className="text-primary text-3xl font-bold">{user?.name?.charAt(0).toUpperCase()}</Text>
                </View>
              )}
            </View>
            <View className="absolute bottom-0 right-0 bg-surface-container-high p-2 rounded-full border border-outline-variant shadow-lg">
              <MaterialIcons name="photo-camera" size={16} color="#3079a8" />
            </View>
          </TouchableOpacity>
        </View>

        <AuthInput 
          label="Họ và Tên" 
          icon="person" 
          placeholder="Nhập tên của bạn" 
          value={name} 
          onChangeText={setName} 
        />
        <AuthInput 
          label="Số ODO hiện tại" 
          icon="speed" 
          placeholder="Ví dụ: 12000" 
          keyboardType="numeric" 
          suffix="KM" 
          value={currentOdo} 
          onChangeText={setCurrentOdo} 
        />
        <AuthInput 
          label="Số KM đi hàng ngày" 
          icon="trending-up" 
          placeholder="Ví dụ: 15" 
          keyboardType="numeric" 
          suffix="KM/Ngày" 
          value={dailyAvg} 
          onChangeText={setDailyAvg} 
        />
        
        <View className="mt-2 p-4 bg-primary/5 rounded-xl border border-primary/20">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="info" size={16} color="#3079a8" />
            <Text className="ml-2 text-primary font-bold text-[10px] uppercase tracking-widest">Lưu ý</Text>
          </View>
          <Text className="text-outline text-[11px] leading-relaxed">
            Thay đổi số ODO và KM hàng ngày sẽ ảnh hưởng đến các tính toán bảo trì định kỳ trên Dashboard.
          </Text>
        </View>

        <TouchableOpacity 
          disabled={isLoading}
          className={`w-full py-4 rounded-xl items-center justify-center mt-10 active:scale-95 shadow-lg ${isLoading ? 'bg-outline-variant' : 'bg-primary'}`}
          onPress={handleUpdate}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="font-bold tracking-widest text-on-primary uppercase">Cập Nhật Thông Tin</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
