import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {showMessage} from 'react-native-flash-message';

import {useAuthContext} from '../context/authContext';
import {padding, colors} from '../styles/base';
import { updateBudget } from '../services/requests';

const schema = yup.object().shape({
  title: yup.string().required('El titulo es requerido'),
  description: yup.string().notRequired()
});

const UpdateBudgetForm = ({ budgetInfo, onUpdate }) => {
  const { user } = useAuthContext();
  const [editting, setEditting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleEditting = () => setEditting(prevEditting => !prevEditting);


  const handleUpdatePress = async data => {
    try {
      console.log(data)
      const response = await updateBudget(
        data,
        budgetInfo.IDBudget,
        user.accessToken
      );
      showMessage({
        message: 'Presupuesto actualizado',
        description: 'Tu presupuesto se actualizó correctamente',
        type: 'success',
      });
      onUpdate();
      toggleEditting();
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description:
          'Tu presupuesto no pudo ser actualizado, intenta nuevamente',
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
              disabled={!editting}
              errorMessage={errors.title?.message}
            />
          )}
          name="title"
          defaultValue={budgetInfo.title}
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
              disabled={!editting}
              errorMessage={errors.description?.message}
            />
          )}
          name="description"
          defaultValue={budgetInfo.description}
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

export default UpdateBudgetForm;
