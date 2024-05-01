import { router } from "expo-router";
import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import { forgotpass, resetPassword, auth } from "../firebase/auth";
const ForgotPass = () => {
    const [email, setEmail] = useState("");
    //  const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handlePress = async () => {
       try {
             const credentials = await resetPassword(email);
             console.log('credentials', credentials);
            router.replace("/account/login")
       } catch (error) {
        if(error.message.includes('auth/missing-email')) 
          setError("Missing Email");
       else if(error.message.includes('auth/invalid-email'))
          setError("Invalid Email");
            console.log('error', JSON.stringify(error));
            

        }
    };




    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Button title="Reset" onPress={handlePress} ></Button>
            <Pressable onPress={() => router.replace("/account/login")}>
                <Text style={{ marginTop: 10 }}>Back to Login</Text>
            </Pressable>
            <Text style={styles.err}>{error}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        margin: 15,
    },
    err: {
        marginTop: 10,
        color: 'red'
      }
});
export default ForgotPass;