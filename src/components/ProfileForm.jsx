import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { showMessage, hideMessage } from "react-native-flash-message";
import {getStates, updateUser} from '../services/requests';
import { useAuthContext } from '../context/authContext';

import {padding, colors} from '../styles/base';

const schema = yup.object().shape({
  name: yup.string().required('El nombre es necesario'),
  state: yup.string().required('El estado es necesario'),
  city: yup.string().required('La ciudad es necesaria'),
});

const ProfileForm = ({ userData, onUpdate }) => {
  const { user } = useAuthContext();
  const [loadingStates, setLoadingStates] = useState(false);
  const [states, setStates] = useState([]);
  const [editting, setEditting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const {data} = await getStates();
        setStates(data);
        setLoadingStates(false);
      } catch (error) {
        console.log({error});
        showMessage({
          message: "Error",
          description: 'Los estados no fueron cargados correctamente por favor intente nuevamente',
          type: "error",
        });
        setLoadingStates(false);
      }
    };
    loadStates();
  }, []);

  const toggleEditting = () => setEditting(prevEditting => !prevEditting);

  const handleUpdatePress = async data => {
    try {
      console.log(data)
      const response = await updateUser(data, user.id, user.accessToken);
      console.log(response);
      showMessage({
        message: "Perfil actualizado",
        description: "Tu perfil fue actualizado correctamente",
        type: "success",
      });
      onUpdate();
      toggleEditting();
    } catch (error) {
      showMessage({
        message: "Error",
        description: "Tu perfil no pudo ser actualizado intenta nuevamente",
        type: "error",
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text h3>
        Edita tu perfil
      </Text>
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
              disabled={!editting}
            />
          )}
          name="name"
          defaultValue={userData.fullName}
        />
      </View>
      <View style={styles.formFieldWrapper}>
        <Text style={styles.labelText}>Estado</Text>
        {loadingStates ? (
          <Text>Cargando...</Text>
        ) : (
          <Controller
            control={control}
            render={({field: {onChange, value, ...props}}) => (
              <RNPickerSelect
                onValueChange={value => {
                  onChange(value);
                }}
                items={states.map(state => {
                  return {
                    label: state.name,
                    value: state.IDStates,
                    inputLabel: state.name,
                    key: state.IDStates,
                  };
                })}
                value={value}
                itemKey={value}
                style={{...styles.input, inputAndroid: {color: 'black'}}}
                placeholder={{ label: 'Selecciona un estado' }}
                disabled={!editting}
                {...props}
              />
            )}
            name="state"
            defaultValue={userData.State.IDStates}
          />
        )}
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
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Ciudad"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.city?.message}
              disabled={!editting}
            />
          )}
          name="city"
          defaultValue={userData.city}
        />
      </View>
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
          buttonStyle={[styles.button,{backgroundColor: colors.primary}]}
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

export default ProfileForm;
