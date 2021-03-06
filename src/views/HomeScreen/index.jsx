import React, {useState, useCallback, useEffect} from "react";
import { useIsFocused  } from "@react-navigation/native";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Card, Text, FAB } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { useAuthContext } from '../../context/authContext';
import { getUserWallets } from "../../services/requests";
import { colors } from "../../styles/base";

const HomeScreen = ({ navigation }) => {
  const { user } = useAuthContext();
  const [loadingWallets, setLoadingWallets] = useState(false);
  const [wallets, setWallets] = useState([]);
  const isFocused = useIsFocused();

  const loadWallets = useCallback(async () => {
    setLoadingWallets(true);
    try {
      const { data } = await getUserWallets(user.accessToken);
      // console.log(data);
      
      setWallets(data);
      setLoadingWallets(false);
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: "Error",
        description: 'La información no pudo ser cargada intente nuevamente',
        type: "error",
      });
      setLoadingWallets(false);
    }
  }, [user.accessToken]);

  useEffect(() => {
    if (isFocused) loadWallets();
  }, [isFocused, loadWallets]);

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Wallet', { walletId: item.IDWallets })}
    >
      <Card>
        <Card.Title h3>{item.name}</Card.Title>
        <Text>Descripción: {item.description}</Text>
        { item.amount ? <Text style={{fontSize: 18}}>Saldo: {item.amount} {item.CurrencyType.symbol}</Text>: null}
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {
          loadingWallets && wallets.length === 0 ? (
            <View styles={styles.centerContainer}>
              <Text h4 style={styles.centerText}>Cargando monederos</Text>
            </View>
          )
            : !loadingWallets && wallets.length === 0 ? (
              <View styles={styles.centerContainer}>
                <Text h4 style={styles.centerText}>No tiene monederos</Text>
              </View>
            ) : null
        }
        <FlatList
          data={wallets}
          renderItem={RenderItem}
          keyExtractor={item => item.IDWallets}
        />
      </View>
      <FAB
        visible={true}
        placement="right"
        icon={{ name: 'add', color: 'white' }}
        color={colors.primary}
        size="large"
        onPress={() => navigation.navigate('CreateWallet')}
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
    textAlign: 'center'
  }
})

export default HomeScreen;
