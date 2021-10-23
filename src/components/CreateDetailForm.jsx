import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage} from 'react-native-flash-message';
import {createDetail} from '../services/requests';

import {useAuthContext} from '../context/authContext';
import {padding, colors} from '../styles/base';

const schema = yup.object().shape({
  title: yup.string().required('El titulo es requerido'),
  description: yup.string().notRequired(),
  option: yup.string().required('El tipo de movimiento es requerido'),
  amount: yup
    .string()
    .matches(/^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/, 'Monto no valido')
    .required('El monto es requerido'),
});

const CreateDetailForm = ({budgetInfo}) => {
  const {user} = useAuthContext();
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
      console.log(data);

      const response = await createDetail(
        data,
        user.accessToken,
        budgetInfo.IDBudget,
      );
      console.log(response);
      showMessage({
        message: 'Detalle creado',
        description: 'Tu detalle se creó correctamente',
        type: 'success',
      });
      reset();
      navigation.navigate('BudgetDetails', {budgetInfo});
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: 'Tu detalle no pudo ser creado, intenta nuevamente',
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
              placeholder="Nombre"
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
        <Text style={styles.labelText}>Tipo de detalle</Text>
        <Controller
          control={control}
          render={({field: {onChange, value, ...props}}) => (
            <RNPickerSelect
              onValueChange={value => {
                onChange(value);
              }}
              items={[
                {value: 1, name: 'Ingreso'},
                {value: 2, name: 'Egreso'},
              ].map(option => {
                return {
                  label: option.name,
                  value: option.value,
                  inputLabel: option.name,
                  key: option.value,
                };
              })}
              value={value}
              itemKey={value}
              style={{...styles.input, inputAndroid: {color: 'black'}}}
              placeholder={{label: 'Selecciona el tipo de detalle'}}
              {...props}
            />
          )}
          name="option"
          defaultValue=""
        />

        <ErrorMessage
          errors={errors}
          name="option"
          render={({message}) => (
            <Text style={{paddingLeft: 10, color: colors.warning}}>
              {message}
            </Text>
          )}
        />
      </View>

      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Monto</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="0.00"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="decimal-pad"
              value={value}
              errorMessage={errors.amount?.message}
            />
          )}
          name="amount"
          defaultValue=""
        />
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

export default CreateDetailForm;
