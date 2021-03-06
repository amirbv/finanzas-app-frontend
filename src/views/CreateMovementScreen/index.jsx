import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import CreateMovementForm from '../../components/CreateMovementForm';

const CreateMovementScreen = ({ route, navigation }) => {
  const { walletInfo } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `Crear movimiento en: ${walletInfo.name}` });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text h3>Crear movimiento</Text>
        <CreateMovementForm walletInfo={walletInfo} />
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

export default CreateMovementScreen;

