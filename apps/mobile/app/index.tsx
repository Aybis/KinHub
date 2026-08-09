import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.brand}>MAYA</Text>
      <Text style={styles.subtitle}>Manage All Your Assets</Text>
      <Text style={styles.tagline}>
        Everyone knows what the family wants, spends, buys, has, and leaks.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  brand: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 2,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#64748b',
  },
  tagline: {
    marginTop: 24,
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});