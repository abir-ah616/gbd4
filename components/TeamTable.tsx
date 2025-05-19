import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament, Team } from '@/context/TournamentContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const TeamTable: React.FC = () => {
  const { sortedTeams, meta } = useTournament();

  return (
    <GlassContainer style={styles.container} intensity={20}>
      <View style={styles.header}>
        <Text style={styles.weekDay}>Week {meta.week} Day {meta.day}</Text>
        
        <View style={styles.titleContainer}>
          <Text style={styles.hostName}>{meta.hostName}</Text>
          <Text style={styles.subtitle}>{meta.subtitle}</Text>
          <View style={styles.divider} />
          <View style={styles.standingsContainer}>
            <Text style={styles.title}>OVERALL STANDINGS</Text>
          </View>
        </View>
        
        {meta.showLogo && meta.logoUrl && (
          <Image source={{ uri: meta.logoUrl }} style={styles.logo} />
        )}
      </View>
      
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.rankCell]}>RANK</Text>
        <Text style={[styles.headerCell, styles.logoCell]}>LOGO</Text>
        <Text style={[styles.headerCell, styles.nameCell]}>TEAM NAME</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>WINS</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>PP</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>KP</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>TOTAL</Text>
      </View>
      
      <ScrollView style={styles.tableBody}>
        {sortedTeams.map((team, index) => (
          <TeamRow key={team.id} team={team} rank={index + 1} />
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <GlassContainer style={styles.socialContainer} intensity={30}>
          <View style={styles.socialContent}>
            {/* Social content from FooterComponent */}
          </View>
        </GlassContainer>
      </View>
    </GlassContainer>
  );
};

const TeamRow: React.FC<{ team: Team; rank: number }> = ({ team, rank }) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(rank * 50).springify()}
      style={styles.dataRow}
    >
      <View style={[styles.cell, styles.rankCell]}>
        <Text style={styles.rankText}>#{String(rank).padStart(2, '0')}</Text>
      </View>
      
      <View style={[styles.cell, styles.logoCell]}>
        {team.logo ? (
          <Image source={{ uri: team.logo }} style={styles.teamLogo} />
        ) : (
          <View style={styles.logoPlaceholder} />
        )}
      </View>
      
      <View style={[styles.cell, styles.nameCell]}>
        <Text style={styles.teamName} numberOfLines={1}>{team.name}</Text>
      </View>
      
      <View style={[styles.cell, styles.dataCell]}>
        <Text style={styles.statText}>{team.wins}</Text>
      </View>
      
      <View style={[styles.cell, styles.dataCell]}>
        <Text style={styles.statText}>{team.pp}</Text>
      </View>
      
      <View style={[styles.cell, styles.dataCell]}>
        <Text style={styles.statText}>{team.kp}</Text>
      </View>
      
      <View style={[styles.cell, styles.dataCell]}>
        <Text style={styles.totalText}>{team.total}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 12, 24, 0.4)',
    borderColor: 'rgba(64, 224, 255, 0.1)',
    borderWidth: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  weekDay: {
    fontFamily: 'Orbitron-Regular',
    fontSize: 14,
    color: 'rgba(64, 224, 255, 0.7)',
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  hostName: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 24,
    color: '#40E0FF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Orbitron-Regular',
    fontSize: 16,
    color: 'rgba(64, 224, 255, 0.7)',
    marginTop: 4,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(64, 224, 255, 0.3)',
    marginVertical: 16,
  },
  standingsContainer: {
    backgroundColor: 'rgba(64, 224, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
  },
  title: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 20,
    color: '#40E0FF',
    textAlign: 'center',
    textShadowColor: 'rgba(64, 224, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  headerRow: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'rgba(64, 224, 255, 0.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
  },
  headerCell: {
    fontFamily: 'Orbitron-Medium',
    color: '#40E0FF',
    fontSize: 14,
    textAlign: 'center',
  },
  rankCell: {
    width: 60,
  },
  logoCell: {
    width: 50,
  },
  nameCell: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dataCell: {
    width: 60,
  },
  tableBody: {
    flex: 1,
  },
  dataRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 224, 255, 0.05)',
    alignItems: 'center',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 14,
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  teamLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  logoPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(64, 224, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
  },
  teamName: {
    fontFamily: 'Orbitron-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  statText: {
    fontFamily: 'Exo-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  totalText: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 14,
    color: '#40E0FF',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
  },
  socialContainer: {
    backgroundColor: 'rgba(64, 224, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 255, 0.2)',
    borderRadius: 12,
  },
  socialContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
});