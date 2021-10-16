import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import CreateBudgetForm from '../../components/CreateBudgetForm';

const CreateBudgetScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text h3>Crear presupuesto</Text>
        <CreateBudgetForm />
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

export default CreateBudgetScreen;
