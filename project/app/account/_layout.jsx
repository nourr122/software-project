// import { Tabs } from 'expo-router';

// export default function Layout() {
//   return <Tabs />;
// }

import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'


export default function _layout() {
    const router = useRouter();

  return (
    <Stack screenOptions={{
        headerStyle : {
          backgroundColor: 'white'
        },
        headerTintColor: 'black'
      }}>
   
    <Stack.Screen name="login" options={{ headerTitle: 'Login' }} />
    <Stack.Screen name="register" options={{ headerTitle: 'Create Account' }} />
    <Stack.Screen name="forgotpass" options={{ headerTitle: 'Forgot Password'}} />

   
  </Stack>
  )
}