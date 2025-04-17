import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
   
      <Text style={styles.email}>{auth.currentUser?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
});