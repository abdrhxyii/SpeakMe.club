import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';

import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  const route = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: '#000',
          shadowColor: 'none',
          fontSize: 18,
        },
        headerTintColor: 'black',
        headerTitleAlign: 'center',
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 55,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 12,
          color: Colors.light.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitleAlign: 'left',
          headerTitle: 'Find a partner',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="home" color={color} size={24} style={{ marginTop: 7 }} />
          ),
          headerRight: () => (
            <TouchableOpacity style={[Common.headerBtn, { marginRight: 10 }]}>
              <FontAwesome name="sliders" color={'black'} size={18} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="clipboard" color={color} size={24} style={{ marginTop: 7 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="connection"
        options={{
          title: 'Connections',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" color={color} size={24} style={{ marginTop: 7 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-circle" color={color} size={24} style={{ marginTop: 7 }} />
          ),
          headerShown: true,
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity
              style={[Common.headerBtn, { marginRight: 10 }]}
              onPress={() => route.push('/Setting')}
            >
              <FontAwesome name="cog" color={'black'} size={18} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}