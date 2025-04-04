import React from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const games = [
  { id: '1', name: 'Wreflecto', description: 'Form symmetrical word grid', screen: '/wreflecto', color: '#007AFF' },
  { id: '2', name: 'Wriddle', description: 'Solve the riddle to find the word', screen: '/wriddle', color: '#34C759' },
  { id: '3', name: 'Wordfind', description: 'Choose the correct word', screen: '/wordfind', color: '#00CFFF' },
];

const Header = ({ text }: {text: string}) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{text}</Text>
  </View>
);

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Game Hub' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={styles.container}>
        <Header text="Vocabulist POC" />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={[styles.gameTitle, { color: item.color }]}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>

              <View style={styles.details}>
                <View style={styles.row}>
                  <FontAwesome name="calendar" size={14} color="#fff" />
                  <Text style={styles.date}> Daily Challenge</Text>
                </View>
                <TouchableOpacity onPress={() => router.push(item.screen)} style={[styles.button, { backgroundColor: item.color }]}>
                  <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  header: {
    marginBottom: 10,
  },
  gameTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    minWidth: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
