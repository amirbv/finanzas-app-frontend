import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage} from 'react-native-flash-message';
import {createUserWallet, getWalletDependencies} from '../services/requests';

import {useAuthContext} from '../context/authContext';
import {padding, colors} from '../styles/base';

const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  description: yup.string().notRequired(),
  bank: yup.string().required('El banco es requerido'),
  currency: yup.string().required('La divisa es requerida'),
  amount: yup
    .string()
    .matches(/^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/, 'Saldo no valido')
    .required('El saldo inicial es requerido'),
});

const CreateWalletForm = () => {
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
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  const [banks, setBanks] = useState([]);

  const loadWalletDependencies = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getWalletDependencies(user.accessToken);
      // console.log(data);

      setCurrencies(data.currencies);
      setBanks(data.banks);
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
    loadWalletDependencies();
  }, [loadWalletDependencies]);

  const handleCreatePress = async data => {
    try {
      const response = await createUserWallet(data, user.accessToken);
      console.log(response);
      showMessage({
        message: "Monedero creado",
        description: "Tu monedero se creó correctamente",
        type: "success",
      });
      reset();
      navigation.replace('Wallet', { walletId: response.data.IDWallets });
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: 'Tu monedero no pudo ser creado, intenta nuevamente',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Nombre</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
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
        <Text style={styles.labelText}>Banco</Text>
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
                items={banks.map(bank => {
                  return {
                    label: bank.name,
                    value: bank.IDBank,
                    inputLabel: bank.name,
                    key: bank.IDBank,
                  };
                })}
                value={value}
                itemKey={value}
                style={{...styles.input, inputAndroid: {color: 'black'}}}
                placeholder={{label: 'Selecciona un banco'}}
                {...props}
              />
            )}
            name="bank"
            defaultValue=""
          />
        )}
        <ErrorMessage
          errors={errors}
          name="bank"
          render={({message}) => <Text style={{paddingLeft: 10, color: colors.warning}}>{message}</Text>}
        />
      </View>

      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Divisa</Text>
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
                items={currencies.map(currency => {
                  return {
                    label: `${currency.name} (${currency.symbol})`,
                    value: currency.IDCurrencyType,
                    inputLabel: `${currency.name} (${currency.symbol})`,
                    key: currency.IDCurrencyType,
                  };
                })}
                value={value}
                itemKey={value}
                style={{...styles.input, inputAndroid: {color: 'black'}}}
                placeholder={{label: 'Selecciona una divisa'}}
                {...props}
              />
            )}
            name="currency"
            defaultValue=""
          />
        )}
        <ErrorMessage
          errors={errors}
          name="currency"
          render={({message}) => <Text style={{paddingLeft: 10, color: colors.warning}}>{message}</Text>}
        />
      </View>

      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Saldo inicial</Text>
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

export default CreateWalletForm;
