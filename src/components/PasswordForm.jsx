import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { showMessage, hideMessage } from "react-native-flash-message";
import {updatePassword} from '../services/requests';

import { useAuthContext } from '../context/authContext';
import {padding, colors} from '../styles/base';

const schema = yup.object().shape({
  oldPassword: yup.string().required('La contraseña antigua es requerida'),
  newPassword: yup.string().required('La contraseña nueva es requerida'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña')
});

export default function PasswordForm() {
  const { user } = useAuthContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdatePress = async data => {
    try {
      const response = await updatePassword(data, user.accessToken);
      // console.log(response);
      showMessage({
        message: "Contraseña actualizada",
        description: "Tu contraseña fue actualizada correctamente",
        type: "success",
      });
      reset()
    } catch (error) {
      console.log({ error });
      console.log(error.response);
      showMessage({
        message: "Error",
        description: "Tu contraseña no pudo ser actualizada intenta nuevamente",
        type: "error",
      });
      // Alert.alert('Error', 'Hubo un error revise e intente nuevamente');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text h3>
        Cambiar contraseña
      </Text>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Contraseña anterior</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Contraseña anterior"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              errorMessage={errors.oldPassword?.message}
            />
          )}
          name="oldPassword"
          defaultValue=""
        />
      </View>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Contraseña nueva</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Contraseña nueva"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              errorMessage={errors.newPassword?.message}
            />
          )}
          name="newPassword"
          defaultValue=""
        />
      </View>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Confirmar contraseña</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Confirmar contraseña"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              errorMessage={errors.confirmPassword?.message}
            />
          )}
          name="confirmPassword"
          defaultValue=""
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cambiar contraseña"
          buttonStyle={[styles.button,{backgroundColor: colors.primary}]}
          type="solid"
          raised
          onPress={handleSubmit(handleUpdatePress)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: padding.lg,
  },
  formFieldWrapper: {
    flex: 1,
    width: '100%',
  },
  input: {
    width: '100%',
    color: '#000000',
  },
  labelText: {
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 10,
  },
  errorMessage: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: padding.lg,
    marginVertical: padding.xl,
  },
  button: {
    marginHorizontal: "1%",
    minWidth: "48%",
  }
});
