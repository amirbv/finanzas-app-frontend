import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import {Card, Text, FAB, Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';
import {useAuthContext} from '../../context/authContext';
import {colors} from '../../styles/base';
import {getBudgetDetails, removeDetail} from '../../services/requests';

const BudgetDetailsScreen = ({route, navigation}) => {
  const {user} = useAuthContext();
  const {budgetInfo} = route.params;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const isFocused = useIsFocused();

  const loadDetails = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getBudgetDetails(
        budgetInfo.IDBudget,
        user.accessToken,
      );
      console.log(data);

      setDetails(data);
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
  }, [user.accessToken, budgetInfo.IDBudget]);

  useEffect(() => {
    if (isFocused) loadDetails();
  }, [isFocused, loadDetails]);

  useEffect(() => {
    navigation.setOptions({title: `Detalles de: ${budgetInfo.title}`});
  }, []);

  const handleDeletePress = async id => {
    try {
      await removeDetail(id, user.accessToken);
      showMessage({
        message: "Detalle eliminado",
        type: "info",
      });
      loadDetails();
    } catch (error) {
      console.log(error);
      showMessage({
        message: "Error",
        description: 'No se pudo eliminar su detalle intente nuevamente',
        type: "error",
      });
    }
  };

  const showConfirmDialog = (id) => {
    return Alert.alert(
      "¿Estas seguro?",
      "¿Estas seguro de eliminar?",
      [
        // The "Yes" button
        {
          text: "Eliminar",
          onPress: () => {
            handleDeletePress(id);
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

  const RenderItem = ({item}) => (
    <Card>
      <Card.Title h4>{item.title}</Card.Title>
      <Text>Descripción: {item.description}</Text>
      <Text style={{fontSize: 18}}>Monto: {item.amount}</Text>
      <Button
        title="Eliminar detalle"
        type="clear"
        titleStyle={{color: colors.warning}}
        containerStyle={{marginVertical: 10}}
        onPress={() => showConfirmDialog(item.IDBudgetDetails)}
      />
    </Card>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {loading && details.length === 0 ? (
          <View styles={styles.centerContainer}>
            <Text h4 style={styles.centerText}>
              Cargando detalles
            </Text>
          </View>
        ) : !loading && details.length === 0 ? (
          <View styles={styles.centerContainer}>
            <Text h4 style={styles.centerText}>
              No tiene detalles
            </Text>
          </View>
        ) : null}
        <FlatList
          data={details}
          renderItem={RenderItem}
          keyExtractor={item => item.IDBudgetDetails}
        />
      </View>
      <FAB
        visible={true}
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color={colors.primary}
        size="large"
        onPress={() => navigation.navigate('CreateDetail', {budgetInfo})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default BudgetDetailsScreen;
