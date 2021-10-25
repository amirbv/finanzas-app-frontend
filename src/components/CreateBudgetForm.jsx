import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {showMessage} from 'react-native-flash-message';
import {createBudget} from '../services/requests';

import {useAuthContext} from '../context/authContext';
import {padding, colors} from '../styles/base';
import Notifications from '../services/Notifications';

const schema = yup.object().shape({
  title: yup.string().required('El titulo es requerido'),
  description: yup.string().notRequired(),
  notificationDate: yup
    .string()
    .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\-]\d{4}$/, 'Fecha no valida')
    .required('La fecha es requerida'),
});

const CreateBudgetForm = () => {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const handleCreatePress = async data => {
    try {
      console.log(data)
      const response = await createBudget(data, user.accessToken);

      console.log(response.data);
      showMessage({
        message: "Presupuesto creado",
        description: "Tu presupuesto se creó correctamente",
        type: "success",
      });
      await Notifications.scheduleNotification(
        new Date(response.data.notificationDate),
        response.data.IDBudget,
        `Presupuesto: ${response.data.title}`,
        "Recordatorio para añadir el presupuesto al monedero"
      )
      reset();
      navigation.replace('BudgetInfo', { budgetId: response.data.IDBudget });
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: 'Tu presupuesto no pudo ser creado, intenta nuevamente',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Titulo</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Titulo"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.title?.message}
            />
          )}
          name="title"
          defaultValue=""
        />
      </View>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Descripción</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Descripción (opcional)"
              style={styles.input}
              multiline={true}
              numberOfLines={2}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
          name="description"
          defaultValue=""
        />
      </View>

      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Fecha de notificación</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="DD-MM-AAAA"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="number-pad"
              value={value}
              errorMessage={errors.notificationDate?.message}
            />
          )}
          name="notificationDate"
          defaultValue=""
        />
        <Text style={styles.infoText}>Esta fecha no puede ser modificada, elija una adecuadamente</Text>
        <Text style={styles.infoText}>La notificación no será realizada en caso de que el usuario cierre sesión</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Crear"
          buttonStyle={[styles.button, {backgroundColor: colors.primary}]}
          type="solid"
          raised
          onPress={handleSubmit(handleCreatePress)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: padding.lg,
  },
  formFieldWrapper: {
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
  infoText: {
    fontSize: 14,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 10,
  },
  errorMessage: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: padding.lg,
    marginVertical: padding.xl,
  },
  button: {
    marginHorizontal: '1%',
    minWidth: '48%',
  },
});

export default CreateBudgetForm;
