import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import { showMessage, hideMessage } from "react-native-flash-message";
import PasswordForm from '../../components/PasswordForm';
import ProfileForm from '../../components/ProfileForm';
import { useAuthContext } from '../../context/authContext';
import { getUserData } from '../../services/requests';
import { colors } from '../../styles/base';

const ProfileScreen = ({ navigation }) => {
  const { user, logoutUser } = useAuthContext();
  const [loadingUser, setLoadingUser] = useState(false);
  const [userData, setUserData] = useState(null);

  const loadUser = useCallback(async () => {
    setLoadingUser(true);
    try {
      const { data } = await getUserData(user.id, user.accessToken);
      console.log(data);
      
      setUserData(data);
      setLoadingUser(false);
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: "Error",
        description: 'La información no pudo ser cargada intente nuevamente',
        type: "error",
      });
      setLoadingUser(false);
    }
  },[user]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const updateUser = () => {
    loadUser();
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Avatar
            rounded
            size="xlarge"
            icon={{ name: 'user', type: 'font-awesome' }}
            overlayContainerStyle={{backgroundColor: colors.primary, marginVertical: 5}}
          />
        </View>
        {loadingUser ? (
          <View style={styles.sectionCenter}>
            <Text h4 style={{textAlign: 'center'}}>Cargando datos</Text>
          </View>
        ) : null}
        {userData ? (
          <>
            <View>
              <Text h1>{userData.fullName}</Text>
              <Text h4>Estado: {userData.State.name}</Text>
              <Text h4>Ciudad: {userData.city}</Text>
            </View>
            <ProfileForm userData={userData} onUpdate={updateUser} />
            <PasswordForm />
            <Button
              title="Logout!"
              type="clear"
              titleStyle={{ color: colors.warning }}
              containerStyle={{ marginVertical: 10 }}
              onPress={() => logoutUser()}
            />
          </>
        )
          : !loadingUser ? (
            <View style={styles.sectionCenter}>
              <Text h4 style={{textAlign: 'center'}}>Los datos no fueron cargados</Text>
            </View>
          ) : null}
        
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 18
  },
  sectionCenter: {
    justifyContent: 'center',
    flex: 1,
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1976b2',
    marginVertical: 12,
    paddingVertical: 6
  }
});

export default ProfileScreen;
