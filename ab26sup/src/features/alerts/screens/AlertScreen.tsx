import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopAppBar } from '@/shared/components/TopAppBar';
import { AlertCard } from '../components/AlertCard';

export function AlertScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <TopAppBar title="AB26 SUPERVISE" />
      
      <ScrollView 
        contentContainerStyle={{ paddingTop: 110, paddingBottom: 100, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="font-headline text-3xl font-bold tracking-tight text-on-surface">Cảnh báo bảo trì</Text>
          <Text className="text-on-surface-variant text-sm mt-1 uppercase tracking-widest font-bold opacity-70">Maintenance Alerts</Text>
        </View>

        <AlertCard 
          title="Lọc gió quá hạn"
          category="Critical"
          description="Thay thế lọc gió động cơ ngay lập tức để duy trì hiệu suất."
          tag="quá 20km"
          timeLabel="2 giờ trước"
          icon="warning"
          variant="critical"
        />

        <AlertCard 
          title="Dầu máy sắp đến hạn"
          category="Reminder"
          description="Lên lịch thay dầu máy định kỳ tại trung tâm dịch vụ gần nhất."
          tag="còn 85km"
          timeLabel="5 giờ trước"
          icon="opacity"
          variant="reminder"
        />

        <AlertCard 
          title="Nước làm mát ổn định"
          category="Healthy"
          description="Hệ thống làm mát hoạt động trong dải nhiệt độ tối ưu."
          tag="System OK"
          timeLabel="1 ngày trước"
          icon="thermostat"
          variant="healthy"
        />

        {/* Visual Asset Card */}
        <View className="mt-8 rounded-xl overflow-hidden bg-white/5 p-1">
          <View className="relative h-48 rounded-lg overflow-hidden">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk0fZ_CZFDXhqYsnA8ijY_u-83DlGDC2fltC7WbInyYjcIQN_dT9Z347FcEX_f10nHbqYece9UR-HT1rfsQ-6vuLhLuk4nHPEB5IcChvMYLKKeiVUIdnm3P_XDJY21gGwokI34dffcDGpg6bco62caVxL2RPBJe4q8iBHxLHrQxxvaEP1inayD27jmDDwwuWRHISYEwGlTxaX_txT53F0YlkZu8kxiWzAazLgPLpAIdqBqUclgsU9xfwoRtEXoNuBhjRqv0QyU0w' }}
              className="w-full h-full"
              style={{ opacity: 0.4 }}
            />
            <View className="absolute inset-0 bg-background/20" />
            <View className="absolute bottom-4 left-4 right-4">
              <Text className="font-bold text-xl text-primary uppercase italic tracking-tighter">Engine Analytics</Text>
              <Text className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-bold">Real-time hardware monitoring active</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
