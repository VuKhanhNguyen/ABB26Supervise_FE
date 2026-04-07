import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function PrivacySecurityScreen() {
  const router = useRouter();
  const [telemetry, setTelemetry] = useState(true);
  const [location, setLocation] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Top Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-zinc-950/80 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg bg-zinc-900 active:scale-95">
          <MaterialIcons name="arrow-back" size={24} color="#38bdf8" />
        </TouchableOpacity>
        <Text className="text-xl font-bold tracking-[0.2em] text-sky-400 uppercase">SECURITY</Text>
        <View className="w-10" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <Text className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4 px-1">Access Protocol</Text>
        
        <View className="bg-surface-container rounded-xl overflow-hidden mb-8 shadow-sm">
          <TouchableOpacity className="flex-row justify-between items-center p-4 border-b border-white/5">
            <View className="flex-row items-center">
              <MaterialIcons name="password" size={20} color="#98cdf2" className="mr-3" />
              <Text className="font-bold text-sm text-on-surface">Change Access Cipher</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8b9198" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center p-4">
            <View className="flex-row items-center">
              <MaterialIcons name="fingerprint" size={20} color="#98cdf2" className="mr-3" />
              <Text className="font-bold text-sm text-on-surface">Biometrics</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8b9198" />
          </TouchableOpacity>
        </View>

        <Text className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4 px-1">Data Telemetry</Text>
        
        <View className="bg-surface-container rounded-xl overflow-hidden mb-8 shadow-sm p-4 space-y-4">
          <View className="flex-row justify-between items-center pb-2 border-b border-white/5">
            <View className="flex-1 mr-4">
              <Text className="font-bold text-sm text-on-surface">Share Telemetry Data</Text>
              <Text className="text-[10px] text-on-surface-variant mt-1">Allow AB26 Core to analyze engine usage privately for improvements.</Text>
            </View>
            <Switch value={telemetry} onValueChange={setTelemetry} trackColor={{ true: '#98cdf2', false: '#353534' }} thumbColor="#fff" />
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-1 mr-4">
              <Text className="font-bold text-sm text-on-surface">Location Tracking</Text>
              <Text className="text-[10px] text-on-surface-variant mt-1">Keep track of your rides on the world map.</Text>
            </View>
            <Switch value={location} onValueChange={setLocation} trackColor={{ true: '#98cdf2', false: '#353534' }} thumbColor="#fff" />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
