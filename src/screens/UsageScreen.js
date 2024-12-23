// src/screens/UsageScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StorageService } from '../services/StorageService';

const usageTypes = {
  shower: { name: 'Shower', liters: 65 },
  bath: { name: 'Bath', liters: 80 },
  drinking: { name: 'Glass of Water', liters: 0.25 },
  washing: { name: 'Washing Machine', liters: 50 },
  dishes: { name: 'Dishwasher', liters: 15 },
  toilet: { name: 'Toilet Flush', liters: 6 }
};

const UsageScreen = () => {
  const [usageType, setUsageType] = useState('shower');
  const [quantity, setQuantity] = useState(1);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    loadDailyData();
  }, []);

  const loadDailyData = async () => {
    const data = await StorageService.getDailyUsage();
    setDailyData(data);
  };

  const saveUsage = async () => {
    const usage = {
      type: usageType,
      quantity,
      liters: usageTypes[usageType].liters * quantity,
      timestamp: new Date().toISOString(),
    };

    await StorageService.saveUsage(usage);
    loadDailyData();
    setQuantity(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Type</Text>
        <Picker
          selectedValue={usageType}
          onValueChange={setUsageType}
          style={styles.picker}
        >
          {Object.entries(usageTypes).map(([key, value]) => (
            <Picker.Item key={key} label={value.name} value={key} />
          ))}
        </Picker>

        <Text style={styles.label}>Quantity</Text>
        <Picker
          selectedValue={quantity}
          onValueChange={setQuantity}
          style={styles.picker}
        >
          {[...Array(10)].map((_, i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.saveButton} onPress={saveUsage}>
          <Text style={styles.saveButtonText}>Log Water Usage</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Today's Usage</Text>
        {dailyData.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyText}>
              {usageTypes[item.type].name} x{item.quantity}
            </Text>
            <Text style={styles.litersText}>{item.liters}L</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#1E88E5',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    padding: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
  litersText: {
    fontSize: 16,
    color: '#1E88E5',
    fontWeight: 'bold',
  },
});

export default UsageScreen;