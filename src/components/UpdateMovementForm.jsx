import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage} from 'react-native-flash-message';
import {getMovementsDependencies, updateMovement} from '../services/requests';

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
  movementType: yup.string().required('La clase de movimiento es requerida'),
  conversionRate: yup.string().notRequired(),
  conversionByUser: yup
    .string()
    .matches(/^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/, 'Monto no valido')
    .notRequired(),
});

const UpdateMovementForm = ({movementInfo, onUpdate}) => {
  const {user} = useAuthContext();
  const [editting, setEditting] = useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchedConversion = watch('conversionRate');
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [movementTypes, setMovementTypes] = useState([]);
  const [conversionRates, setConversionRates] = useState([]);

  const loadMovementsDependencies = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getMovementsDependencies(user.accessToken);
      // console.log(data);

      setOptions(data.options);
      setMovementTypes(data.movementType);
      setConversionRates(data.conversionRate);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: 'La información no pudo ser cargada intente nuevamente',
        type: 'error',
      });
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadMovementsDependencies();
  }, [loadMovementsDependencies]);

  const toggleEditting = () => setEditting(prevEditting => !prevEditting);

  const handleUpdatePress = async data => {
    try {
      const response = await updateMovement(
        data,
        user.accessToken,
        movementInfo.IDMovements,
      );
      showMessage({
        message: 'Movimiento actualizado',
        description: 'Tu movimiento se actualizó correctamente',
        type: 'success',
      });
      onUpdate();
      toggleEditting();
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description:
          'Tu movimiento no pudo ser actualizado, intenta nuevamente',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text h3>Actualizar movimiento</Text>
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
              disabled={!editting}
            />
          )}
          name="title"
          defaultValue={movementInfo.title}
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
              disabled={!editting}
            />
          )}
          name="description"
          defaultValue={movementInfo.description}
        />
      </View>

      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Tipo de movimiento</Text>
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <Controller
            control={control}
            render={({field: {onChange, value, ...props}}) => (
              <RNPickerSelect
                onValueChange={value => {
                  onChange(value);
                }}
                items={options.map(option => {
                  return {
                    label: option.name,
                    value: option.IDOptions,
                    inputLabel: option.name,
                    key: option.IDOptions,
                  };
                })}
                value={value}
                itemKey={value}
                style={{...styles.input, inputAndroid: {color: 'black'}}}
                placeholder={{ label: 'Selecciona el tipo de movimiento' }}
                disabled={!editting}
                {...props}
              />
            )}
            name="option"
            defaultValue={movementInfo.Options.IDOptions}
          />
        )}
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
              disabled={!editting}
              errorMessage={errors.amount?.message}
            />
          )}
          name="amount"
          defaultValue={`${movementInfo.amount}`}
        />
      </View>

      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Clase de movimiento</Text>
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <Controller
            control={control}
            render={({field: {onChange, value, ...props}}) => (
              <RNPickerSelect
                onValueChange={value => {
                  onChange(value);
                }}
                items={movementTypes.map(mType => {
                  return {
                    label: mType.name,
                    value: mType.IDMovementType,
                    inputLabel: mType.name,
                    key: mType.IDMovementType,
                  };
                })}
                value={value}
                itemKey={value}
                style={{...styles.input, inputAndroid: {color: 'black'}}}
                placeholder={{ label: 'Selecciona una clase de movimiento' }}
                disabled={!editting}
                {...props}
              />
            )}
            name="movementType"
            defaultValue={movementInfo.MovementTypes.IDMovementType}
          />
        )}
        <ErrorMessage
          errors={errors}
          name="movementType"
          render={({message}) => (
            <Text style={{paddingLeft: 10, color: colors.warning}}>
              {message}
            </Text>
          )}
        />
      </View>

      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Tipo de conversión (opcional)</Text>
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <Controller
            control={control}
            render={({field: {onChange, value, ...props}}) => (
              <RNPickerSelect
                onValueChange={value => {
                  onChange(value);
                }}
                items={conversionRates.map(cRate => {
                  return {
                    label: cRate.name,
                    value: cRate.IDConversionRate,
                    inputLabel: cRate.name,
                    key: cRate.IDConversionRate,
                  };
                })}
                value={value}
                itemKey={value}
                style={{...styles.input, inputAndroid: {color: 'black'}}}
                placeholder={{ label: 'Selecciona el tipo de conversión' }}
                disabled={!editting}
                {...props}
              />
            )}
            name="conversionRate"
            defaultValue={movementInfo.ConversionRates?.IDConversionRate ? movementInfo.ConversionRates.IDConversionRate : ""}
          />
        )}
        <ErrorMessage
          errors={errors}
          name="conversionRate"
          render={({message}) => (
            <Text style={{paddingLeft: 10, color: colors.warning}}>
              {message}
            </Text>
          )}
        />
      </View>

      {watchedConversion === 8 ? (
        <View style={styles.formFieldWrapper}>
          <Text style={styles.labelText}>Conversión propia</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="0.00"
                style={styles.input}
                onBlur={onBlur}
                keyboardType="decimal-pad"
                onChangeText={onChange}
                value={value}
                disabled={!editting}
                errorMessage={errors.conversionByUser?.message}
              />
            )}
            name="conversionByUser"
            defaultValue={movementInfo.conversionByUser}
          />
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          title={!editting ? "Editar" : "Cancelar"}
          buttonStyle={[styles.button,{backgroundColor: !editting ? colors.primary : colors.warning}]}
          type="solid"
          raised
          onPress={toggleEditting}
        />
        <Button
          title="Actualizar"
          buttonStyle={[styles.button, {backgroundColor: colors.primary}]}
          type="solid"
          raised
          disabled={!editting}
          onPress={handleSubmit(handleUpdatePress)}
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

export default UpdateMovementForm;
