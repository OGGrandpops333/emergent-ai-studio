import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';

export default function App() {
  const openGitHub = async () => {
    const url = 'https://github.com/OGGrandpops333';
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open this URL: " + url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergent AI Studio</Text>
      <TouchableOpacity style={styles.button} onPress={openGitHub}>
        <Text style={styles.buttonText}>Open My GitHub</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#24292e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
