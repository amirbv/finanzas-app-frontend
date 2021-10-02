import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import CreateWalletForm from '../../components/CreateWalletForm';

const CreateWalletScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text h3>Crear monedero</Text>
        <CreateWalletForm />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 18,
    marginTop: 10
  }
});

export default CreateWalletScreen;

