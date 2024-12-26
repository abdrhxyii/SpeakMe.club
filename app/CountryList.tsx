import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { countries } from '@/data/appData';

export default function CountryList() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCountry = (country: any) => {
    setSelectedCountry(country);
  };

  return (
    <SafeAreaView style={Common.container}>
      <View style={[Common.content, { flex: 1 }]}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search country"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        </View>

        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item}
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable style={styles.countryItem} onPress={() => handleSelectCountry(item)}>
              <Text style={styles.countryText}>{item}</Text>
              <Ionicons
                name={selectedCountry === item ? "radio-button-on" : "radio-button-off"}
                size={20}
                color={selectedCountry === item ? Colors.light.primary : "gray"}
              />
            </Pressable>
          )}
        />
      </View>
      <Pressable style={styles.button}>
          <Text style={Common.continueText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.light.border
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  countryText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
