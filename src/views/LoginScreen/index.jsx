import React, { useState } from "react";
import { useAuthContext } from '../../context/authContext';
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Button, Input, Text, Image } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from "../../styles/styles";

const schema = yup.object().shape({
  email: yup.string().email('El correo no tiene formato valido').required('El correo es necesario'),
  password: yup.string().required('La contraseña es necesaria')
});

const LoginScreen = ({ navigation }) => {
  const { loginUser } = useAuthContext();
  
  const { handleSubmit, control, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleLogin = async (data) => {
    await loginUser(data.email, data.password)
      .catch(error => {
        Alert.alert(
          "Error",
          "Usuario y/o contraseña incorrecta",
        )
      });
  }


  return (
    <ScrollView style={{flex: 1}}>
      <View style={[styles.container, {marginTop: 40}]}>
        <Image
          style={styles.logo}
          source={require('../../assets/finanzy_logo.png')}
        />
        <Text h2 style={styles.section}>Inicia Sesión</Text>
        <View style={styles.formFieldWrapper}>
          <Text style={styles.labelText}>Correo</Text>
          <Controller
            control={control}
            
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Correo"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                errorMessage={errors.email?.message}
              />
            )}
            name="email"
            defaultValue=""
          />
          

        </View>
        <View style={styles.formFieldWrapper}>
          <Text style={styles.labelText}>Contraseña</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Contraseña"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                errorMessage={errors.password?.message}
              />
            )}
            name="password"
            defaultValue=""
          />
          
        </View>

        <View style={styles.button}>
          <Button
            title="Iniciar sesión"
            buttonStyle={{backgroundColor: '#103442'}}
            type="solid"
            raised
            onPress={handleSubmit(handleLogin)}
          />

        </View>

        <View style={{marginVertical: 5}}>
          <Text style={{textAlign: 'center'}}>No tienes una cuenta?</Text>
          <Button
            title="Crea una!"
            type="clear"
            onPress={() => navigation.navigate("Signup")}
          />
        </View>

        <View style={{marginVertical: 5}}>
          <Text style={{textAlign: 'center'}}>Olvidaste tu contraseña?</Text>
          <Button
            title="Recuperar contraseña"
            type="clear"
            onPress={() => navigation.navigate("RecoverPassword")}
          />
        </View>

      </View>
      
    </ScrollView>
  );
};

export default LoginScreen;
