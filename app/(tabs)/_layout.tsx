import { Tabs } from 'expo-router';
import React, {useEffect} from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Home, UserCircle, SlidersHorizontal , MessageSquare, } from 'lucide-react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#ffffff');
  }, []);

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
          fontWeight: '700',
          fontSize: 25,
          shadowColor: 'none'
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
          fontSize: 10,
          paddingBottom: 12,
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
            <TouchableOpacity style={styles.headerBtn}>
              <SlidersHorizontal  color={'black'} size={18} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          tabBarIcon: ({ color, focused }) => (
            <MessageSquare color={color} size={24} style={{ marginTop: 7 }}/>
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
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  //#fcfbfb
  // #f3f3f3
  headerBtn: {
    backgroundColor: '#f3f0f0', 
    padding: 10,                    
    borderRadius: 25,               
    marginRight: 10
  }
})