import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import AddBudgetToWalletForm from '../../components/AddBudgetToWalletForm';

const BudgetToWalletScreen = ({ route, navigation }) => {
  const { budgetInfo } = route.params;
  console.log(budgetInfo);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text h3>Añadir {budgetInfo.title} al monedero</Text>
        <AddBudgetToWalletForm budgetInfo={budgetInfo} />
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

export default BudgetToWalletScreen;

