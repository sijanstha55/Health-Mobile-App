
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
import CalendarPicker from 'react-native-calendar-picker';
import { BarChart} from "react-native-chart-kit";


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
      percent: 0
      
      

    };
  
  }
 
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    
    this.setState({date:currentDate,show:false});
    var user = firebase.auth().currentUser
    var  d=currentDate;
      d.setHours(0,0,0);
       
       
       if(user)
        {
          let usid=user.uid;
          
         firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc =>{
           this.setState({BMI: doc.data().BMI})
   
         })
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
       
      firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc =>{
        this.setState({BMI: doc.data().BMI})
        dailyCalorie = doc.data().dailyCalorieGoal

      })
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
    
    const data = {
      labels: ["January", "February", "March", "April", "May", "June","july","Aug"],
      datasets: [
        {
          data: [45, 45, 67, 80, 99, 43,70,50]
        }
      ]
    };
    const chartConfig = {
      backgroundGradientFrom: "rgb(255, 179, 217)",
      backgroundGradientFromOpacity: 0.5,
      backgroundGradientTo: "#3385ff",
      backgroundGradientToOpacity: 1,
      color: (opacity = 100) => `rgba(0, 0, 153, ${opacity})`,
      strokeWidth: 5, 
      barPercentage: 0.5,
      useShadowColorFromDataset: false 
    };

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
<Text style={{flex:1, textAlign: 'center',fontSize: 34}}>{this.state.net}</Text></View>
</View> 
</View>
<View style={{backgroundColor: '#0d74a1',height: 40, justifyContent: 'center', alignItems: 'center',marginLeft: 10,marginRight:10}}><Text>Weight</Text></View>
<ScrollView horizontal={true}>
<BarChart
  style={{marginLeft:10,marginRight:10}}
 
  data={data}
  width={Dimensions.get("window").width-20}
  height={250}
  yAxisSuffix="lbs"
  showValuesOnTopOfBars={true}
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/></ScrollView>
<View style={{backgroundColor: '#fff', flexDirection: 'row', height: 100, borderBottomRightRadius: 12,borderBottomLeftRadius:12, marginLeft: 10,marginRight:10, alignItems:'center'}}>
<Text style={{flex:1,textAlign: 'center',fontSize: 34, color: '#2a8000'}}>89</Text>
<Text style={{flex:1, textAlign: 'center',fontSize: 34, color:'#ff6666'}}>86</Text>
<Text style={{flex:1, textAlign: 'center',fontSize: 34}}>Loss</Text></View>

 
  
        <View style={styles.containerone}>
        <View style={{flex: 0.5,backgroundColor: '#3d5875',height: 40, justifyContent: 'center', alignItems: 'center'}}><Text>Goals</Text></View>
          <View style={styles.box1}>
            <View style={styles.one}>
          <Text style={styles.subtitle}>Daily Calorie Goal: </Text></View>
          <View style={styles.two}>
          <AnimatedCircularProgress
            size={100}
            width={5}
            fill={this.state.percent}
            tintColor="#00e0ff"
             backgroundColor="#3d5875">
            {
           (fill) => (
            <Text style={styles.name}> {this.state.percent} %</Text>
              )
              }</AnimatedCircularProgress>
            
            </View>
          </View>
         
           
           
        
       
              
        </View>
     </View>  
     </KeyboardAwareScrollView>
   )
  

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
       
      
     
    

      
     
   
    }
    
     
  }
  render(){
    
  return (
    
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
          <Stack.Screen name="MyTabs" component={MyTabs} options={{headerShown: false}}/>
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