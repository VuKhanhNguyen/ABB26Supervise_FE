import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AuthInput } from '../components/AuthInput';
import { useState } from 'react';
import apiClient from '@/shared/api/apiClient';
import useAuthStore from '@/shared/store/useAuthStore';

export function RegisterScreen() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentOdo, setCurrentOdo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !currentOdo) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password,
        current_odo: parseInt(currentOdo, 10),
        daily_avg_km: 15,
      });

      const { user, token } = response.data;
      setAuth(user, token);
      Alert.alert('Success', 'Account created successfully');
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Register error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Failed to create account.';
      Alert.alert('Registration Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Ambient Background Texture */}
      <View className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full opacity-50" />
      <View className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/5 rounded-full opacity-50" />

      {/* Top Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-zinc-950/80 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg bg-zinc-900 active:scale-95">
          <MaterialIcons name="arrow-back" size={24} color="#38bdf8" />
        </TouchableOpacity>
        <Text className="text-xl font-bold tracking-[0.2em] text-sky-400 uppercase">AB26 SUPERVISE</Text>
        <View className="w-10" />
      </View>

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md self-center">
          {/* Hero Stats Cluster */}
          <View className="mb-10 flex-row justify-between items-end">
            <View>
              <Text className="text-[10px] font-bold tracking-[0.3em] text-secondary uppercase mb-1">System Init</Text>
              <Text className="text-4xl font-bold tracking-tight text-on-surface">REGISTRATION</Text>
            </View>
            <View className="items-end">
              <Text className="text-[10px] text-outline uppercase tracking-widest">Protocol</Text>
              <Text className="text-xl font-medium text-sky-400">XP-0026</Text>
            </View>
          </View>

          {/* Vehicle ID Lock */}
          <View className="p-5 bg-[#13131399] rounded-xl border-t border-primary/20 mb-6">
            <View className="absolute top-2 right-2">
              <MaterialIcons name="fingerprint" size={32} color="rgba(152, 205, 242, 0.2)" />
            </View>
            <Text className="text-[10px] font-bold text-outline tracking-[0.2em] uppercase mb-4">
              Core Identification
            </Text>
            <View className="flex-row items-center space-x-4">
              <View className="w-12 h-12 rounded-lg bg-primary-container/20 items-center justify-center border border-primary/20 mr-4">
                <MaterialIcons name="two-wheeler" size={24} color="#98cdf2" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-outline mb-1 font-medium">Vehicle ID</Text>
                <Text className="text-lg font-bold text-on-surface">AB26-PROTOTYPE-01</Text>
              </View>
            </View>
          </View>

          {/* Input Group */}
          <AuthInput
            label="Full Name"
            icon="person"
            placeholder="Pilot Identifier"
            value={name}
            onChangeText={setName}
          />
          <AuthInput
            label="Email Address"
            icon="alternate-email"
            placeholder="pilot@ab-tech.net"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <AuthInput
            label="Access Cipher"
            icon="lock"
            placeholder="••••••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Row Inputs */}
          <View className="flex-row space-x-4 mb-8">
            <View className="flex-1 mr-2">
               <AuthInput
                label="Current ODO"
                icon="speed"
                placeholder="00000"
                keyboardType="numeric"
                suffix="KM"
                value={currentOdo}
                onChangeText={setCurrentOdo}
              />
            </View>
            <View className="flex-1 ml-2">
               <AuthInput
                label="Unit Model"
                icon="info"
                placeholder="AIR BLADE 26"
                editable={false}
                value="AIR BLADE 26"
              />
            </View>
          </View>

          {/* CTA Section */}
          <TouchableOpacity 
            onPress={handleRegister}
            disabled={loading}
            className={`w-full bg-primary py-5 rounded-lg items-center justify-center flex-row shadow-sm active:scale-95 ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="#00344c" />
            ) : (
              <>
                <Text className="font-bold text-on-primary tracking-widest uppercase mr-2 text-base">REGISTER</Text>
                <MaterialIcons name="bolt" size={20} color="#00344c" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity className="mt-6 py-2" onPress={() => router.navigate('/login')}>
            <Text className="text-center text-outline text-xs font-medium">
              Already part of the fleet? <Text className="text-primary underline">LOG IN</Text>
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Footer */}
        <View className="mt-12 pt-4 border-t border-outline-variant/10 flex-row justify-between opacity-60 w-full max-w-md self-center">
          <View className="flex-row">
            <View className="w-1 h-6 bg-secondary mr-2" />
            <View>
              <Text className="text-[8px] font-bold uppercase tracking-widest text-on-surface">Security Layer</Text>
              <Text className="text-[10px] text-on-surface">AES-256 Encrypted</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-[8px] font-bold uppercase tracking-widest text-tertiary">Diagnostic</Text>
            <Text className="text-[10px] text-on-surface">Ready for Link</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
