import React from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back!</Text>
        <Button
          title="To do list"
          style={styles.link}
          onPress={() => navigation.navigate("TodoList")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: '#63A4FF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 12
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginVertical: 20,
  },
  link: {
    marginVertical: 20,
  }
});
export default HomeScreen;