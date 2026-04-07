import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function DiagnosticDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Top Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-zinc-950/80 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg bg-zinc-900 active:scale-95">
          <MaterialIcons name="arrow-back" size={24} color="#38bdf8" />
        </TouchableOpacity>
        <Text className="text-xl font-bold tracking-[0.2em] text-sky-400 uppercase">DIAGNOSTICS</Text>
        <View className="w-10" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {/* Core Visualization */}
        <View className="mb-10 items-center">
            <View className="w-64 h-64 rounded-full border-2 border-primary/20 items-center justify-center p-2 mb-4 bg-[#1a4a6b20]">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk0fZ_CZFDXhqYsnA8ijY_u-83DlGDC2fltC7WbInyYjcIQN_dT9Z347FcEX_f10nHbqYece9UR-HT1rfsQ-6vuLhLuk4nHPEB5IcChvMYLKKeiVUIdnm3P_XDJY21gGwokI34dffcDGpg6bco62caVxL2RPBJe4q8iBHxLHrQxxvaEP1inayD27jmDDwwuWRHISYEwGlTxaX_txT53F0YlkZu8kxiWzAazLgPLpAIdqBqUclgsU9xfwoRtEXoNuBhjRqv0QyU0w' }}
                className="w-full h-full rounded-full opacity-60"
              />
            </View>
            <View className="bg-primary/20 px-3 py-1 rounded">
               <Text className="text-primary font-bold text-xs uppercase tracking-widest">SYSTEM SCAN COMPLETE</Text>
            </View>
        </View>

        {/* Modules Status */}
        <Text className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4 px-1">Hardware Modules</Text>
        
        <View className="space-y-4 mb-8">
            <View className="bg-surface-container rounded-xl p-4 flex-row items-center mb-3">
              <View className="w-12 h-12 rounded bg-secondary-container/20 items-center justify-center mr-4">
                 <MaterialIcons name="memory" size={24} color="#6fd8c8" />
              </View>
              <View className="flex-1">
                 <Text className="font-bold text-on-surface">ECU Core Logic</Text>
                 <Text className="text-xs text-on-surface-variant mt-1">Operating at nominal capacity.</Text>
              </View>
              <Text className="text-[10px] font-bold text-secondary uppercase tracking-widest">Healthy</Text>
            </View>

            <View className="bg-surface-container rounded-xl p-4 flex-row items-center mb-3">
              <View className="w-12 h-12 rounded bg-tertiary-container/20 items-center justify-center mr-4">
                 <MaterialIcons name="electric-bike" size={24} color="#dc3240" />
              </View>
              <View className="flex-1">
                 <Text className="font-bold text-on-surface">Transmission Belt</Text>
                 <Text className="text-xs text-on-surface-variant mt-1">High wear detected.</Text>
              </View>
              <Text className="text-[10px] font-bold text-tertiary-container uppercase tracking-widest">Warning</Text>
            </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-surface-container-high py-4 rounded-lg items-center justify-center mt-2 border border-outline/20 active:scale-95"
          onPress={() => router.back()}
        >
          <Text className="font-bold tracking-widest text-on-surface uppercase">Run Deep Scan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
