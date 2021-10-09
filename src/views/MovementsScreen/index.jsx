import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useCallback, useState } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Card, Text, FAB } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { useAuthContext } from '../../context/authContext';
import { getMovements } from '../../services/requests';
import { colors } from "../../styles/base";

const MovementsScreen = ({ route, navigation }) => {
  const { user } = useAuthContext();
  const { walletInfo } = route.params;
  const [loading, setLoading] = useState(false);
  const [movements, setMovements] = useState([]);
  const isFocused = useIsFocused();

  const loadMovements = useCallback(async () => {
    setLoading(true);
    try {
      console.log(user.accessToken);
      const { data } = await getMovements(user.accessToken, walletInfo.IDWallets);
      console.log(data);
      
      setMovements(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: "Error",
        description: 'La información no pudo ser cargada intente nuevamente',
        type: "error",
      });
      setLoading(false);
    }
  }, [user.accessToken, walletInfo.IDWallets]);

  useEffect(() => {
    navigation.setOptions({ title: `Movimientos de: ${walletInfo.name}` });
  }, []);

  useEffect(() => {
    if (isFocused) loadMovements();
  }, [isFocused,loadMovements]);

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Movement', { movementId: item.IDMovements, walletInfo })}
    >
      <Card>
        <Card.Title h4>{item.title}</Card.Title>
        <Text>{item.description}</Text>
        <Text>Monto: {item.amount} {walletInfo.CurrencyType.symbol}</Text>
      </Card>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {
          loading && movements.length === 0 ? (
            <View styles={styles.centerContainer}>
              <Text h4 style={styles.centerText}>Cargando movimientos</Text>
            </View>
          )
            : !loading && movements.length === 0 ? (
              <View styles={styles.centerContainer}>
                <Text h4 style={styles.centerText}>No tiene movimientos</Text>
              </View>
            ) : null
        }
        <FlatList
          data={movements}
          renderItem={RenderItem}
          keyExtractor={item => item.IDMovements}
        />
      </View>
      <FAB
        visible={true}
        placement="right"
        icon={{ name: 'add', color: 'white' }}
        color={colors.primary}
        size="large"
        onPress={() => navigation.navigate('CreateMovement', { walletInfo })}
      />
    </SafeAreaView>
  )
}

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
    textAlign: 'center'
  }
})

export default MovementsScreen;
