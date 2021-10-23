import React, { useState, useEffect, useCallback } from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import {ErrorMessage} from '@hookform/error-message';
import RNPickerSelect from 'react-native-picker-select';
import {addBudgetToWallet, getWalletsToShow} from '../services/requests';

import {useAuthContext} from '../context/authContext';
import {padding, colors} from '../styles/base';

const schema = yup.object().shape({
  wallet: yup.string().required('El monedero es requerido'),
});

const AddBudgetToWalletForm = ({budgetInfo}) => {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState([]);

  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loadWallets = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getWalletsToShow(user.accessToken);
      // console.log(data);

      setWallets(data);
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
    loadWallets();
  }, [loadWallets]);


  const handleAddPress = async ({ wallet }) => {
    try {
      const response = await addBudgetToWallet(wallet, budgetInfo.IDBudget, user.accessToken);
      console.log(response);
      showMessage({
        message: "Presupuesto añadido",
        description: "Tu presupuesto se añadió correctamente",
        type: "success",
      });
      reset();
      navigation.popToTop();
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: 'Tu presupuesto no pudo ser añadido, intenta nuevamente',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Monedero</Text>
        {loading ? (
          <Text>Cargando monederos...</Text>
        ) : (
          <Controller
            control={control}
            render={({field: {onChange, value, ...props}}) => (
              <RNPickerSelect
                onValueChange={value => {
                  onChange(value);
                }}
                items={wallets.map(wallets => {
                  return {
                    label: wallets.name,
                    value: wallets.IDWallets,
                    inputLabel: wallets.name,
                    key: wallets.IDWallets,
                  };
                })}
                value={value}
                itemKey={value}
                style={{...styles.input, inputAndroid: {color: 'black'}}}
                placeholder={{label: 'Selecciona el monedero'}}
                {...props}
              />
            )}
            name="wallet"
            defaultValue=""
          />
        )}

        <ErrorMessage
          errors={errors}
          name="wallet"
          render={({message}) => (
            <Text style={{paddingLeft: 10, color: colors.warning}}>
              {message}
            </Text>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Añadir"
          buttonStyle={[styles.button, {backgroundColor: colors.primary}]}
          type="solid"
          raised
          onPress={handleSubmit(handleAddPress)}
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

export default AddBudgetToWalletForm;
