import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StorageService } from '../services/StorageService';

const HomeScreen = () => {
  console.log('HomeScreen rendering');
  const navigation = useNavigation();
  const [usageStats, setUsageStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0
  });

  useEffect(() => {
    loadUsageStats();
    const unsubscribe = navigation.addListener('focus', loadUsageStats);
    return unsubscribe;
  }, []);

  const loadUsageStats = async () => {
    try {
      const daily = await StorageService.getUsageStats(1);
      const weekly = await StorageService.getUsageStats(7);
      const monthly = await StorageService.getUsageStats(30);
      setUsageStats({ daily, weekly, monthly });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Water Quality Analyzer</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Today's Usage</Text>
          <Text style={styles.statValue}>{usageStats.daily.toFixed(1)}L</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Weekly Average</Text>
          <Text style={styles.statValue}>
            {(usageStats.weekly / 7).toFixed(1)}L
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Monthly Total</Text>
          <Text style={styles.statValue}>{usageStats.monthly.toFixed(1)}L</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.analyzeButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>Analyze Water Quality</Text>
      </TouchableOpacity>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Usage')}
        >
          <Text style={styles.actionText}>Log Usage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Articles')}
        >
          <Text style={styles.actionText}>Water Guide</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    padding: 20,
    backgroundColor: '#1E88E5',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    flex: 1,
    margin: 5,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  statValue: {
    color: '#1E88E5',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  analyzeButton: {
    backgroundColor: '#1565C0',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  actionButton: {
    backgroundColor: '#90CAF9',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#1565C0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;