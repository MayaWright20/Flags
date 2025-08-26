import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="(games)"
        options={{
          title: 'Games',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={34}
              name={focused ? 'gamecontroller.fill' : 'gamecontroller'}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(flags)"
        options={{
          title: 'World flags',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={25}
              name={focused ? 'flag.fill' : 'flag'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(favourites)"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'heart.fill' : 'heart'}
              color={focused ? 'red' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'person.fill' : 'person'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
