import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

function TabBarIcon({ name, label, focused }: { name: React.ComponentProps<typeof MaterialIcons>['name']; label: string; focused: boolean }) {
  return (
    <View className={`items-center justify-center w-20 py-2 rounded-xl h-16 ${focused ? 'bg-zinc-900/80' : ''}`}>
      {focused && <View className="absolute top-0 left-4 right-4 h-[2px] bg-sky-500 rounded-full" />}
      <MaterialIcons name={name} size={focused ? 22 : 20} color={focused ? '#38bdf8' : '#71717a'} />
      <Text 
        numberOfLines={1}
        className={`text-[9px] font-bold tracking-[0.15em] mt-1.5 uppercase ${focused ? 'text-sky-400' : 'text-zinc-500'}`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#09090b', // bg-zinc-950
          borderTopWidth: 1,
          borderTopColor: '#18181b', // bg-zinc-900
          height: 85,
          paddingTop: 10,
          paddingBottom: 25,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#71717a',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'DASHBOARD',
          tabBarIcon: ({ focused }) => <TabBarIcon name="dashboard" label="DASHBOARD" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'HISTORY',
          tabBarIcon: ({ focused }) => <TabBarIcon name="history" label="HISTORY" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'ALERTS',
          tabBarIcon: ({ focused }) => <TabBarIcon name="notifications" label="ALERTS" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ focused }) => <TabBarIcon name="person" label="PROFILE" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
