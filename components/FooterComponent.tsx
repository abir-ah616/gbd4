import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GlassContainer } from './GlassContainer';
import { useTournament } from '@/context/TournamentContext';
import { Facebook, Instagram, Youtube } from 'lucide-react-native';

export const FooterComponent: React.FC = () => {
  const { socialTags } = useTournament();
  
  if (!socialTags.showSocial) return null;
  
  return (
    <GlassContainer style={styles.footer} intensity={30}>
      <View style={styles.socialIcons}>
        {socialTags.facebook && (
          <TouchableOpacity style={styles.iconButton}>
            <Facebook color="#ffffff" size={20} />
            <Text style={styles.socialText}>{socialTags.facebook}</Text>
          </TouchableOpacity>
        )}
        {socialTags.instagram && (
          <TouchableOpacity style={styles.iconButton}>
            <Instagram color="#ffffff" size={20} />
            <Text style={styles.socialText}>{socialTags.instagram}</Text>
          </TouchableOpacity>
        )}
        {socialTags.youtube && (
          <TouchableOpacity style={styles.iconButton}>
            <Youtube color="#ffffff" size={20} />
            <Text style={styles.socialText}>{socialTags.youtube}</Text>
          </TouchableOpacity>
        )}
      </View>
    </GlassContainer>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  socialText: {
    fontFamily: 'Exo-Regular',
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 5,
  },
});