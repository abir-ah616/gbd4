import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament } from '@/context/TournamentContext';

interface HeaderComponentProps {
  variant?: 'home' | 'points' | 'slots';
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ variant = 'home' }) => {
  const { meta } = useTournament();
  
  const renderWeekDay = () => {
    if (variant === 'home') return null;
    
    return (
      <View style={styles.weekDayContainer}>
        <Text style={styles.weekDay}>Week {meta.week} Day {meta.day}</Text>
      </View>
    );
  };
  
  const renderCenter = () => {
    if (variant === 'home' || !meta.showHostInfo) return null;
    
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.hostName}>{meta.hostName}</Text>
        <Text style={styles.subtitle}>{meta.subtitle}</Text>
      </View>
    );
  };
  
  const renderLogo = () => {
    if (variant === 'home' || !meta.showLogo) return null;
    
    return (
      <View style={styles.logoContainer}>
        <Image 
          source={{ 
            uri: meta.logoUrl || 'https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
          }} 
          style={styles.logo} 
        />
      </View>
    );
  };
  
  if (variant === 'home') {
    return (
      <View style={styles.homeHeader}>
        <Text style={styles.homeTitle}>Almighty Tournament</Text>
        <Text style={styles.homeSubtitle}>Leaderboard UI</Text>
      </View>
    );
  }
  
  return (
    <GlassContainer style={styles.header} intensity={40} neonBorder neonColor={['#4e54c8', '#8f94fb']}>
      <View style={styles.headerContent}>
        {renderWeekDay()}
        {renderCenter()}
        {renderLogo()}
      </View>
    </GlassContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekDayContainer: {
    flex: 1,
  },
  weekDay: {
    fontFamily: 'Orbitron-Medium',
    fontSize: 16,
    color: '#ffffff',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  hostName: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Orbitron-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  homeHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  homeTitle: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(78, 84, 200, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  homeSubtitle: {
    fontFamily: 'Exo-Medium',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
});