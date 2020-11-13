
import { firestore } from 'firebase';
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View ,Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../../firebase/config';
 import Goals from './goals'
import { LineChart} from "react-native-chart-kit";

const days =['Sun','Mon','Tue','Wed','Thurs','Fri','Sat']


  
export default function Calorie() {
    
      const [calories,setCalories] =useState([]);
      const [today, setToday]=useState(new Date());
      const [todayCalories,setTodayCalories] = useState(0);
    const [calorieIN,setCalorieIN]=useState('');
    const [data1,setData1] = useState(0);
    const [data2,setData2] = useState(0);
    const [data3,setData3] = useState(0);
    const [data4,setData4] = useState(0);
    const [data5,setData5] = useState(0);
    const [data6,setData6] = useState(0);
    const [data7,setData7] = useState(0);
   const [num,setNum]=useState(0);
   const onAddCalorie =() => {
    var user = firebase.auth().currentUser;
    let usid=user.uid;
    var d = new Date();
    


    d.setHours(0,0,0,0);
    var calorie=todayCalories+parseInt(calorieIN)
   
    const ref=firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString());
      ref.update({
        calorieIN: calorie,

      })
    
    setData1(calorie);
    setTodayCalories(calorie);
  }
  useEffect(()=> {
      var user = firebase.auth().currentUser;
      let usid=user.uid;
      var d = new Date();
      d.setHours(0,0,0,0);
      var date= new Date(d);
     
      var date1 =new Date(date)
      var date2 =new Date(date)
      var date3 =new Date(date)
      var date4 =new Date(date)
      var date5 =new Date(date)
      var date6 =new Date(date)
      var date7 =new Date(date)
      date1.setDate(date.getDate())
      date2.setDate(date.getDate()-1)
      date3.setDate(date.getDate()-2)
      date4.setDate(date.getDate()-3)
      date5.setDate(date.getDate()-4)
      date6.setDate(date.getDate()-5)
      date7.setDate(date.getDate()-6)
      
   
     firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date1.toString())
      .get()
      .then(function(doc)
     {
      if(doc.exists){
        if(doc.data().calorieIN >= 0){
        setData1(doc.data().calorieIN);
        setTodayCalories(doc.data().calorieIN)
        }
        
      }
      
     }) 
     firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date2.toString())
     .get()
     .then(function(doc)
    {
     if(doc.exists){
      if(doc.data().calorieIN >= 0){
       setData2(doc.data().calorieIN);}
     }
    
    }) 
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date3.toString())
    .get()
    .then(function(doc)
   {
    if(doc.exists){
      if(doc.data().calorieIN >= 0){
      setData3(doc.data().calorieIN);}
    }
    
   }) 
   firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date4.toString())
   .get()
   .then(function(doc)
  {
   if(doc.exists){
    if(doc.data().calorieIN >= 0){
     setData4(doc.data().calorieIN);}
   }
   
  }) 
  firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date5.toString())
  .get()
  .then(function(doc)
 {
  if(doc.exists){
    if(doc.data().calorieIN >= 0){
    setData5(doc.data().calorieIN);}
  }
 
 }) 
 firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date6.toString())
 .get()
 .then(function(doc)
{
 if(doc.exists){
  if(doc.data().calorieIN >= 0){
   setData6(doc.data().calorieIN);}
 }

}) 
firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date7.toString())
.get()
.then(function(doc)
{
if(doc.exists){
  if(doc.data().calorieIN >= 0){
  setData7(doc.data().calorieIN);}
}

}) 
  },[]);
      
  
      today.setHours(0,0,0,0)
        
    return (
        <KeyboardAwareScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
  
    <LineChart
      data={{
        labels: [days[(today.getDay()+1) % 7],days[(today.getDay()+2) % 7], days[(today.getDay()+3) % 7],days[(today.getDay()+4) % 7], days[(today.getDay()+5) % 7], days[(today.getDay()+6) % 7], days[(today.getDay()) % 7]],
        datasets: [
          {
            data:[
              data7,data6,data5,data4,data3,data2,data1
              
            ]
            
           
          }
        ]
      }}
      width={Dimensions.get("window").width} 
      height={220}
      fromZero= 'true'
      yAxisInterval={1} 
      chartConfig={{
        backgroundColor: "#e26a00",
        
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
    
  </View>
        
        <View style={styles.container1}>
            <View style={styles.box1}>
        <TextInput onChangeText={(text) => 
         
            setCalorieIN((text))}
  
        
  
                    style={styles.input}
                    id="calorie"
                    placeholder='Calorie'
                    placeholderTextColor="#aaaaaa"
                    
                    value={calorieIN}
                    
                    keyboardType='number-pad'
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /></View>
                <View style={styles.box2}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onAddCalorie()}>
                    <Text style={styles.buttonTitle}>Add Calorie</Text>
                </TouchableOpacity></View>
               
                    </View>
                   
        </View>
        </KeyboardAwareScrollView>
    );
        }
  