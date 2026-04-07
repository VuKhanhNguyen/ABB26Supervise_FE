import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  currentOdo: number;
  onUpdateOdo: (odo: number) => void;
}

export function HeroOdoCard({ currentOdo, onUpdateOdo }: Props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempOdo, setTempOdo] = useState(currentOdo.toString());

  const handleSave = () => {
    const newOdo = parseInt(tempOdo, 10);
    if (!isNaN(newOdo)) {
      onUpdateOdo(newOdo);
      setModalVisible(false);
    }
  };

  const openModal = () => {
    setTempOdo(currentOdo.toString());
    setModalVisible(true);
  };

  return (
    <View className="relative w-full mb-10">
      <TouchableOpacity 
        activeOpacity={0.85}
        onPress={openModal}
        className="w-full p-6 rounded-2xl shadow-xl active:scale-95 transition-all overflow-hidden relative"
      >
        <LinearGradient
          colors={['#98cdf2', '#3079a8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        
        {/* Subtle Shine Effect */}
        <View className="absolute inset-0 bg-white/5" />
        
        <Text className="text-[10px] font-bold tracking-[0.25em] text-on-primary/60 uppercase mb-1">
          Cập nhật ODO hôm nay
        </Text>
        
        <View className="flex-row items-baseline mt-1">
          <Text className="text-4xl font-bold font-headline text-on-primary tracking-tighter">
            {currentOdo.toLocaleString()}
          </Text>
          <Text className="text-sm font-bold font-headline text-on-primary/70 ml-1">
            KM
          </Text>
        </View>
        
        <View className="mt-5 flex-row items-center space-x-2 px-5 py-2.5 bg-white/10 rounded-full self-start">
          <MaterialIcons name="add-circle" size={16} color="#ffffff" />
          <Text className="text-xs font-bold tracking-widest uppercase text-white ml-2">
            NHẬP CHỈ SỐ MỚI
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center items-center bg-black/60 px-6"
        >
          <View className="bg-surface w-full p-8 rounded-3xl border border-white/10 shadow-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-on-surface font-headline">Cập nhật ODO</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text className="text-xs font-bold text-outline uppercase mb-2 tracking-widest">Số KM hiện tại</Text>
            <View className="flex-row items-center bg-surface-container-high px-4 py-4 rounded-xl border border-outline/20 mb-8">
              <MaterialIcons name="speed" size={24} color="#3079a8" />
              <TextInput
                className="flex-1 ml-4 text-2xl font-bold text-on-surface"
                keyboardType="numeric"
                value={tempOdo}
                onChangeText={setTempOdo}
                placeholder="0"
                placeholderTextColor="#666"
                autoFocus
              />
              <Text className="text-sm font-bold text-outline ml-2">KM</Text>
            </View>

            <TouchableOpacity 
              onPress={handleSave}
              className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-black/20"
            >
              <Text className="text-on-primary font-bold tracking-widest uppercase">XÁC NHẬN CẬP NHẬT</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
