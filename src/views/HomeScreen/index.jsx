import React from "react";
import { useAuthContext } from '../../context/authContext';
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "../../styles/styles";

const HomeScreen = ({ navigation }) => {
  const { logoutUser } = useAuthContext();
  
  return (
    <View style={styles.container}>
      <Text style={styles.section}>Home Screen</Text>

      <Button
        title="Todo List"
        type="clear"
        onPress={() => navigation.navigate("TodoList")}
      />

      <Button
        title="Logout!"
        buttonStyle={styles.button}
        onPress={() => logoutUser()}
      />

    </View>
  );
};

export default HomeScreen;
