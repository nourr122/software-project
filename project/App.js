import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductsList from './Components/ProductsList';
import Register from './screens/Register';
import Profile from './Components/profile';
import Homee from './homeScreen/Homee';
import Navbarr from './homeScreen/Navbarr';

export default function App() {
  return (
    <View style={styles.container}>
      <Homee/>
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
