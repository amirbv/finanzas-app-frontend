import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { getStates } from "../../services/requests";

import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Button, Input, Text, Image } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../../styles/styles";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es necesario"),
  email: yup
    .string()
    .email("El correo no tiene formato valido")
    .required("El correo es necesario"),
  password: yup.string().required("La contraseña es necesaria"),
  state: yup.string().required("El estado es necesario"),
  city: yup.string().required("La ciudad es necesaria"),
});

const SignUpScreen = ({ navigation }) => {
  const { signupUser } = useAuthContext();
  const [loadingStates, setLoadingStates] = useState(false);
  const [states, setStates] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const { data } = await getStates();
        setStates(data);
        setLoadingStates(false);
      } catch (error) {
        console.log({ error });
        Alert.alert(
          'Error',
          'Los estados no fueron cargados correctamente por favor intente nuevamente'
        );
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  const handleSignup = async (data) => {
    try {
      await signupUser(data.name, data.email, data.password, data.state, data.city);
      
    } catch (error) {
      console.log({error})
      Alert.alert(
        "Error",
        "Hubo un error revise e intente nuevamente",
      )
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, { marginTop: 40 }]}>
        <Image
          style={styles.logo}
          source={require('../../assets/finanzy_logo.png')}
        />
        <Text h2 style={styles.section}>
          Crea tu cuenta
        </Text>
        <View style={styles.formFieldWrapper}>
          <Text style={styles.labelText}>Nombre</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nombre"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
            defaultValue=""
          />
        </View>
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
        <View style={styles.formFieldWrapper}>
          <Text style={styles.labelText}>Estado</Text>
          {
            loadingStates ? (
              <Text>Cargando...</Text>
            ) : (
              <Controller
                control={control}
                render={({ field: { onChange, value, ...props } }) => (
                  <RNPickerSelect
                    onValueChange={value => {
                      onChange(value);
                    }}
                    items={states.map((state) => {
                      return {
                        label: state.name,
                        value: state.IDStates,
                        inputLabel: state.name,
                        key: state.IDStates
                      };
                    })}
                    value={value}
                    itemKey={value}
                    style={{...styles.input, inputAndroid: { color: 'black' }}}
                    placeholder={{ label: "Selecciona un estado" }}
                    {...props}
                  />
                )
                }
                name="state"
                defaultValue=""
              />
            )
          }
          <ErrorMessage
            errors={errors}
            name="state"
            render={({message}) => <Text>{message}</Text>}
          />
        </View>
        

        <View style={styles.formFieldWrapper}>
          <Text style={styles.labelText}>Ciudad</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Ciudad"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.city?.message}
              />
            )}
            name="city"
            defaultValue=""
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Crear cuenta"
            buttonStyle={{backgroundColor: '#103442'}}
            type="solid"
            raised
            onPress={handleSubmit(handleSignup)}
          />
        </View>

        <View>
          <Text>Ya tienes cuenta?</Text>
          <Button
            title="Inicia sesión!"
            type="clear"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>

    </ScrollView>
  );
};

export default SignUpScreen;

