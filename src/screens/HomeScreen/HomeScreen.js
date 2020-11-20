/*
This section contains the screen part that user see after they login or after they entered the initial data after registration.
The navigation part also is the part of this file which is att the bottom.
*/

import { firestore } from 'firebase';
import React, { useState, Component,useEffect } from 'react';

import { Image, Text, TextInput, TouchableOpacity, View, Button ,Dimensions,ScrollView} from 'react-native'
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
import DateTimePicker from '@react-native-community/datetimepicker';
import calorie from './components/calorie';
import initialData from './components/initialData';
import fitness from './components/fitness';
import profile from './components/profile';
import Goals from './components/goals';
import Weight from './components/weight'
import CalendarPicker from 'react-native-calendar-picker';
import { BarChart} from "react-native-chart-kit";

//This is homescreen component which contains the information about how homescreen should look
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
      date: new Date(),
     show: false,
      percent: 0,
      dailyNetCalorieGoal:0,
      dialyCalorieGoal:0,
      dailyCalorieBurnedGoal:0,
      
      

    };
  
  }
 //Function That will view data based on date selected
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    
    this.setState({date:currentDate,show:false});
    var user = firebase.auth().currentUser
    var  d=currentDate;
      d.setHours(0,0,0);
       
       
       if(user)
        {
          let usid=user.uid;
          
         
         firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString()).onSnapshot(doc => {
           
           
           
           
           
      if(doc.exists){
           
     
       this.setState({
         calorie:doc.data().calorieIN,
         percent: (doc.data().calorieIN / 2000) * 100
         
          
     });
     if(doc.data().calorieBurned >= 0){
       this.setState({
         calorieBurned: doc.data().calorieBurned ,
       net: doc.data().calorieIN - doc.data().calorieBurned,
       percent: 0})
     }
     else {
       
         this.setState({
           calorieBurned:0 ,
         net: doc.data().calorieIN,
         percent: 0})
       
     }}
     else{
      this.setState({
        calorieBurned: 0,
      net: 0,calorie:0,percent: 0
    })
    
     }
   })
     
        
      
       }
    
   
  };
//this will show date picker form
   showDatepicker=()=>{
    this.setState({show:true});
  };

   

 
 


  componentDidMount() {
    var user = firebase.auth().currentUser
 var  d=this.state.date;
   d.setHours(0,0,0);
    
    let dailyCalorie = 0;
    if(user)
     {
       let usid=user.uid;
       //This will get goals values from database
      firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc =>{
        if(doc.data().dailyCalorieGoal>0){
          this.setState({dailyCalorieGoal: doc.data().dailyCalorieGoal});
        }
        if(doc.data().dailyCalorieBurnedGoal>0){
         this.setState({dailyCalorieBurnedGoal: doc.data().dailyCalorieBurnedGoal});
       }
       if(doc.data().dailyNetCalorieGoal>0){
         this.setState({dailyNetCalorieGoal: doc.data().dailyNetCalorieGoal});
       }
        dailyCalorie = doc.data().dailyCalorieGoal

      })

      //this will get data like total calorie in and burned for the day and also goals values
      firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString()).onSnapshot(doc => {
        
        
        
        
      if(doc.exists){  
        
        
  if(doc.data().calorieIN>=0 ){
    this.setState({
      calorie:doc.data().calorieIN,
     
      percent: (doc.data().calorieIN / dailyCalorie) * 100
      
       
  });}
  else {
    this.setState({
      calorie:0,
     
      percent: 0
      
       
  });
  }
  if(doc.data().calorieBurned >= 0){
    this.setState({
      calorieBurned: doc.data().calorieBurned ,
   })
  }
  else{
    this.setState({
      calorieBurned: 0 ,
   })
  }
}
  else {
    
      this.setState({
        calorieBurned:0 ,
      net: 0,
    calorieIN: 0})
    const ref=firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString());
    ref.set({
      calorieIN:0,
      calorieBurned:0,
      walk:0,
      run:0,
      
    });
    
  }
})
      
     
   
    }
    
     
  }
  
  render(){
    
   

    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
   
    
    return(
      <KeyboardAwareScrollView>
     
      <View style={styles.container}>
        
    
<View style={styles.containeron}>
  <View style={{backgroundColor: '#0d74a1',height: 40, justifyContent: 'center', alignItems: 'center'}}>
 
  
        <Button color="#0d74a1" onPress={this.showDatepicker} title={this.state.date.toDateString()} />
      
      
      {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}
        
  </View>
  <View style={{flex: 1, backgroundColor: '#2496bd', borderBottomEndRadius: 12, borderBottomLeftRadius:12}}>
  <View style={{backgroundColor: '#fff', flexDirection: 'row', height: 50, borderTopLeftRadius: 12,borderTopRightRadius:12, marginLeft: 5,marginRight:5,marginTop:10}}>
<Text style={{flex:1, textAlign: 'center',fontSize: 20, color: '#2a8000', fontWeight:'bold'}}>Calories</Text>
<Text style={{flex:1, textAlign: 'center',fontSize: 20, color:'#ff6666'}}>Calorie Burned</Text>
<Text style={{flex:1, textAlign: 'center',fontSize: 20}}>Net</Text></View>
    <View style={{backgroundColor: '#fff', flexDirection: 'row', height: 80, borderBottomLeftRadius:12, borderBottomRightRadius: 12, marginLeft: 5,marginRight:5, alignItems:'center'}}>
<Text style={{flex:1, textAlign: 'center',fontSize: 34, color: '#2a8000', fontWeight:'bold'}}>{this.state.calorie}</Text>
<Text style={{flex:1, textAlign: 'center',fontSize: 34, color:'#ff6666'}}>{this.state.calorieBurned}</Text>
<Text style={{flex:1, textAlign: 'center',fontSize: 34}}>{this.state.calorie - this.state.calorieBurned}</Text></View>
</View> 
</View>

<Weight />


 
  
        <View style={styles.containerone}>
        <View style={{flex: 0.5,backgroundColor: '#3d5875',height: 40, justifyContent: 'center', alignItems: 'center'}}><Text>Goals</Text></View>
        {(this.state.dailyNetCalorieGoal > 0) && ( <View style={styles.box1}>
          
        <View style={styles.one}>
          <Text style={styles.subtitle}>Daily Net Calorie Goal: </Text></View>
          <View style={styles.two}>
          <AnimatedCircularProgress
            size={100}
            width={5}
            fill={(((this.state.calorie - this.state.calorieBurned)/this.state.dailyNetCalorieGoal)*100)}
            tintColor="#00e0ff"
             backgroundColor="#3d5875">
            {
           (fill) => (
            <Text style={styles.name}> {(((this.state.calorie - this.state.calorieBurned)/this.state.dailyNetCalorieGoal)*100).toFixed(1)} %</Text>
              )
              }</AnimatedCircularProgress>
            
            </View>
          </View>
    )}
       {(this.state.dailyCalorieGoal > 0) && ( <View style={styles.box1}>
          
          <View style={styles.one}>
            <Text style={styles.subtitle}>Daily Calorie Goal: {this.state.dailyCalorieGoal}</Text></View>
            <View style={styles.two}>
            <AnimatedCircularProgress
              size={100}
              width={5}
              fill={(this.state.calorie/this.state.dailyCalorieGoal)*100}
              tintColor="#00e0ff"
               backgroundColor="#3d5875">
              {
             (fill) => (
              <Text style={styles.name}> {((this.state.calorie/this.state.dailyCalorieGoal)*100).toFixed(1)} %</Text>
                )
                }</AnimatedCircularProgress>
              
              </View>
            </View>
      )}
         {(this.state.dailyCalorieBurnedGoal > 0) && ( <View style={styles.box1}>
          
          <View style={styles.one}>
            <Text style={styles.subtitle}>Daily Calorie Burned Goal: </Text></View>
            <View style={styles.two}>
            <AnimatedCircularProgress
              size={100}
              width={5}
              fill={(this.state.calorieBurned/this.state.dailyCalorieBurnedGoal)*100}
              tintColor="#00e0ff"
               backgroundColor="#3d5875">
              {
             (fill) => (
              <Text style={styles.name}> {((this.state.calorieBurned/this.state.dailyCalorieBurnedGoal)*100).toFixed(1)} %</Text>
                )
                }</AnimatedCircularProgress>
              
              </View>
            </View>
      )}
            
           
        
       

        </View>
     </View>  
     </KeyboardAwareScrollView>
   )
  

}
}
/*
This contains code for navigation tab at the bottom of the screen.

*/

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
       
      
     
    

      
     
   
    }
    
     
  }
  render(){
    
  return (
    //Navigator ..the initial screen is Homescreen
    <Tab.Navigator
      initialRouteName="HomeScreen"
      name="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        keyboardHidesTabBar:"true",
      
      }}
      
    >
      <Tab.Screen
        title="Home"
        name="HomeScreen"
        initialParams={{ title: 'Home' }}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
       title="Home"
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
        title="Home"
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
      title="Home"
        name="Profile"
        component={profile}
        options={{
          tabBarLabel: 'Goals',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
     
    </Tab.Navigator> 
  );
}}
const Stack = createStackNavigator();

/* This is for the main homescree. Here the app deal with which screen to show based on at if user has completed registerd
for account or not */
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
   //Shows different screens based on whether the use has filled the initial data or not.
      
      <Stack.Navigator>
        {data ? (
          <Stack.Screen name="MyTabs" component={MyTabs} options={{headerShown: false}}/>
        ):(
          <>
          <Stack.Screen name="initialData" component={initialData} />
          <Stack.Screen name="MyTabs" component={MyTabs} />
         
          </>
        )}
      
      </Stack.Navigator>
      
  );
}