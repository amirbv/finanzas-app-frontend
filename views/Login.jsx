import React, { useState } from "react";
import { useAuthContext } from '../context/authContext';
import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import styles from "../styles/styles";

const Login = ({ navigation }) => {
  const { loginUser } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async() => {
    console.log(email,password);
    await loginUser(email, password).catch(error => console.log(error));
  }


  return (
    <View style={styles.container}>
      <Text style={styles.section}>Login Screen</Text>

      <Input
        placeholder="Correo"
        containerStyle={inputStyles.input}
        onChangeText={value => setEmail(value)}
        />

      <Input 
        placeholder="Clave"
        secureTextEntry={true}
        containerStyle={inputStyles.input}
        onChangeText={value => setPassword(value)}
      />
      <Button
        buttonStyle={styles.button}
        title="Log in"
        onPress={handleLogin}
      />

      <Button
        buttonStyle={styles.button}
        title="Go to Signup!"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

export default Login;

const inputStyles = StyleSheet.create({
  input: {
    width: '100%',
  }
})