import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopAppBar } from '@/shared/components/TopAppBar';
import { AlertCard } from '../components/AlertCard';
import { useAlerts } from '../hooks/useAlerts';

export function AlertScreen() {
  const { alerts, isLoading, error, fetchAlerts, markAsRead } = useAlerts();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

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

        {isLoading ? (
          <ActivityIndicator size="large" color="#6fd8c8" />
        ) : error ? (
          <Text className="text-tertiary-container">{error}</Text>
        ) : alerts.length === 0 ? (
          <Text className="text-on-surface-variant">Không có cảnh báo nào.</Text>
        ) : (
          alerts.map(alert => (
            <AlertCard 
              key={alert._id}
              title={alert.title}
              category={alert.category}
              description={alert.description}
              tag={alert.tag}
              timeLabel={new Date(alert.createdAt).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
              icon={alert.icon as any}
              variant={alert.variant}
              hasRead={alert.hasRead}
              onPress={() => {
                if (!alert.hasRead) {
                  markAsRead(alert._id);
                }
              }}
            />
          ))
        )}

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
