import React, {useState, useCallback, useEffect} from "react";
import { useIsFocused  } from "@react-navigation/native";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Card, Text, FAB } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { useAuthContext } from '../../context/authContext';
import { getUserBudgets } from "../../services/requests";
import { colors } from "../../styles/base";
import { parseLocalDate } from "../../services/date";

const BudgetScreen = ({ navigation }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const isFocused = useIsFocused();

  const loadBudgets = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getUserBudgets(user.accessToken);
      // console.log(data);
      
      setBudgets(data);
      setLoading(false);
    } catch (error) {
      // console.log(error.response);
      showMessage({
        message: "Error",
        description: 'La información no pudo ser cargada intente nuevamente',
        type: "error",
      });
      setLoading(false);
    }
  }, [user.accessToken]);

  useEffect(() => {
    if(isFocused) loadBudgets();
  }, [isFocused, loadBudgets]);

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('BudgetInfo', { budgetId: item.IDBudget })}
    >
      <Card>
        <Card.Title h4>{item.title}</Card.Title>
        <Text>Descripción: {item.description}</Text>
        <Text style={{fontSize: 18}}>Balance: {item.balance}</Text>
        <Text>Fecha de notificación: {parseLocalDate(item.notificationDate)}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {
          loading && budgets.length === 0 ? (
            <View styles={styles.centerContainer}>
              <Text h4 style={styles.centerText}>Cargando presupuestos</Text>
            </View>
          )
            : !loading && budgets.length === 0 ? (
              <View styles={styles.centerContainer}>
                <Text h4 style={styles.centerText}>No tiene presupuestos</Text>
              </View>
            ) : null
        }
        <FlatList
          data={budgets}
          renderItem={RenderItem}
          keyExtractor={item => item.IDBudget}
        />
      </View>
      <FAB
        visible={true}
        placement="right"
        title="Presupuesto"
        iconRight
        icon={{ name: 'add', color: 'white' }}
        color={colors.primary}
        size="large"
        onPress={() => navigation.navigate('CreateBudget')}
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

export default BudgetScreen;
