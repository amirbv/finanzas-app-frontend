import React, { useState } from "react";
import { useAuthContext } from '../context/authContext';
import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import styles from "../styles/styles";

const SignUp = ({ navigation }) => {
  const { signupUser } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = async() => {
    console.log(email, password);
    await signupUser(email, password).catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
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
        onPress={handleSignup}
      />
      <Button
        buttonStyle={styles.button}
        title="Go to Login!"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default SignUp;

const inputStyles = StyleSheet.create({
  input: {
    width: '100%',
  }
})
