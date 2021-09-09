import React from 'react'
import { useState } from 'react'
import { View, TextInput, Image, Button, Alert, StyleSheet } from 'react-native'

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSigninPress = () => {
    if (user.trim().length > 0 && password.trim().length > 0) {
      if (user === "amir" && password === "codigo123") {
        navigation.navigate('Home');
      } else {
        Alert.alert(
          "Error",
          "Usuario y/o contraseña incorrectos"
        );
        setPassword("");
      }
    }
  }

  const handleChangeUser = (userText) => {
    setUser(userText);
  }

  const handleChangePassword = (passText) => {
    setPassword(passText);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="User"
          style={styles.textInput}
          onChangeText={handleChangeUser}
          value={user}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={handleChangePassword}
          value={password}
        />
      </View>
      <Button
        color={styles.button.backgroundColor}
        style={styles.button}
        title="Sign in"
        onPress={handleSigninPress}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 18
  },
  imageContainer: {
    marginVertical: 10
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  inputContainer: {
  },
  textInput: {
    backgroundColor: '#FFF',
    padding: 6,
    color: '#212121',
    fontSize: 20,
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#1976b2',
    marginVertical: 12,
    paddingVertical: 6
  }
});

export default LoginScreen;
