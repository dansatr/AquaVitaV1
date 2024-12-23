import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  saveUsage: async (usage) => {
    try {
      const existingData = await AsyncStorage.getItem('waterUsage');
      const data = existingData ? JSON.parse(existingData) : [];
      data.push(usage);
      await AsyncStorage.setItem('waterUsage', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving usage:', error);
      return false;
    }
  },

  getDailyUsage: async () => {
    try {
      const data = await AsyncStorage.getItem('waterUsage');
      if (!data) return [];

      const usageData = JSON.parse(data);
      const today = new Date().toDateString();
      
      return usageData.filter(item => 
        new Date(item.timestamp).toDateString() === today
      );
    } catch (error) {
      console.error('Error getting daily usage:', error);
      return [];
    }
  },

  getUsageStats: async (days) => {
    try {
      const data = await AsyncStorage.getItem('waterUsage');
      if (!data) return 0;

      const usageData = JSON.parse(data);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      return usageData
        .filter(item => new Date(item.timestamp) >= cutoffDate)
        .reduce((sum, item) => sum + item.liters, 0);
    } catch (error) {
      console.error('Error getting usage stats:', error);
      return 0;
    }
  },

  clearOldData: async () => {
    try {
      const data = await AsyncStorage.getItem('waterUsage');
      if (!data) return;

      const usageData = JSON.parse(data);
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - 3);

      const filteredData = usageData.filter(
        item => new Date(item.timestamp) >= cutoffDate
      );

      await AsyncStorage.setItem('waterUsage', JSON.stringify(filteredData));
    } catch (error) {
      console.error('Error clearing old data:', error);
    }
  },
};