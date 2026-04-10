import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AuthInput } from '../components/AuthInput';
import apiClient from '@/shared/api/apiClient';
import useToastStore from '@/shared/store/useToastStore';

export function RecoverAccessScreen() {
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Request PIN, 2: Reset Password
  const [loading, setLoading] = useState(false);

  const handleRequestPin = async () => {
    if (!email) {
      showToast('Vui lòng nhập địa chỉ email', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      showToast(response.data.message, 'success');
      setStep(2);
    } catch (error: any) {
      console.error('Request PIN error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Không thể yêu cầu mã PIN';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!pin || !newPassword) {
      showToast('Vui lòng nhập mã PIN và mật khẩu mới', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/reset-password', { 
        email, 
        pin, 
        newPassword 
      });
      showToast(response.data.message, 'success');
      router.back();
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Mã PIN không chính xác hoặc đã hết hạn';
      showToast(message, 'error');
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
          <MaterialIcons name="security" size={56} color="#98cdf2" className="mb-4" />
          <Text className="text-2xl font-bold tracking-widest text-primary uppercase text-center mt-2">
            RECOVER ACCESS
          </Text>
          <Text className="text-xs text-on-surface-variant tracking-widest uppercase text-center mt-2">
            {step === 1 ? 'INITIATE PROTOCOL RECOVERY' : 'RESET ENCRYPTION KEYS'}
          </Text>
        </View>

        {/* Card */}
        <View className="bg-[#13131399] p-8 rounded-xl border-t border-primary/20">
          {step === 1 ? (
            <>
              <AuthInput
                label="OPERATOR ID"
                subLabel="EMAIL ADDRESS"
                icon="alternate-email"
                placeholder="RIDER_IDENT@AB26.COM"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              
              <TouchableOpacity 
                onPress={handleRequestPin}
                disabled={loading}
                className={`w-full bg-primary py-4 rounded-lg items-center justify-center flex-row shadow-sm mt-4 ${loading ? 'opacity-70' : ''}`}>
                {loading ? (
                  <ActivityIndicator color="#00344c" />
                ) : (
                  <>
                    <MaterialIcons name="send" size={20} color="#00344c" />
                    <Text className="font-bold text-on-primary tracking-widest uppercase ml-3">REQUEST RESET PIN</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <AuthInput
                label="AUTHORIZATION CODE"
                subLabel="6-DIGIT PIN"
                icon="lock-open"
                placeholder="123456"
                value={pin}
                onChangeText={setPin}
                keyboardType="number-pad"
              />
              <AuthInput
                label="NEW ENCRYPTION KEY"
                subLabel="NEW PASSWORD"
                icon="vpn-key"
                placeholder="••••••••••••"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              
              <TouchableOpacity 
                onPress={handleResetPassword}
                disabled={loading}
                className={`w-full bg-primary py-4 rounded-lg items-center justify-center flex-row shadow-sm mt-4 ${loading ? 'opacity-70' : ''}`}>
                {loading ? (
                  <ActivityIndicator color="#00344c" />
                ) : (
                  <>
                    <MaterialIcons name="update" size={20} color="#00344c" />
                    <Text className="font-bold text-on-primary tracking-widest uppercase ml-3">RESET PASSWORD</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity 
            onPress={() => step === 2 ? setStep(1) : router.back()}
            className="mt-6 items-center">
            <Text className="text-[10px] text-on-surface-variant tracking-widest uppercase underline">
              {step === 2 ? 'CHANGE EMAIL' : 'BACK TO LOGIN'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Diagnostic Metadata */}
        <View className="absolute bottom-6 left-6 right-6 flex-row justify-between opacity-30">
          <View>
            <Text className="text-[8px] tracking-[0.2em] text-on-background uppercase">RECOVERY_MODE</Text>
          </View>
          <View className="items-end">
            <Text className="text-[8px] tracking-[0.2em] text-secondary uppercase">ENCRYPTION: AES-256</Text>
          </View>
        </View>
      </ScrollView>

      {/* Decorative Corner Accents */}
      <View className="absolute top-12 left-6 w-12 h-12 border-t border-l border-primary/20 opacity-40 pointer-events-none" />
      <View className="absolute top-12 right-6 w-12 h-12 border-t border-r border-primary/20 opacity-40 pointer-events-none" />
    </SafeAreaView>
  );
}
