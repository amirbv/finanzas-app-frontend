import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import CreateDetailForm from '../../components/CreateDetailForm';

const CreateDetailScreen = ({ route, navigation }) => {
  const { budgetInfo } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `Crear detalle en: ${budgetInfo.title}` });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text h3>Crear detalle</Text>
        <CreateDetailForm budgetInfo={budgetInfo} />
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

export default CreateDetailScreen;

