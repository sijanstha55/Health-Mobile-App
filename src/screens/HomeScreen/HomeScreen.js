
import { firestore } from 'firebase';
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View ,Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { App } from '../../../'

import calorie from './components/calorie';
import initialData from './components/initialData';
import fitness from './components/fitness';
import profile from './components/profile';
import Goals from './components/goals';
import CalendarPicker from 'react-native-calendar-picker';



class HomeScreen extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      email:"",
      name:"",
      weight:0,
      percentage:60,
      calorie:0,
      calorieBurned:0,
      net:0,
      calorieIN:0,
      BMI:0,
      date: new Date().getDate().toLocaleString(),
      
      
      
      

    };
   this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date){
    this.setState({
      date: date,
    });
  }
 


  componentDidMount() {
    var user = firebase.auth().currentUser
    var d = new Date();
    
    d.setHours(0,0,0,0);
    if(user)
     {
       let usid=user.uid;
       
      firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc =>{
        this.setState({BMI: doc.data().BMI})

      })
      firebase.firestore().collection('users').doc(usid).collection('dailyRecord').where("timestamp",">=",d).onSnapshot((querySnapshot) => {
        var turmarkers=0;
        querySnapshot.forEach((doc) => {
        
        
        
        turmarkers = turmarkers+  doc.data().calorieIN
    });
    this.setState({
      calorie:turmarkers,
      
  });
})
      
     
   
    }
    
     
  }
  
  render(){
    
    

    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
   
    
    return(
      
      
      <View style={styles.container}>
        
    
<View style={styles.containeron}>
  <View style={{flex: 0.1,backgroundColor: '#3d5875',height: 100, justifyContent: 'center', alignItems: 'center'}}>
  <CalendarPicker
          onDateChange={this.onDateChange}
        />
 
        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
  </View>
  <Text>{this.state.calorieBurned}</Text>
<Text>{this.state.calorie}</Text>
<Text>{this.state.net}</Text>
  </View>
        <View style={styles.containerone}>
        <View style={{flex: 0.5,backgroundColor: '#3d5875',height: 100, justifyContent: 'center', alignItems: 'center'}}><Text>Goals</Text></View>
          <View style={styles.box1}>
            <View style={styles.one}>
          <Text style={styles.subtitle}>Daily Calorie Goal: </Text></View>
          <View style={styles.two}>
          <AnimatedCircularProgress
            size={70}
            width={5}
            fill={this.state.calorie}
            tintColor="#00e0ff"
             backgroundColor="#3d5875">
            {
           (fill) => (
            <Text style={styles.name}> {this.state.calorie} %</Text>
              )
              }</AnimatedCircularProgress>
            
            </View>
          </View>
          <View style={styles.box1}>
           
            <View style={styles.one}>
          <Text style={styles.subtitle}>Daily Excercise Goal </Text></View>
          <View style={styles.two}>
          <AnimatedCircularProgress
            size={70}
            width={5}
            fill={this.state.calorie}
            tintColor="#00e0ff"
             backgroundColor="#3d5875">
            {
           (fill) => (
            <Text style={styles.name}> {this.state.calorie} %</Text>
              )
              }</AnimatedCircularProgress>
            
            </View>
          </View>
        
         

        </View>
        
        
       
              
        </View>
       
   
    );
   
    
  }


}



const Tab = createBottomTabNavigator();

class MyTabs extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      email:"",
      name:"",
      weight:0,
      percentage:60,
      calorie:0,
      calorieIN:0,
      weight:0
      
      

    };
    
   
  }
 
  
  


  componentDidMount() {
    var user = firebase.auth().currentUser
    var d = new Date();
    
    d.setHours(0,0,0,0);
    if(user)
     {
       let usid=user.uid;
       
      firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc =>{
        this.setState({
          weight: doc.weight
          
        })

      })
      firebase.firestore().collection('users').doc(usid).collection('dailyRecord').where("timestamp",">=",d).onSnapshot((querySnapshot) => {
        var turmarkers=0;
        querySnapshot.forEach((doc) => {
        
        
        
        turmarkers = turmarkers+  doc.data().calorieIN
    });
    this.setState({
      calorie:turmarkers
  });
})
      
     
   
    }
    
     
  }
  render(){
    
  return (
    
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="calorie"
        component={calorie}
        options={{
          tabBarLabel: 'Food',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="fitness"
        component={fitness}
        options={{
          tabBarLabel: 'Excercise',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
     
    </Tab.Navigator> 
  );
}}
const Stack = createStackNavigator();

export default function Home({navigation}){

  const [data, setData] =useState(false)
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            
            setData(userData.data)
            setLoading(false)
          })
          .catch((error) => {
            
          });
      } else {
        
      }
    });
  }, []);
  
  if (loading) {	
    return (	
      <></>	
    )	
  
}
  return (
   
      
      <Stack.Navigator>
        {data ? (
          <Stack.Screen name="MyTabs" component={MyTabs} />
        ):(
          <>
          <Stack.Screen name="initialData" component={initialData} />
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="Goals" component={Goals} />
          </>
        )}
      
      </Stack.Navigator>
      
  );
}