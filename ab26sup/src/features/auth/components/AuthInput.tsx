import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface AuthInputProps {
  label: string;
  subLabel?: string;
  placeholder: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  secureTextEntry?: boolean;
  suffix?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function AuthInput({ label, subLabel, placeholder, icon, secureTextEntry, suffix, keyboardType, editable = true, value, onChangeText }: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-6">
      <View className="flex-row justify-between mb-2">
        <Text className="text-xs font-bold text-outline-variant tracking-wider uppercase">
          {label}
        </Text>
        {subLabel && (
          <Text className="text-[10px] text-primary/50 uppercase tracking-widest">{subLabel}</Text>
        )}
      </View>
      <View className="relative justify-center">
        <View className="absolute left-3 z-10">
          <MaterialIcons 
            name={icon} 
            size={18} 
            color={isFocused ? '#98cdf2' : '#c1c7ce'} 
          />
        </View>
        <TextInput
          className={`w-full pl-10 pr-12 py-3 bg-surface-container-lowest border-b-2 text-on-surface transition-all font-bold ${
            isFocused ? 'border-primary' : 'border-outline-variant'
          } ${!editable ? 'opacity-70' : ''}`}
          placeholder={placeholder}
          placeholderTextColor="#41484d"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {suffix && (
          <View className="absolute right-4 justify-center">
            <Text className="text-[10px] font-bold text-outline">{suffix}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
