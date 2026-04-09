import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  title: string;
  category: string;
  description: string;
  tag: string;
  timeLabel: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  variant: 'critical' | 'reminder' | 'healthy';
  hasRead?: boolean;
  onPress?: () => void;
}

export function AlertCard({ title, category, description, tag, timeLabel, icon, variant, hasRead, onPress }: Props) {
  const isCritical = variant === 'critical';
  const isHealthy = variant === 'healthy';

  const containerBorder = isCritical ? 'border-l-4 border-tertiary-container' : 'border-l-4 border-transparent';
  const iconBg = isCritical ? 'bg-tertiary-container/20' : isHealthy ? 'bg-secondary-container/20' : 'bg-primary-container/20';
  const iconColor = isCritical ? '#dc3240' : isHealthy ? '#6fd8c8' : '#98cdf2';
  const titleColor = isCritical ? 'text-tertiary-container' : 'text-on-surface';
  const badgeBg = isCritical ? 'bg-tertiary-container' : isHealthy ? 'bg-secondary-container/20' : 'bg-surface-container-high';
  const badgeTextColor = isCritical ? 'text-on-tertiary-container' : isHealthy ? 'text-secondary' : 'text-on-surface-variant';
  const tagBg = isCritical ? 'bg-tertiary-container/10 border-tertiary-container/20' : isHealthy ? 'bg-secondary-container/10 border-secondary-container/20' : 'bg-primary-container/10 border-primary-container/20';
  const tagTextColor = isCritical ? 'text-tertiary-container' : isHealthy ? 'text-secondary' : 'text-primary';

  return (
    <View style={{ opacity: hasRead ? 0.6 : 1 }}>
      <View 
        className={`relative overflow-hidden rounded-lg bg-surface-container shadow-sm mb-4 ${containerBorder}`}
        onTouchEnd={onPress}
      >
        <View className="p-5 flex-row">
          <View className={`w-12 h-12 rounded-lg ${iconBg} items-center justify-center mr-4`}>
            <MaterialIcons name={icon} size={24} color={iconColor} />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start flex-wrap">
              <Text className={`font-bold text-lg tracking-tight ${titleColor}`}>
                {title}
              </Text>
              <View className={`px-2 py-0.5 rounded ${badgeBg} ml-2 mt-1 sm:mt-0`}>
                <Text className={`text-[10px] font-bold uppercase tracking-tighter ${badgeTextColor}`}>
                  {category}
                </Text>
              </View>
            </View>
            <Text className="text-on-surface text-sm mt-1 font-medium">{description}</Text>
            <View className="mt-3 flex-row items-center">
              <View className={`px-2 py-1 rounded-sm border ${tagBg} mr-2`}>
                <Text className={`text-xs font-bold ${tagTextColor}`}>{tag}</Text>
              </View>
              <Text className="text-[10px] text-on-surface-variant opacity-60 font-bold">{timeLabel}</Text>
            </View>
          </View>
        </View>
        {isCritical && (
          <View className="absolute inset-0 bg-tertiary-container/5 pointer-events-none" />
        )}
      </View>
    </View>
  );
}
