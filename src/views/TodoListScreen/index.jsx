import React, {useState} from 'react';
import {ScrollView, SafeAreaView, View, FlatList, Button, TextInput, Text, StyleSheet} from 'react-native';

const TodoListScreen = () => {
  const [todoListData, setTodoListData] = useState([]);
  const [todoText, setTodoText] = useState('');

  const handleInputChange = text => {
    setTodoText(text);
  };

  const handleButtonPress = () => {
    if (todoText.trim().length > 0) {
      setTodoListData((prevList) => prevList.concat({text: todoText}));
      setTodoText("");
    }
  };

  const handleRenderListItem = ({ item }) => {
    return <Text style={styles.text}>{item.text}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Write your to do"
            placeholderTextColor="#8a8a8a"
            value={todoText}
            onChangeText={handleInputChange}
            style={styles.textInput}
          />

          <Button
            color={styles.button.backgroundColor}
            style={styles.button}
            title="Add"
            onPress={handleButtonPress}
          />
        </View>
        <View>
          <FlatList
            data={todoListData}
            renderItem={handleRenderListItem}
            keyExtractor={(item, index) => item.text + index}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFBFB',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    color: '#212121',
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    fontSize: 20,
    backgroundColor: '#212121',
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    marginVertical: 10
  }
});

export default TodoListScreen;
