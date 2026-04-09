import React, { useState } from 'react';
import { Alert, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopAppBar } from '@/shared/components/TopAppBar';
import { MaterialIcons } from '@expo/vector-icons';
import { SettingMenuItem } from '../components/SettingMenuItem';
import { VehicleSettingsSheet } from '../components/VehicleSettingsSheet';
import { useRouter } from 'expo-router';
import { useProfile } from '../hooks/useProfile';
import useAuthStore from '@/shared/store/useAuthStore';
import useToastStore from '@/shared/store/useToastStore';

export function ProfileScreen() {
  const router = useRouter();
  const { user, isLoading, error, refresh } = useProfile();
  const logout = useAuthStore((state) => state.logout);
  const showToast = useToastStore((state) => state.show);
  const [vehicleSettingsVisible, setVehicleSettingsVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'XÁC NHẬN ĐĂNG XUẤT',
      'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống AB26 không?',
      [
        {
          text: 'HỦY',
          style: 'cancel',
        },
        {
          text: 'ĐĂNG XUẤT',
          style: 'destructive',
          onPress: () => {
            logout();
            showToast('Đã đăng xuất khỏi hệ thống thành công', 'success');
            router.replace('/login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading && !user) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#3079a8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <TopAppBar title="AB26 SUPERVISE" />
      
      <ScrollView 
        contentContainerStyle={{ paddingTop: 110, paddingBottom: 100, paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} tintColor="#3079a8" />
        }
      >
        {/* Profile Hero Section */}
        <View className="mb-10 items-center">
          <View className="relative p-1 rounded-full bg-primary mb-4 shadow-xl">
            <View className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface bg-zinc-900 justify-center items-center">
              {user?.avatar_url ? (
                <Image 
                  source={{ uri: user.avatar_url }}
                  className="w-full h-full"
                />
              ) : (
                <Text className="text-primary text-4xl font-bold">{user?.name?.charAt(0).toUpperCase()}</Text>
              )}
            </View>
            <View className="absolute bottom-1 right-1 bg-secondary rounded-full p-1 border-2 border-surface items-center justify-center">
              <MaterialIcons name="verified" size={16} color="#003731" />
            </View>
          </View>
          <Text className="font-headline text-3xl font-bold tracking-tight text-on-surface">{user?.name || 'Tài xế'}</Text>
          <Text className="text-on-surface-variant font-medium text-sm mb-3">{user?.email}</Text>
          
          <View className="flex-row items-center mt-1">
            <Text className="text-primary font-headline text-lg font-medium mr-2">{user?.current_odo.toLocaleString() || '0'}</Text>
            <Text className="text-on-surface-variant font-bold text-[10px] tracking-widest uppercase">Tổng ODO km</Text>
          </View>
        </View>

        {/* Bento Stats Grid */}
        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-surface-container rounded-xl p-4 border-t border-primary/10 shadow-sm shadow-black justify-between">
            <Text className="text-on-surface-variant font-bold text-[10px] tracking-[0.2em] uppercase">TB Hàng ngày</Text>
            <View className="mt-2 flex-row items-baseline">
              <Text className="font-headline text-2xl font-bold text-primary">{user?.daily_avg_km || '0'}</Text>
              <Text className="text-on-surface-variant text-sm ml-1">km</Text>
            </View>
          </View>
          <View className="flex-1 bg-surface-container rounded-xl p-4 border-t border-secondary/10 shadow-sm shadow-black justify-between">
            <Text className="text-on-surface-variant font-bold text-[10px] tracking-[0.2em] uppercase">Hạng</Text>
            <View className="mt-2 flex-row items-baseline">
              <Text className="font-headline text-2xl font-bold text-secondary">PRO</Text>
              <Text className="text-on-surface-variant text-[10px] ml-2 opacity-80 mt-1">Top 5% Pilots</Text>
            </View>
          </View>
        </View>

        {/* Vehicle Info Section */}
        <View className="mb-10">
          <Text className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4 px-1">Xe Đã Đăng Ký</Text>
          <TouchableOpacity activeOpacity={0.9} className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg shadow-black">
            <View className="h-40 relative">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfqgyjzY7wG0narZcyLLLRPOVUwQzaiCUqSxrJvMeyVC80dqaeIghOc5RVIeJfr9R73gJuI3cexjJ-v1GSEEjnASGBIAZoKbcVFEBgaWLtJUDR_eKBOf-_tOoEu2T_rkpzc6q6CNj0e5riOkhCtNSZO5HCe8jO4A7Luk9Yj4Z4Pf_cNsxJNX8V67A3vubHEdMIi4GyP1RCMw8uVVQbWQrGriT_SS2rcOrS-ZrZoU8BE2cqTUqdptpcKRo71fB1wY3MQpRccubLXQ' }} 
                className="w-full h-full opacity-60"
              />
              <View className="absolute inset-0 bg-background/30" />
              <View className="absolute bottom-4 left-4 border-l-2 border-primary pl-2">
                <Text className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1 drop-shadow-md">Thiết bị đang hoạt động</Text>
                <Text className="font-headline text-xl font-bold text-on-surface">Honda Air Blade 2026</Text>
              </View>
            </View>
            <View className="p-4 flex-row justify-between items-center border-t border-outline-variant/10">
              <View className="flex-row">
                <View className="mr-6">
                  <Text className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Firmware</Text>
                  <Text className="text-sm font-medium text-on-surface">v4.2.0-stable</Text>
                </View>
                <View>
                  <Text className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Tình trạng máy</Text>
                  <Text className="text-sm font-medium text-secondary">Tốt</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => setVehicleSettingsVisible(true)}
                activeOpacity={0.6}
                style={{ padding: 6, borderRadius: 20, backgroundColor: 'rgba(152, 205, 242, 0.08)' }}
              >
                <MaterialIcons name="settings" size={24} color="#8b9198" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Account Settings List */}
        <View>
          <Text className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4 px-1">Cài đặt hệ thống</Text>
          <SettingMenuItem 
            icon="edit" 
            title="Chỉnh sửa thông tin"
            onPress={() => router.push('/edit-profile')}
          />
          <SettingMenuItem 
            icon="security" 
            title="Quyền riêng tư & Bảo mật"
            onPress={() => router.push('/privacy-security')}
          />
          <SettingMenuItem 
            icon="notifications-active" 
            title="Cảnh báo linh kiện"
            onPress={() => router.push('/diagnostic')}
          />
          
          <SettingMenuItem 
            icon="logout" 
            title="ĐĂNG XUẤT HỆ THỐNG"
            isDestructive 
            onPress={handleLogout}
          />
        </View>

      </ScrollView>

      {/* Vehicle Settings Bottom Sheet */}
      <VehicleSettingsSheet 
        visible={vehicleSettingsVisible} 
        onClose={() => setVehicleSettingsVisible(false)}
        vehicleName="Honda Air Blade 2026"
      />
    </SafeAreaView>
  );
}
