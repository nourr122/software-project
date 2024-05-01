import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Snacks from './Categories/Snacks';
import Register from './screens/Register';
import Profile from './Components/profile';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Register/> */}
      <Snacks/>
      {/* <Profile /> */}
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
});
