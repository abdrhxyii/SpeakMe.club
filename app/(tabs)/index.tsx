import React, {useRef} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { RefreshCw, PhoneCall, Search } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
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

  const renderUserItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <View style={styles.profileInfo}>
        <Image source={item.profileImg} style={styles.profileImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtext}>
             {item.gender} • {item.country} • {item.talks} talks
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <PhoneCall color="white" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={Common.container}>
      <FlatList
        data={data}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
          <TouchableOpacity style={styles.perfectPartnerButton}>
            <Search color="white" size={25} />
            <Text style={styles.buttonText}>Find a perfect partner</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inviteText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
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
  callButton: {
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
  perfectPartnerButton: {
    backgroundColor:  Colors.light.primary,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
