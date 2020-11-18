import 'react-native-gesture-handler';
import React, { useEffect, useState, Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Image, Text,RefreshControl, TextInput, TouchableOpacity, View ,Dimensions, AsyncStorage} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, MyTabs } from './src/screens'
import {decode, encode} from 'base-64'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { firebase } from './src/firebase/config'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [fullName, setFullname] = useState('')
  const [signedIn,setSignedIn]= useState()
 
  

  async function onSignOut(){
    await firebase.auth().signOut();
   
    setUser(null)
    setSignedIn(false)
    
    
   
    
    
  }
  
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
            setFullname(userData.fullName)
            setSignedIn(true)
            
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  
	if (loading) {	
    return (	
      <></>	
    )	
  
}
  return (
   
    <NavigationContainer>
      
      <Stack.Navigator>
        { user ? (
          
            
          <Stack.Screen  name="Home"
          component={HomeScreen}
          options={{
            title: 'Hello, '+fullName,
            headerRight : () => (
              <TouchableOpacity
             
              onPress={() => onSignOut()}>
              <FontAwesome name="sign-out" size={24} color="black" />
          </TouchableOpacity>
            ),
            headerShown: true,
            headerStyle: {
              backgroundColor: '#fff',
            },
            
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
            
        </Stack.Screen>
        
        
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
      
    </NavigationContainer>
   
  );
}
