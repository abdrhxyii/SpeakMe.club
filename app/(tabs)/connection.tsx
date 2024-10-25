import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { Ban } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, SafeAreaView,} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const data = [
    {
      id: '1',
      name: 'Alexander horendas',
      status: 'offline',
      country: 'United States',
      talks: 17,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '2',
      name: 'rashi',
      status: 'online',
      country: 'Saudi Arabia',
      talks: 187,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '3',
      name: 'Alexander horendas',
      status: 'offline',
      country: 'United States',
      talks: 17,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '4',
      name: 'rashi',
      status: 'online',
      country: 'Saudi Arabia',
      talks: 187,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '5',
      name: 'Alexander horendas',
      status: 'offline',
      country: 'United States',
      talks: 17,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '6',
      name: 'rashi',
      status: 'online',
      country: 'Saudi Arabia',
      talks: 187,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '7',
      name: 'Alexander horendas',
      status: 'offline',
      country: 'United States',
      talks: 17,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '8',
      name: 'rashi',
      status: 'online',
      country: 'Saudi Arabia',
      talks: 187,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '9',
      name: 'Alexander horendas',
      status: 'offline',
      country: 'United States',
      talks: 17,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '10',
      name: 'rashi',
      status: 'online',
      country: 'Saudi Arabia',
      talks: 187,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    },
    {
      id: '11',
      name: 'Alexander horendas',
      status: 'offline',
      country: 'United States',
      talks: 17,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    }
  ];

  const renderUserHistoryItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <View style={styles.profileInfo}>
        <Image source={item.profileImg} style={styles.profileImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtext}>
             {item.gender} • {item.country}
          </Text>
          <Text style={styles.subtext}>
             B1 Level  • 1200 talks
          </Text>
        </View>
      </View>
    </View>
  );

  const renderUserFriendItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <View style={styles.profileInfo}>
        <Image source={item.profileImg} style={styles.profileImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtext}>
             {item.gender} • {item.country}
          </Text>
          <Text style={styles.subtext}>
             B1 Level  • 1200 talks
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const renderUserBlockedItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <View style={styles.profileInfo}>
        <Image source={item.profileImg} style={styles.profileImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtext}>
             {item.gender} • {item.country}
          </Text>
          <Text style={styles.subtext}>
             B1 Level  • 1200 talks
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{display: 'flex', alignItems: 'center'}}>
        <Ban color={Colors.light.danger} size={30} />
        <Text style={styles.removeButtonText}>Blocked</Text>
      </TouchableOpacity>
    </View>
  );

const HistoryRoute = () => (
    <SafeAreaView style={Common.container}>
        <FlatList
            data={data}
            renderItem={renderUserHistoryItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
        />
    </SafeAreaView>
);

const FriendsRoute = () => (
    <SafeAreaView style={Common.container}>
        <FlatList
            data={data}
            renderItem={renderUserFriendItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
        />
    </SafeAreaView>
);

const BlockedRoute = () => (
    <SafeAreaView style={Common.container}>
        <FlatList
            data={data}
            renderItem={renderUserBlockedItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
        />
    </SafeAreaView>
);

const RoomRoute = () => (
    <View style={styles.scene}>
      <Text style={styles.text}>RoomRoute</Text>
    </View>
  );

export default function Connection() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'history', title: 'History' },
    { key: 'friends', title: 'Friends' },
    { key: 'blocked', title: 'Blocked' },
  ]);

  const renderScene = SceneMap({
    history: HistoryRoute,
    friends: FriendsRoute,
    blocked: BlockedRoute,
  });


  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  tabBar: {
    backgroundColor: '#FFFFFF', 
  },
  indicator: {
    backgroundColor: Colors.light.primary,
    height: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary
  },

  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  details: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#777',
    fontSize: 14
  },
  actionButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  callText: {
    color: 'white',
    marginLeft: 5,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: Colors.light.danger,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButtonText: {
    color: Colors.light.danger,
    fontSize: 12,
  } 
});
