import React, {useRef} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet, Vibration } from 'react-native';
import { RefreshCw, PhoneCall, Search } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const route = useRouter()
  const data = [
    {
      id: '1',
      name: 'Alexander horendas',
      status: 'offline',
      country: 'Iran',
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
      country: 'Iran',
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
      country: 'Iran',
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
      country: 'Iran',
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
      country: 'Iran',
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
      country: 'Iran',
      talks: 17,
      percentage: 100,
      gender: 'Male',
      profileImg: require('@/assets/images/user.jpg'),
    }
  ];

  const handleCall = () => {
    Vibration.vibrate(20) 
  }

  const handleProfile = () => {
    route.push('/Profile')
  }

  const renderUserItem = ({ item }: any) => (
    <Link href="/Profile" asChild>
      <TouchableOpacity  style={Common.userContainer} activeOpacity={0.6}>
        <View style={Common.profileInfo} pointerEvents="box-none">
        <View style={Common.imageContainer}>
          <Image source={item.profileImg} style={Common.profileImage} />
          <View style={Common.levelBadge}>
            <Text style={Common.levelText}>{item.level || 'B1'}</Text> 
          </View>
        </View>
          <View style={Common.details}>
            <Text style={Common.name}>{item.name}</Text>
            <Text style={Common.subtext}>
              {item.gender} • {item.country}
            </Text>
            <Text style={Common.subtext}>
              1200 talks
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.callButton} onPress={handleCall} activeOpacity={1}>
          <PhoneCall color="white" size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inviteText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
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
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#f3f0f0',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
});
