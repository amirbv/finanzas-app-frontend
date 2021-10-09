import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import UpdateWalletForm from '../../components/UpdateWalletForm';
import {useAuthContext} from '../../context/authContext';
import { getWalletInfo, deleteWallet } from '../../services/requests';
import { colors } from '../../styles/base';

const WalletScreen = ({route, navigation}) => {
  const {walletId} = route.params;
  const {user} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);

  const loadWalletInfo = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await getWalletInfo(user.accessToken, walletId);
      console.log(data);

      setWalletInfo(data);
      navigation.setOptions({title: `Detalles de: ${data.name}`});
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
  }, [user, walletId]);

  useEffect(() => {
    loadWalletInfo();
  }, [loadWalletInfo]);

  const handleDeletePress = async () => {
    try {
      await deleteWallet(walletId, user.accessToken);
      showMessage({
        message: 'Eliminado correctamente',
        description: 'El monedero se eliminó correctamente',
        type: 'success',
      });
      navigation.navigate('InnerHome');
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
        {walletInfo ? (
          <>
            <View>
              <View style={styles.imageContainer}>
                <Avatar
                  rounded
                  size="xlarge"
                  icon={{name: 'wallet', type: 'fontisto'}}
                  overlayContainerStyle={{
                    backgroundColor: colors.primary,
                    marginVertical: 5,
                  }}
                />
              </View>
              <Text h1>{walletInfo.name}</Text>
              <Text h4>Saldo: {walletInfo.amount} {walletInfo.CurrencyType.symbol}</Text>
              <Text>Banco: {walletInfo.Banks.name}</Text>
              <Text>{walletInfo.description}</Text>
              <Button
                title="Ver movimientos"
                type="clear"
                titleStyle={{ color: colors.primary }}
                containerStyle={{ marginVertical: 10 }}
                onPress={() => navigation.navigate("WalletMovements", { walletInfo })}
              />
              <UpdateWalletForm walletInfo={walletInfo} />
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

export default WalletScreen;
