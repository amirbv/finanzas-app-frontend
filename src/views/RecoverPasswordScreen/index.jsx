import React from "react";
import { ScrollView, View, Alert } from "react-native";
import { Button, Input, Text, Image } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { recoverPasswordRequest } from "../../services/requests";

import styles from "../../styles/styles";
import { showMessage } from "react-native-flash-message";

const schema = yup.object().shape({
  email: yup.string().email('El correo no tiene formato valido').required('Debes introducir un correo')
});

const RecoverPasswordScreen = ({ navigation }) => {
  
  const { handleSubmit, control, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onRecoverPress = async (data) => {
    try {
      await recoverPasswordRequest(data);
      showMessage({
        message: "Contraseña recuperada",
        description: "Correo enviado. Recuerda revisar la bandeja de no deseados o spam",
        type: "success",
      });
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: "Error",
        description: 'Hubo un error intente nuevamente',
        type: "error",
      });
    }
  }


  return (
    <ScrollView style={{flex: 1}}>
      <View style={[styles.container, {marginTop: 40}]}>
        <Image
          style={styles.logo}
          source={require('../../assets/finanzy_logo.png')}
        />
        <Text h3 style={styles.section}>Recuperar contraseña</Text>
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
                errorMessage={errors.email?.message}
              />
            )}
            name="email"
            defaultValue=""
          />
          

        </View>
        
        <View>
          <Text>Un mensaje será enviado a su correo para recuperar la contraseña, se recomienda revisar la bandeja de no deseados o spam.</Text>
        </View>

        <View style={styles.button}>
          <Button
            title="Recuperar"
            buttonStyle={{backgroundColor: '#103442'}}
            type="solid"
            raised
            onPress={handleSubmit(onRecoverPress)}
          />

        </View>

        <View>
          <Button
            title="Volver"
            type="clear"
            onPress={() => navigation.goBack()}
          />
        </View>

      </View>
      
    </ScrollView>
  );
};

export default RecoverPasswordScreen;
