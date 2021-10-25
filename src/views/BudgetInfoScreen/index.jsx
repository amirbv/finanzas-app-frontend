import { useIsFocused } from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import UpdateBudgetForm from '../../components/UpdateBudgetForm';
import {useAuthContext} from '../../context/authContext';
import Notifications from '../../services/Notifications';
import { deleteBudget, getSingleBudget } from '../../services/requests';
import { colors } from '../../styles/base';

const BudgetInfoScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const {budgetId} = route.params;
  const {user} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [budgetInfo, setBudgetInfo] = useState(null);

  const loadBudgetInfo = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getSingleBudget(budgetId, user.accessToken);
      console.log(data);

      setBudgetInfo(data);
      navigation.setOptions({title: `Datos de: ${data.title}`});
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
  }, [user, budgetId]);

  useEffect(() => {
    if(isFocused)loadBudgetInfo();
  }, [isFocused, loadBudgetInfo]);

  const updateBudgetInfo = () => {
    loadBudgetInfo();
  }

  const handleDeletePress = async () => {
    try {
      await deleteBudget(budgetId, user.accessToken);
      showMessage({
        message: 'Eliminado correctamente',
        description: 'El monedero se eliminó correctamente',
        type: 'success',
      });
      Notifications.clearSingleNotification(budgetId);
      navigation.navigate('InnerBudget');
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: 'El monedero no pudo ser eliminado correctamente',
        type: 'error',
      });
    }
  }

  const showConfirmDelete = () => {
    return Alert.alert(
      "¿Estas seguro de eliminar?",
      "No podrás deshacer los cambios",
      [
        // The "Yes" button
        {
          text: "Eliminar",
          onPress: () => {
            handleDeletePress();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Cancelar",
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.sectionCenter}>
            <Text h4 style={{textAlign: 'center'}}>
              Cargando datos
            </Text>
          </View>
        ) : null}
        {budgetInfo ? (
          <>
            <View>
              <View style={styles.imageContainer}>
                <Avatar
                  rounded
                  size="xlarge"
                  icon={{name: 'file-invoice-dollar', type: 'font-awesome-5'}}
                  overlayContainerStyle={{
                    backgroundColor: colors.primary,
                    marginVertical: 5,
                  }}
                />
              </View>
              <Text h1>{budgetInfo.title}</Text>
              <Text h4>Balance: {budgetInfo.balance || 0}</Text>
              <Text>{budgetInfo.description}</Text>
              <Text>Fecha de notificación: {new Date(budgetInfo.notificationDate).toLocaleDateString()}</Text>
              <Button
                title="Ver detalles"
                type="clear"
                titleStyle={{ color: colors.primary }}
                containerStyle={{ marginVertical: 10 }}
                onPress={() => navigation.navigate("BudgetDetails", { budgetInfo })}
              />
              <Button
                title="Añadir al monedero"
                type="clear"
                titleStyle={{ color: colors.primary, fontSize: 18 }}
                containerStyle={{ marginVertical: 15 }}
                onPress={() => navigation.navigate("BudgetToWallet", { budgetInfo })}
              />
              <UpdateBudgetForm budgetInfo={budgetInfo} onUpdate={updateBudgetInfo} />
              <Button
                title="Eliminar"
                type="clear"
                titleStyle={{ color: colors.warning }}
                containerStyle={{ marginVertical: 10 }}
                onPress={showConfirmDelete}
              />
            </View>
          </>
        ) : !loading ? (
          <View style={styles.sectionCenter}>
            <Text h4 style={{textAlign: 'center'}}>
              Los datos no fueron cargados
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 18,
  },
  sectionCenter: {
    justifyContent: 'center',
    flex: 1,
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1976b2',
    marginVertical: 12,
    paddingVertical: 6,
  },
});

export default BudgetInfoScreen;
