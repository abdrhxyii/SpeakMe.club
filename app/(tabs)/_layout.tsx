import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Home, UserCircle, SlidersHorizontal , Settings, User, ClipboardList } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function TabLayout() {
  const route = useRouter()

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
          // borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 8,
          color: Colors.light.primary
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
            <Home color={color} size={24} style={{ marginTop: 7 }}/>
          ),
          headerRight: () => (
            <TouchableOpacity style={[Common.headerBtn, { marginRight: 10 }]} onPress={() => router.navigate('/Authentication')}>
              <SlidersHorizontal  color={'black'} size={18} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, focused }) => (
            <ClipboardList color={color} size={24} style={{ marginTop: 7 }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="connection"
        options={{
          title: 'Connections',
          tabBarIcon: ({ color, focused }) => (
            <User color={color} size={24} style={{ marginTop: 7 }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <UserCircle color={color} size={24} style={{ marginTop: 7 }}/>
          ),
          headerShown: true,
          headerTitle: '', 
          headerRight: () => (
            <TouchableOpacity style={[Common.headerBtn, { marginRight: 10 }]} onPress={() => route.push('/Setting')}>
              <Settings  color={'black'} size={18} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
