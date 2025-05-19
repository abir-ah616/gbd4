import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table2, List, Settings } from 'lucide-react-native';
import { GlassButton } from '@/components/GlassButton';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://files.catbox.moe/yt2t9h.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Almighty Tournament</Text>
            <Text style={styles.subtitle}>Leaderboard UI</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <GlassButton
              title="Point Table"
              onPress={() => router.push('/point-table')}
              icon={<Table2 color="#ffffff" size={24} style={styles.buttonIcon} />}
              gradientColors={['#4e54c8', '#8f94fb']}
            />
            
            <GlassButton
              title="Slot List"
              onPress={() => router.push('/slot-list')}
              icon={<List color="#ffffff" size={24} style={styles.buttonIcon} />}
              gradientColors={['#4e54c8', '#8f94fb']}
            />
            
            <GlassButton
              title="Editor Dashboard"
              onPress={() => router.push('/editor')}
              icon={<Settings color="#ffffff" size={24} style={styles.buttonIcon} />}
              gradientColors={['#4e54c8', '#8f94fb']}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 36,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(78, 84, 200, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: 'Exo-Medium',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
  },
  buttonIcon: {
    marginRight: 4,
  },
});