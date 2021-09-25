import React, {useCallback, useEffect, useState} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const WalletScreen = ({ route, navigation }) => {
  const { walletId } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `Detalles de: ${walletId}` });
  }, []);

  return (
    <View>
      <Text>{walletId}</Text>
    </View>
  )
}

export default WalletScreen;
