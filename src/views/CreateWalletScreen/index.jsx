import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const CreateWalletScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h1 style={styles.centerText}>Crear monedero</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0
  },
  centerText: {
    textAlign: 'center'
  }
})

export default CreateWalletScreen;

