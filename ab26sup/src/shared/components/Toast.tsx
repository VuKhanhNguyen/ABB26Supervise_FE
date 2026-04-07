import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  runOnJS,
  FadeInUp,
  FadeOutUp
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import useToastStore, { ToastType } from '../store/useToastStore';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const getToastConfig = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        icon: 'check-circle' as const,
        color: '#6fd8c8', // secondary
        label: 'SUCCESS_PROTOCOL',
      };
    case 'error':
      return {
        icon: 'error' as const,
        color: '#ffb4ab', // error
        label: 'ERROR_DETECTED',
      };
    case 'warning':
      return {
        icon: 'warning' as const,
        color: '#f8d39d', // custom warning
        label: 'SYSTEM_WARNING',
      };
    default:
      return {
        icon: 'info' as const,
        color: '#98cdf2', // primary
        label: 'SYSTEM_INFO',
      };
  }
};

export const Toast = () => {
  const { visible, message, type, duration, hide } = useToastStore();
  const config = getToastConfig(type);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        hide();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, hide]);

  if (!visible) return null;

  return (
    <Animated.View 
      entering={FadeInUp.springify().damping(15)}
      exiting={FadeOutUp.duration(400)}
      style={styles.container}
    >
      <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
        <View style={[styles.borderLeft, { backgroundColor: config.color }]} />
        
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: `${config.color}20` }]}>
            <MaterialIcons name={config.icon} size={20} color={config.color} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.label}>{config.label}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>

        {/* Decorative elements to match AB26 aesthetic */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  blurContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(20, 20, 20, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  borderLeft: {
    width: 4,
    height: '100%',
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 2,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  corner: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  topLeft: {
    top: 8,
    left: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  topRight: {
    top: 8,
    right: 8,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
});
