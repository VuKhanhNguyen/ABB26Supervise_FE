import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, Dimensions, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useToastStore from '@/shared/store/useToastStore';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  runOnJS 
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VehicleSettingsOption {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  subtitle?: string;
  color?: string;
  isDestructive?: boolean;
  onPress: () => void;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  vehicleName?: string;
}

export function VehicleSettingsSheet({ visible, onClose, vehicleName = 'Honda Air Blade 2026' }: Props) {
  const router = useRouter();
  const showToast = useToastStore(state => state.show);
  
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  // State quản lý việc hiển thị box nhập liệu cho "Đổi tên xe" / "Cập nhật ODO"
  const [promptConfig, setPromptConfig] = useState<{ visible: boolean; type: 'rename' | 'odo'; value: string } | null>(null);

  const closePrompt = () => setPromptConfig(null);

  const handleSavePrompt = () => {
    if (!promptConfig) return;
    if (promptConfig.type === 'rename') {
      showToast(`Đã đổi tên xe thành "${promptConfig.value}"`, 'success');
    } else {
      showToast(`Đã cập nhật ODO thành ${promptConfig.value} km`, 'success');
    }
    closePrompt();
    handleClose();
  };

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { 
        damping: 20, 
        stiffness: 150,
        mass: 0.8,
      });
      backdropOpacity.value = withTiming(1, { duration: 250 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20, stiffness: 150 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleClose = () => {
    translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20, stiffness: 150 });
    backdropOpacity.value = withTiming(0, { duration: 200 });
    // Delay the actual close to allow animation to finish
    setTimeout(onClose, 250);
  };

  const options: VehicleSettingsOption[] = [
    {
      icon: 'edit',
      label: 'Đổi tên xe',
      subtitle: 'Thay đổi tên hiển thị của xe',
      color: '#98cdf2',
      onPress: () => { setPromptConfig({ visible: true, type: 'rename', value: vehicleName }); },
    },
    {
      icon: 'speed',
      label: 'Cập nhật ODO',
      subtitle: 'Cập nhật số km hiện tại',
      color: '#6fd8c8',
      onPress: () => { setPromptConfig({ visible: true, type: 'odo', value: '12500' }); },
    },
    {
      icon: 'notifications-active',
      label: 'Cài đặt thông báo',
      subtitle: 'Cảnh báo bảo dưỡng, tốc độ',
      color: '#c7e7ff',
      onPress: () => { 
        handleClose();
        setTimeout(() => showToast('Tính năng đang phát triển', 'info'), 300);
      },
    },
    {
      icon: 'build',
      label: 'Lịch sử bảo dưỡng',
      subtitle: 'Xem lịch sử thay thế linh kiện',
      color: '#8cf5e4',
      onPress: () => { 
        handleClose();
        setTimeout(() => router.push('/(tabs)/history'), 300); 
      },
    },
    {
      icon: 'info-outline',
      label: 'Thông tin thiết bị',
      subtitle: 'Firmware, Serial, phiên bản',
      color: '#c1c7ce',
      onPress: () => { 
        Alert.alert(
          'THÔNG TIN THIẾT BỊ',
          'Tên thiết bị: AB2026_NVK\nFirmware: v4.2.0-stable\nSerial: NVK-0911-2026\nTrạng thái: Đang kết nối (Bluetooth LE)',
          [{ text: 'ĐÓNG', style: 'cancel' }]
        );
      },
    },
    {
      icon: 'link-off',
      label: 'Ngắt kết nối thiết bị',
      subtitle: 'Hủy liên kết xe khỏi tài khoản',
      isDestructive: true,
      color: '#ffb3b1',
      onPress: () => { 
        Alert.alert(
          'XÁC NHẬN HỦY LIÊN KẾT',
          'Bạn có chắc chắn muốn ngắt kết nối xe này khỏi ứng dụng? Lịch sử dữ liệu sẽ được giữ nguyên.',
          [
            { text: 'HỦY', style: 'cancel' },
            { 
              text: 'NGẮT KẾT NỐI', 
              style: 'destructive',
              onPress: () => {
                handleClose();
                setTimeout(() => showToast('Đã ngắt kết nối khỏi thiết bị', 'success'), 300);
              }
            }
          ]
        );
      },
    },
  ];

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} statusBarTranslucent animationType="none">
      {/* Backdrop */}
      <Animated.View 
        style={[
          { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)' },
          backdropStyle,
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={handleClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View 
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#1c1b1b',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: 40,
            // Shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 0.4,
            shadowRadius: 24,
            elevation: 20,
          },
          sheetStyle,
        ]}
      >
        {/* Drag Handle */}
        <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 8 }}>
          <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#41484d' }} />
        </View>

        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(65, 72, 77, 0.3)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 10, 
                fontWeight: '700', 
                letterSpacing: 2, 
                textTransform: 'uppercase', 
                color: '#8b9198',
                marginBottom: 4,
              }}>
                CÀI ĐẶT XE
              </Text>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                color: '#e5e2e1',
                fontFamily: 'Space Grotesk',
              }}>
                {vehicleName}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={handleClose}
              style={{ 
                width: 36, 
                height: 36, 
                borderRadius: 18, 
                backgroundColor: '#353534', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={18} color="#c1c7ce" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Options List */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          {options.map((option, index) => (
            <React.Fragment key={option.label}>
              {/* Separator before destructive action */}
              {option.isDestructive && (
                <View style={{ height: 1, backgroundColor: 'rgba(65, 72, 77, 0.3)', marginVertical: 4, marginHorizontal: 8 }} />
              )}
              <TouchableOpacity
                onPress={option.onPress}
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                  marginVertical: 2,
                }}
              >
                {/* Icon Container */}
                <View style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: option.isDestructive 
                    ? 'rgba(255, 179, 177, 0.08)' 
                    : 'rgba(152, 205, 242, 0.06)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                  borderWidth: 1,
                  borderColor: option.isDestructive 
                    ? 'rgba(255, 179, 177, 0.15)' 
                    : 'rgba(152, 205, 242, 0.08)',
                }}>
                  <MaterialIcons 
                    name={option.icon} 
                    size={20} 
                    color={option.color || '#98cdf2'} 
                  />
                </View>

                {/* Text */}
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 14, 
                    fontWeight: '600', 
                    color: option.isDestructive ? '#ffb3b1' : '#e5e2e1',
                    marginBottom: 2,
                  }}>
                    {option.label}
                  </Text>
                  {option.subtitle && (
                    <Text style={{ 
                      fontSize: 11, 
                      color: option.isDestructive ? 'rgba(255, 179, 177, 0.5)' : '#8b9198',
                    }}>
                      {option.subtitle}
                    </Text>
                  )}
                </View>

                {/* Chevron */}
                <MaterialIcons 
                  name="chevron-right" 
                  size={20} 
                  color={option.isDestructive ? 'rgba(255, 179, 177, 0.4)' : '#41484d'} 
                />
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </Animated.View>

      {/* Custom Prompt Dialog for "Đổi tên xe" / "Cập nhật ODO" */}
      <Modal visible={!!promptConfig?.visible} transparent animationType="fade" statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <View style={{ backgroundColor: '#1c1b1b', width: '100%', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#e5e2e1', marginBottom: 8, fontFamily: 'Space Grotesk' }}>
                {promptConfig?.type === 'rename' ? 'Đổi tên xe' : 'Cập nhật số ODO'}
              </Text>
              <Text style={{ fontSize: 13, color: '#8b9198', marginBottom: 16 }}>
                {promptConfig?.type === 'rename' 
                  ? 'Nhập tên mới cho xe của bạn để dễ dàng nhận diện và quản lý trên hệ thống.' 
                  : 'Nhập số km ODO hiển thị trên mặt đồng hồ hiện tại của xe.'}
              </Text>
              
              <TextInput
                style={{
                  backgroundColor: '#0e0e0e',
                  borderWidth: 1,
                  borderColor: '#41484d',
                  borderRadius: 12,
                  padding: 14,
                  color: '#e5e2e1',
                  fontSize: 16,
                  marginBottom: 24
                }}
                value={promptConfig?.value}
                onChangeText={(text) => setPromptConfig(prev => prev ? { ...prev, value: text } : null)}
                placeholder={promptConfig?.type === 'rename' ? 'Ví dụ: AB 2026 của Khang' : 'Ví dụ: 12500'}
                placeholderTextColor="#8b9198"
                autoFocus
                keyboardType={promptConfig?.type === 'odo' ? 'numeric' : 'default'}
                selectionColor="#98cdf2"
              />
              
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                <TouchableOpacity 
                  onPress={closePrompt}
                  style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, justifyContent: 'center' }}
                >
                  <Text style={{ color: '#c7e7ff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1 }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleSavePrompt}
                  style={{ backgroundColor: '#98cdf2', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, justifyContent: 'center' }}
                >
                  <Text style={{ color: '#00344c', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1 }}>
                    {promptConfig?.type === 'rename' ? 'Lưu tên' : 'Cập nhật'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </Modal>
  );
}
