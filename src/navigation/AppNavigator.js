import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import UsageScreen from '../screens/UsageScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import CameraScreen from '../screens/CameraScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Usage':
              iconName = focused ? 'water' : 'water-outline';
              break;
            case 'Articles':
              iconName = focused ? 'book' : 'book-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#1E88E5',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#B3E5FC',
        headerStyle: {
          backgroundColor: '#1E88E5',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Usage" component={UsageScreen} />
      <Tab.Screen name="Articles" component={ArticlesScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E88E5',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{ title: 'Analyze Water' }}
      />
      <Stack.Screen 
        name="ArticleDetail" 
        component={ArticleDetailScreen} 
        options={({ route }) => ({ title: route.params?.title })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;