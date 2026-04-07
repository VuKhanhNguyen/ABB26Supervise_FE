import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AuthInput } from '../components/AuthInput';
import { useState } from 'react';
import apiClient from '@/shared/api/apiClient';
import useAuthStore from '@/shared/store/useAuthStore';
import { Alert, ActivityIndicator } from 'react-native';

export function LoginScreen() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      setAuth(user, token);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Failed to login. Please check your credentials.';
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      {/* Background Decor */}
      <View className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full opacity-50" />
      <View className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/10 rounded-full opacity-50" />

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View className="items-center mb-12">
          <MaterialIcons name="bolt" size={56} color="#98cdf2" className="mb-4" />
          <Text className="text-2xl font-bold tracking-widest text-primary uppercase text-center mt-2">
            AB26 SUPERVISE
          </Text>
          <Text className="text-xs text-on-surface-variant tracking-widest uppercase text-center mt-2">
            Kinetic Intelligence System v2.0
          </Text>
        </View>

        {/* Login Card */}
        <View className="bg-[#13131399] p-8 rounded-xl border-t border-primary/20">
          <AuthInput
            label="OPERATOR ID"
            subLabel="EMAIL ADDRESS"
            icon="alternate-email"
            placeholder="RIDER_IDENT@AB26.COM"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <AuthInput
            label="ENCRYPTION KEY"
            subLabel="PASSWORD"
            icon="lock"
            placeholder="••••••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View className="flex-row justify-between items-center mb-6 mt-2">
            <TouchableOpacity className="flex-row items-center">
              <View className="w-4 h-4 border border-outline-variant rounded-sm bg-surface-container" />
              <Text className="text-[10px] text-on-surface-variant tracking-widest uppercase ml-2">REMEMBER SESSION</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-[10px] text-primary tracking-widest uppercase underline">RECOVER ACCESS</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={handleLogin}
            disabled={loading}
            className={`w-full bg-primary py-4 rounded-lg items-center justify-center flex-row shadow-sm mt-4 ${loading ? 'opacity-70' : ''}`}>
            {loading ? (
              <ActivityIndicator color="#00344c" />
            ) : (
              <>
                <MaterialIcons name="login" size={20} color="#00344c" />
                <Text className="font-bold text-on-primary tracking-widest uppercase ml-3">INITIATE LOGIN</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Secondary Actions */}
        <View className="mt-8 items-center">
          <View className="flex-row items-center w-full mb-6">
            <View className="flex-1 h-[1px] bg-outline-variant/30" />
            <Text className="text-[10px] text-outline-variant tracking-widest mx-4">OR</Text>
            <View className="flex-1 h-[1px] bg-outline-variant/30" />
          </View>
          
          <TouchableOpacity 
            onPress={() => router.navigate('/register')}
            className="flex-row items-center py-2">
            <Text className="text-xs text-on-surface-variant tracking-widest uppercase mr-2.5">NEW TO PROTOCOL?</Text>
            <Text className="text-xs font-bold text-secondary tracking-widest uppercase">CREATE AN ACCOUNT</Text>
          </TouchableOpacity>
        </View>

        {/* Diagnostic Metadata */}
        <View className="absolute bottom-6 left-6 right-6 flex-row justify-between opacity-30">
          <View>
            <Text className="text-[8px] tracking-[0.2em] text-on-background uppercase">SYSTEM_STABLE</Text>
            <Text className="text-[8px] tracking-[0.2em] text-on-background uppercase mt-1">LATENCY: 12MS</Text>
          </View>
          <View className="items-end">
            <Text className="text-[8px] tracking-[0.2em] text-on-background uppercase">CORE_2026_A</Text>
            <Text className="text-[8px] tracking-[0.2em] text-secondary uppercase mt-1">ENCRYPTION: AES-256</Text>
          </View>
        </View>
      </ScrollView>

      {/* Decorative Corner Accents */}
      <View className="absolute top-12 left-6 w-12 h-12 border-t border-l border-primary/20 opacity-40 pointer-events-none" />
      <View className="absolute top-12 right-6 w-12 h-12 border-t border-r border-primary/20 opacity-40 pointer-events-none" />
    </SafeAreaView>
  );
}
