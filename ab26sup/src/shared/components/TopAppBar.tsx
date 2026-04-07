import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export function TopAppBar({ title = "AB26 SUPERVISE" }) {
  return (
    <SafeAreaView edges={['top']} className="bg-zinc-950/80 z-50 absolute top-0 w-full flex-row justify-between items-center px-6 h-24">
      <View className="flex-row justify-between items-center w-full mt-4">
        <View className="flex-row items-center space-x-2">
          <MaterialIcons name="speed" size={24} color="#38bdf8" />
          <Text className="text-xl font-bold text-sky-400 uppercase tracking-widest pl-2">
            {title}
          </Text>
        </View>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <MaterialIcons name="check-circle" size={24} color="#71717a" />
          </TouchableOpacity>
          <TouchableOpacity className="w-8 h-8 rounded-full bg-surface-container-high items-center justify-center border border-outline-variant/20 ml-2">
            <MaterialIcons name="person" size={16} color="#e5e2e1" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute bottom-0 left-0 bg-zinc-800 h-[1px] w-full" />
    </SafeAreaView>
  );
}
