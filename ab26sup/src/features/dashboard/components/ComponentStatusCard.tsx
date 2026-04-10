import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  tag: string;
  title: string;
  statusText: string;
  statusVariant: 'safe' | 'warning' | 'normal' | 'danger';
  progressCurrent: number;
  progressTotal: number;
  distanceLeft: number;
  nextDistance: number;
}

export function ComponentStatusCard({
  tag,
  title,
  statusText,
  statusVariant,
  progressCurrent,
  progressTotal,
  distanceLeft,
  nextDistance,
}: Props) {
  const isDanger = statusVariant === 'danger';
  const isWarning = statusVariant === 'warning';
  const isSafe = statusVariant === 'safe';
  
  const handleMaintenancePress = () => {
    try {
      // Use router.push only when explicitly pressed to ensure context is valid
      // Note: In some versions of Expo Router, you can use local href or import router directly
      const { router } = require('expo-router');
      router.push({ pathname: '/maintenance', params: { part: title } });
    } catch (e) {
      console.warn("Navigation failed:", e);
    }
  };

  // Status colors
  const statusBg = isDanger 
    ? 'bg-red-500/20'
    : isWarning
    ? 'bg-tertiary-container/20'
    : isSafe
    ? 'bg-secondary-container/20'
    : 'bg-surface-container-high';
  
  const statusColor = isDanger
    ? 'text-red-400'
    : isWarning
    ? 'text-tertiary'
    : isSafe
    ? 'text-secondary'
    : 'text-outline';

  // Progress Bar
  const percentage = Math.min((progressCurrent / progressTotal) * 100, 100);
  const progressBarBg = isDanger
    ? 'bg-red-500'
    : isWarning
    ? 'bg-tertiary'
    : isSafe
    ? 'bg-secondary'
    : 'bg-primary-container';

  return (
    <View className="bg-[#201f1f99] p-5 rounded-xl border-t border-white/5 mb-4 overflow-hidden">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-[10px] font-extrabold tracking-[0.15em] text-outline uppercase mb-1">
            {tag} • MỖI {progressTotal.toLocaleString()} KM
          </Text>
          <Text className="text-lg font-bold text-on-surface leading-tight">{title}</Text>
        </View>
        <View className={`${statusBg} px-3 py-1 rounded-lg`}>
          <Text className={`text-[10px] font-bold tracking-widest uppercase ${statusColor}`}>
            {statusText}
          </Text>
        </View>
      </View>

      {/* Progress */}
      <View className="mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-[10px] font-bold tracking-widest uppercase text-outline-variant">
            TIẾN ĐỘ THAY THẾ
          </Text>
          <Text className={`text-[10px] font-bold tracking-widest uppercase ${isDanger ? 'text-red-400' : isWarning ? 'text-tertiary' : isSafe ? 'text-secondary' : 'text-on-surface'}`}>
            {progressCurrent.toLocaleString()} / {progressTotal.toLocaleString()} KM
          </Text>
        </View>
        <View className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
          <View className={`h-full rounded-full ${progressBarBg}`} style={{ width: `${percentage}%` }} />
        </View>
      </View>

      {/* Info Boxes & Action */}
      <View className="flex-row justify-between items-center bg-surface-container-lowest/50 p-3 rounded-lg">
        <View className="flex-row items-center flex-1">
          <View>
            <Text className="text-[9px] font-bold text-outline-variant uppercase">Còn lại</Text>
            <Text className={`text-sm font-bold ${isDanger ? 'text-red-400' : isWarning ? 'text-tertiary' : 'text-on-surface'}`}>
              {distanceLeft.toLocaleString()} KM
            </Text>
          </View>
          <View className="h-6 w-[1px] bg-outline-variant/20 mx-4" />
          <View>
            <Text className="text-[9px] font-bold text-outline-variant uppercase">Mốc kế</Text>
            <Text className="text-sm font-bold text-on-surface">
              {nextDistance.toLocaleString()} KM
            </Text>
          </View>
        </View>
        
        {(isDanger || isWarning) && (
          <TouchableOpacity 
            onPress={handleMaintenancePress}
            className="bg-[#457b9d]/30 px-4 py-2 rounded-xl flex-row items-center border border-[#457b9d]/50"
          >
            <MaterialIcons name="edit" size={12} color="#ffffff" />
            <Text className="text-[10px] font-bold text-white uppercase ml-1.5 tracking-tighter">BẢO TRÌ</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
