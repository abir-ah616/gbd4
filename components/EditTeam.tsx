import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament, Team } from '@/context/TournamentContext';
import { GlassButton } from './GlassButton';

export const EditTeam: React.FC = () => {
  const { teams, updateTeam } = useTournament();
  
  const validateNumber = (text: string): number => {
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    return isNaN(number) ? 0 : number;
  };
  
  const handleTeamUpdate = (teamId: string, field: keyof Team, value: string | number) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;
    
    let updatedValue = value;
    
    if (field === 'wins' || field === 'pp' || field === 'kp') {
      updatedValue = validateNumber(value.toString());
    }
    
    updateTeam({
      ...team,
      [field]: updatedValue,
    });
  };
  
  return (
    <GlassContainer style={styles.container} intensity={60}>
      <Text style={styles.title}>Point Table Editor</Text>
      
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.logoCell]}>Logo</Text>
        <Text style={[styles.headerCell, styles.nameCell]}>Team Name</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>Wins</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>PP</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>KP</Text>
        <Text style={[styles.headerCell, styles.dataCell]}>Total</Text>
      </View>
      
      <ScrollView style={styles.tableBody}>
        {teams.map((team) => (
          <View key={team.id} style={styles.teamRow}>
            <View style={[styles.cell, styles.logoCell]}>
              <TouchableOpacity style={styles.logoPlaceholder}>
                {team.logo ? (
                  <Image source={{ uri: team.logo }} style={styles.logo} />
                ) : (
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
                    style={styles.logo} 
                  />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={[styles.cell, styles.nameCell]}>
              <TextInput
                style={styles.input}
                value={team.name}
                onChangeText={(text) => handleTeamUpdate(team.id, 'name', text)}
                placeholder="Team Name"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <TextInput
                style={styles.input}
                value={team.wins.toString()}
                onChangeText={(text) => handleTeamUpdate(team.id, 'wins', text)}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <TextInput
                style={styles.input}
                value={team.pp.toString()}
                onChangeText={(text) => handleTeamUpdate(team.id, 'pp', text)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <TextInput
                style={styles.input}
                value={team.kp.toString()}
                onChangeText={(text) => handleTeamUpdate(team.id, 'kp', text)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            
            <View style={[styles.cell, styles.dataCell]}>
              <Text style={styles.totalText}>{team.total}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <GlassButton
          title="Save Changes"
          onPress={() => {}}
          gradientColors={['#4e54c8', '#8f94fb']}
        />
      </View>
    </GlassContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Orbitron-SemiBold',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerCell: {
    fontFamily: 'Orbitron-Medium',
    color: '#ffffff',
    fontSize: 14,
  },
  tableBody: {
    flex: 1,
  },
  teamRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  cell: {
    padding: 4,
  },
  logoCell: {
    width: '15%',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  nameCell: {
    width: '35%',
  },
  dataCell: {
    width: '12.5%',
    alignItems: 'center',
  },
  input: {
    color: '#ffffff',
    fontFamily: 'Exo-Medium',
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '100%',
    textAlign: 'center',
  },
  totalText: {
    color: '#ffffff',
    fontFamily: 'Exo-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    padding: 4,
    backgroundColor: 'rgba(78, 84, 200, 0.3)',
    borderRadius: 8,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
  },
});