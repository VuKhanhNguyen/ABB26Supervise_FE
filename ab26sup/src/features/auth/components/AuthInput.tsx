import React, { useState } from "react";
import { View, Text, TextInput, KeyboardTypeOptions, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

export function AuthInput({
  label,
  subLabel,
  placeholder,
  icon,
  secureTextEntry,
  suffix,
  keyboardType,
  editable = true,
  value,
  onChangeText,
}: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry === true;

  return (
    <View className="mb-6">
      <View className="flex-row justify-between mb-2">
        <Text className="text-xs font-bold text-outline-variant tracking-wider uppercase">
          {label}
        </Text>
        {subLabel && (
          <Text className="text-[10px] text-primary/50 uppercase tracking-widest">
            {subLabel}
          </Text>
        )}
      </View>
      <View className="relative justify-center">
        <View className="absolute left-3 z-10">
          <MaterialIcons
            name={icon}
            size={18}
            color={isFocused ? "#98cdf2" : "#c1c7ce"}
          />
        </View>
        <TextInput
          className={`w-full pl-10 pr-12 py-3 border-b-2 text-on-surface font-bold ${
            isFocused ? "border-primary" : "border-outline-variant"
          } ${!editable ? "opacity-70" : ""}`}
          style={{ backgroundColor: "transparent" }}
          placeholder={placeholder}
          placeholderTextColor="#41484d"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          cursorColor="#98cdf2"
          selectionColor="rgba(152, 205, 242, 0.3)"
          autoCapitalize="none"
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 z-10 p-1"
          >
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={20} 
              color="#c1c7ce" 
            />
          </TouchableOpacity>
        )}
        {suffix && !isPassword && (
          <View className="absolute right-4 justify-center">
            <Text className="text-[10px] font-bold text-outline">{suffix}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

