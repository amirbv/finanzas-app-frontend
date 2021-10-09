import React, {useCallback, useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Text, Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import { useAuthContext } from '../../context/authContext';
import { deleteMovement, getSingleMovement } from '../../services/requests';
import { colors } from '../../styles/base';

const MovementInfoScreen = ({ route, navigation }) => {
  const { movementId, walletInfo } = route.params;
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [movementInfo, setMovementInfo] = useState(null);

  const loadMovementInfo = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getSingleMovement(movementId, user.accessToken);
      console.log(data);

      setMovementInfo(data);
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
  }, [user.accessToken, movementId]);

  useEffect(() => {
    loadMovementInfo();
  }, [loadMovementInfo]);
  
  const handleDeletePress = async () => {
    try {
      await deleteMovement(movementId, user.accessToken);
      showMessage({
        message: 'Eliminado correctamente',
        description: 'El movimiento se eliminó correctamente',
        type: 'success',
      });
      navigation.navigate("WalletMovements", { walletInfo });
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: 'El movimiento no pudo ser eliminado correctamente',
        type: 'error',
      });
    }
  }

  const updateMovementInfo = () => {
    loadMovementInfo();
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
        {movementInfo ? (
          <>
            <View>
              <View style={styles.imageContainer}>
                <Avatar
                  rounded
                  size="xlarge"
                  icon={{name: 'compare-vertical', type: 'material-community'}}
                  overlayContainerStyle={{
                    backgroundColor: colors.primary,
                    marginVertical: 5,
                  }}
                />
              </View>
              <Text h1>{movementInfo.title}</Text>
              <Text h4>Monto: {movementInfo.amount} {walletInfo.CurrencyType.symbol}</Text>
              {movementInfo.conversionAmount && <Text h4>Conversion: {movementInfo.conversionAmount} {movementInfo.ConversionRates.name}</Text>}
              <Text>{movementInfo.description}</Text>
              <Text>Tipo de movimiento: {movementInfo.Options.name}</Text>
              <Text>Clase de movimiento: {movementInfo.MovementTypes.name}</Text>
              
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
  )
}

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

export default MovementInfoScreen;
