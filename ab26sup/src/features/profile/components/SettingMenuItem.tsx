import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  onPress?: () => void;
  isDestructive?: boolean;
}

export function SettingMenuItem({ icon, title, onPress, isDestructive }: Props) {
  if (isDestructive) {
    return (
      <View className="pt-4">
        <TouchableOpacity 
          onPress={onPress}
          className="w-full py-4 rounded-xl border border-tertiary/20 hover:bg-tertiary/5 active:scale-[0.98] transition-all items-center justify-center flex-row"
        >
          <MaterialIcons name={icon} size={16} color="#ffb3b1" className="mr-2" />
          <Text className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-tertiary ml-2">
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-full flex-row items-center justify-between p-4 bg-surface-container rounded-xl active:bg-surface-container-high transition-all mb-3 shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-lg bg-surface-container-highest items-center justify-center mr-4 shadow-sm shadow-black">
          <MaterialIcons name={icon} size={20} color="#98cdf2" />
        </View>
        <Text className="font-medium text-sm text-on-surface">{title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#c1c7ce" />
    </TouchableOpacity>
  );
}
