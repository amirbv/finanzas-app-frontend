import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import UpdateBudgetForm from '../../components/UpdateBudgetForm';
import {useAuthContext} from '../../context/authContext';
import { deleteBudget, getSingleBudget } from '../../services/requests';
import { colors } from '../../styles/base';

const BudgetInfoScreen = ({ route, navigation }) => {
  //this components needs change and adaptation for budgets
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
      navigation.setOptions({title: `Detalles de: ${data.title}`});
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
    loadBudgetInfo();
  }, [loadBudgetInfo]);

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
              {/* <Button
                title="Ver movimientos"
                type="clear"
                titleStyle={{ color: colors.primary }}
                containerStyle={{ marginVertical: 10 }}
                onPress={() => navigation.navigate("WalletMovements", { budgetInfo })}
              /> */}
              <UpdateBudgetForm budgetInfo={budgetInfo} onUpdate={updateBudgetInfo} />
              <Button
                title="Eliminar"
                type="clear"
                titleStyle={{ color: colors.warning }}
                containerStyle={{ marginVertical: 10 }}
                onPress={handleDeletePress}
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
