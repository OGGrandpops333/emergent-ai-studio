import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import FeaturesScreen from './screens/FeaturesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a1a' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Emergent AI Studio' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Chat' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons = { Studio: '🏠', Chat: '💬', Features: '✨' };
              return (
                <Text style={{ fontSize: size - 4, color }}>
                  {icons[route.name] ?? '●'}
                </Text>
              );
            },
            tabBarStyle: {
              backgroundColor: '#0a0a1a',
              borderTopColor: '#1e1e38',
            },
            tabBarActiveTintColor: '#6c63ff',
            tabBarInactiveTintColor: '#666680',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Studio" component={HomeStack} />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Features" component={FeaturesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
