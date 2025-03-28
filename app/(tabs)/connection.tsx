import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { Ban } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import api from '@/utils/apiServices';
import { baseUrl } from '@/utils/BaseUrl';
import { useUserStore } from '@/store/userStore';
import { connectionData } from '@/data/appData';
import { useFocusEffect } from 'expo-router';

const EmptyState = ({ message }: { message: string }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emoji}>😔</Text>
    <Text style={styles.emptyText}>{message}</Text>
    <Text style={styles.emptySubText}>Add friends to see your friends</Text>
  </View>
);

const renderUserHistoryItem = ({ item }: any) => (
  <TouchableOpacity style={Common.userContainer} activeOpacity={0.6}>
    <View style={Common.profileInfo} pointerEvents="box-none">
      <View style={Common.imageContainer}>
        <Image source={item.profileImg} style={Common.profileImage} />
        <View style={Common.levelBadge}>
          <Text style={Common.levelText}>{item.level || 'B1'}</Text>
        </View>
      </View>
      <View style={Common.details}>
        <Text style={Common.name}>{item.name}</Text>
        <Text style={Common.subtext}>{item.gender} • {item.country}</Text>
        <Text style={Common.subtext}>1200 talks</Text>
      </View>
    </View>
    <Text style={{ color: Colors.light.primary, fontSize: 15, fontWeight: '700' }}>190 Hr</Text>
  </TouchableOpacity>
);

const renderUserFriendItem = ({ item, onUnfriend }: { item: any, onUnfriend: (id: any) => void }) => (
  <TouchableOpacity style={Common.userContainer} activeOpacity={0.6}>
    <View style={Common.profileInfo} pointerEvents="box-none">
      <View style={Common.imageContainer}>
      <Image
          source={item.profilePictureUrl ? { uri: item.profilePictureUrl } : require('@/assets/images/defaultuser.jpg')}
          style={Common.profileImage}
        />
        <View style={Common.levelBadge}>
          <Text style={Common.levelText}>{item.level.replace(/\s*\(.*?\)/, '')}</Text>
        </View>
      </View>
      <View style={Common.details}>
        <Text style={Common.name}>{item.display_name}</Text>
        <Text style={Common.subtext}>{item.gender} • {item.country}</Text>
        <Text style={Common.subtext}>{item.talksCount} talks</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.removeButton} onPress={() => onUnfriend(item.id)}>
      <Text style={styles.removeButtonText}>Remove</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const renderUserBlockedItem = ({ item, onUnblock }: any) => (
  <TouchableOpacity style={Common.userContainer} activeOpacity={0.6}>
    <View style={Common.profileInfo} pointerEvents="box-none">
      <View style={Common.imageContainer}>
        <Image source={require('@/assets/images/defaultuser.jpg')} style={Common.profileImage} />
        <View style={Common.levelBadge}>
          <Text style={Common.levelText}>{item.level.replace(/\s*\(.*?\)/, '')}</Text>
        </View>
      </View>
      <View style={Common.details}>
        <Text style={Common.name}>{item.display_name}</Text>
        <Text style={Common.subtext}>{item.gender} • {item.country}</Text>
        <Text style={Common.subtext}>{item.talksCount} talks</Text>
      </View>
    </View>
    <TouchableOpacity style={{ display: 'flex', alignItems: 'center' }} onPress={() => onUnblock(item.id)}>
      <Ban color={Colors.light.danger} size={30} />
      <Text style={styles.removeButtonText}>Blocked</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const HistoryRoute = () => (
  <SafeAreaView style={Common.container}>
    {connectionData.length > 0 ? (
      <FlatList
        data={connectionData}
        renderItem={renderUserHistoryItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <EmptyState message="No history found" />
    )}
  </SafeAreaView>
);

const FriendsRoute = ({ friends, onUnfriend, loading }: { friends: any[], onUnfriend: (id: any) => void, loading : boolean }) => (
  <SafeAreaView style={Common.container}>
    {loading ? (
      <View style={Common.loaderContainer}>
        <ActivityIndicator size={65} color={'#000000'} />
      </View>
    ) : friends.length > 0 ? (
      <FlatList
        data={friends}
        renderItem={({ item }) => renderUserFriendItem({ item, onUnfriend })}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <EmptyState message="No friends found" />
    )}
  </SafeAreaView>
);

const BlockedRoute = ({ blockedUsers, onUnblock, loading }: { blockedUsers: any[], onUnblock: (id: any) => void, loading: boolean }) => (
  <SafeAreaView style={Common.container}>
    {loading ? (
      <View style={Common.loaderContainer}>
        <ActivityIndicator size={65} color={'#000000'} />
      </View>
    ) : blockedUsers.length > 0 ? (
      <FlatList
        data={blockedUsers}
        renderItem={({ item }) => renderUserBlockedItem({ item, onUnblock })}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <EmptyState message="No blocked users found" />
    )}
  </SafeAreaView>
);

export default function Connection() {
  const [index, setIndex] = useState(0);

  const { session } = useUserStore();

  const [friends, setFriends] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingBlocked, setLoadingBlocked] = useState(true);

  const [routes] = useState([
    { key: 'history', title: 'History' },
    { key: 'friends', title: 'Friends' },
    { key: 'blocked', title: 'Blocked' },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'history':
        return <HistoryRoute />;
      case 'friends':
        return <FriendsRoute friends={friends} onUnfriend={handleUnfriend} loading={loadingFriends}/>;
      case 'blocked':
        return <BlockedRoute blockedUsers={blockedUsers} onUnblock={handleUnblockUsers} loading={loadingBlocked}/>;
      default:
        return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (index === 1) {
        retrieveFriends();
      } else if (index === 2) {
        retrieveBlockedUsers();
      }
    }, [index, session.id])
  );  

  const retrieveFriends = async () => {
    setLoadingFriends(true);
    try {
      const { data, status } = await api.get(`${baseUrl}/friends/${session.id}`);
      if (status === 200) {
        setFriends(data.favouriteUsers);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setFriends([]);
      } else {
        console.log("Error fetching blocked users:", error);
      }
    } finally {
      setLoadingFriends(false);
    }
  };

  const retrieveBlockedUsers = async () => {
    setLoadingBlocked(true);

    try {
      const { data, status } = await api.get(`${baseUrl}/block/blocked/${session.id}`);
      if (status === 200) {
        setBlockedUsers(data.blockedUsers);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setBlockedUsers([]);
      } else {
        console.log("Error fetching blocked users:", error);
      }
    } finally {
      setLoadingBlocked(false);
    }
  };

  const handleUnfriend = async (favourite_user_id: any) => {
    try {
      const { status } = await api.delete(`${baseUrl}/friends/${session.id}/${favourite_user_id}`);
      if (status === 200) {
        retrieveFriends(); 
      }
    } catch (error) {
      console.log("Error handleUnfriend:", error);
    }
  };

  const handleUnblockUsers = async (id: any) => {
    try {
      const { status } = await api.delete(`${baseUrl}/block/${session.id}/${id}`);
      if (status === 200) {
        retrieveBlockedUsers();
      }
    } catch (error) {
      console.log("Error handleUnblockUsers :", error);
    }
  }

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
  actionButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginTop: 5,
    textAlign: 'center',
  },
});
