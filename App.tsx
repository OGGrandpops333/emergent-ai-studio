import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import OldProjectsScreen from './src/screens/OldProjectsScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <OldProjectsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
});
