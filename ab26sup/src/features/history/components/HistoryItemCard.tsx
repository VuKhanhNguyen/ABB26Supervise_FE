import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  id: string;
  title: string;
  notes?: string;
  date: string;
  cost: string;
  status: 'Completed' | 'Logged';
  odo: string;
  location?: string;
  imageUrl?: string;
  isFirst?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function HistoryItemCard({ id, title, notes, date, cost, status, odo, location, imageUrl, isFirst, onEdit, onDelete }: Props) {
  const isCompleted = status === 'Completed';

  return (
    <View className="relative pl-14 mb-8">
      {/* Timeline Dot */}
      <View className={`absolute left-[21px] top-6 w-2 h-2 rounded-full z-10 ${
        isFirst ? 'bg-primary shadow-sm shadow-primary' : 'bg-outline'
      }`} style={isFirst ? { borderWidth: 4, borderColor: 'rgba(152, 205, 242, 0.2)', marginLeft: -4, marginTop: -4 } : {}}/>
      
      <View className={`rounded-lg p-5 ${
        isFirst ? 'bg-surface-container border-t border-primary/20 shadow-xl' : 'bg-surface-container-low'
      }`}>
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1 mr-2">
            <Text className={`font-headline text-lg font-semibold ${isFirst ? 'text-primary' : 'text-on-surface'}`}>
              {title}
            </Text>
            {notes ? (
              <Text className="text-[11px] text-outline-variant font-medium italic mt-0.5" numberOfLines={1}>
                {notes}
              </Text>
            ) : null}
            <Text className="text-[11px] text-outline font-bold tracking-wider mt-1">{date}</Text>
          </View>
          <View className="items-end">
            <Text className="font-headline text-lg font-bold text-on-surface mb-1">{cost}</Text>
            {isCompleted ? (
              <View className="px-2 py-0.5 rounded bg-secondary-container">
                <Text className="text-on-secondary text-[10px] font-bold uppercase tracking-tighter">Completed</Text>
              </View>
            ) : (
              <View className="px-2 py-0.5 rounded bg-surface-variant">
                <Text className="text-on-surface-variant text-[10px] font-bold uppercase tracking-tighter">Logged</Text>
              </View>
            )}
          </View>
        </View>

        {(imageUrl || location) && (
          <View className="flex-row items-center justify-between mb-2 mt-2">
             <View className="flex-1 mr-4">
               <View className="flex-row justify-between items-center mb-2">
                 <Text className="text-outline uppercase font-bold tracking-widest text-[9px]">ODO Reading</Text>
                 <Text className="text-on-surface font-headline font-medium text-xs">{odo}</Text>
               </View>
               {location && (
                 <View className="flex-row justify-between items-center">
                   <Text className="text-outline uppercase font-bold tracking-widest text-[9px]">Location</Text>
                   <Text className="text-on-surface font-headline font-medium text-xs">{location}</Text>
                 </View>
               )}
             </View>
             {imageUrl && (
                <View className="w-16 h-16 rounded-lg bg-surface-container-lowest overflow-hidden border border-outline-variant/30 flex-shrink-0">
                  <Image source={{ uri: imageUrl }} className="w-full h-full opacity-60" resizeMode="cover" />
                </View>
              )}
          </View>
        )}
        {!imageUrl && !location && (
           <View className="flex-row justify-between items-center">
             <Text className="text-outline uppercase font-bold tracking-widest text-[9px]">ODO Reading</Text>
             <Text className="text-on-surface font-headline font-medium text-xs">{odo}</Text>
           </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row justify-end mt-4 pt-3 border-t border-outline-variant/10">
          <TouchableOpacity 
            onPress={() => onEdit?.(id)}
            className="flex-row items-center bg-surface-variant/30 px-3 py-1.5 rounded-md mr-2"
          >
            <MaterialIcons name="edit" size={14} color="#3079a8" />
            <Text className="text-primary text-[10px] font-bold ml-1 uppercase">Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onDelete?.(id)}
            className="flex-row items-center bg-error-container/20 px-3 py-1.5 rounded-md"
          >
            <MaterialIcons name="delete-outline" size={14} color="#ba1a1a" />
            <Text className="text-error text-[10px] font-bold ml-1 uppercase">Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
