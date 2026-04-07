import React from 'react';
import { View, Text, Image } from 'react-native';

interface Props {
  title: string;
  notes?: string;
  date: string;
  cost: string;
  status: 'Completed' | 'Logged';
  odo: string;
  location?: string;
  imageUrl?: string;
  isFirst?: boolean;
}

export function HistoryItemCard({ title, notes, date, cost, status, odo, location, imageUrl, isFirst }: Props) {
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
      </View>
    </View>
  );
}
