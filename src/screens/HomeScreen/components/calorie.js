//This section is for calorie section.
//Here User add their calories and also delete the entries. The graph also include in this section that will show data
//for last seven days

import { firestore } from 'firebase';
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View ,Button, Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../../firebase/config';
 import Goals from './goals'
 import Dialog from 'react-native-dialog';
import { LineChart} from "react-native-chart-kit";
import fitnessstyles from '../fitnessstyles';
import { MaterialIcons,FontAwesome5,Entypo } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
const days =['Sun','Mon','Tue','Wed','Thurs','Fri','Sat']


  
export default function Calorie() {
   
      const [calories,setCalories] =useState([]);
      const [today, setToday]=useState(new Date());
      const [todayCalories,setTodayCalories] = useState(0);
      const [loading,setLoading]=useState(false);
    const [calorieIN,setCalorieIN]=useState('');
    const [dcalories,setDcalories]=useState([]);
    
    const [data1,setData1] = useState(0);
    const [data2,setData2] = useState(0);
    const [data3,setData3] = useState(0);
    const [data4,setData4] = useState(0);
    const [data5,setData5] = useState(0);
    const [data6,setData6] = useState(0);
    const [data7,setData7] = useState(0);
    const [date,setDate]=useState(new Date());
    const [setShowDate,showDate]=useState(false);
    const [mode,setMode]=useState('date');
    const [show, setShow] =useState(false)
    const [showCalorieIn,setShowCalorieIn]=useState(false);
   const [num,setNum]=useState(0);
   const [test,setTest]=useState(false)
   
   
  //function to handle cancel
  const handleCancel = () => {
    setShowCalorieIn(false);
  
  };

  //function after user submit the new calorie entry
  const AddCalorieIn = () => {
    if(calorieIN===''){
      alert('Please enter the calorie value')
    }
    else{
  var dd=new Date(date)
  dd.setHours(0,0,0,0)
    var user = firebase.auth().currentUser;
      let usid=user.uid;
      var d = new Date();
      firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(dd.toString()).collection('calorieIn').doc(date.toString()).set({
        calorie: calorieIN,
        timestamp: date
      })
      firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(dd.toString())
      .get()
      .then(function(doc){
        if(doc.exists){
          if(doc.data().calorieIN >0){
            firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(dd.toString()).set({
              calorieIN: parseInt(doc.data().calorieIN + calorieIN)
            },{merge:true})
            if(dd.toDateString() === today.toDateString()){
              setTodayCalories(parseInt(doc.data().calorieIN + calorieIN))
             
            }

  
          }
          else{
            firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(dd.toString()).set({
              calorieIN:  calorieIN
            },{merge:true})
            if(dd.toDateString() === today.toDateString()){
              setTodayCalories(calorieIN)
            }
          }
        }
        else{
          firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(dd.toString()).set({
            calorieIN:  calorieIN
          },{merge:true})
          if(dd.toDateString() === today.toDateString()){
            setTodayCalories(parseInt(calorieIN));
          }
        }
     
    })
   
setShowCalorieIn(false);
setDate(new Date());
restart();
    }}
//function to deal with change in date mode or time mode
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  var dp=[];
  useEffect(async()=> {
   
    setLoading(true);
  
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
      var cal=[];
    var   dd=new Date();
      dd.setHours(0,0,0,0);
   
      const dat=[date7,date6,date5,date4,date3,date2,date1]
var total=[];
var tot=0;
await firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(dd.toString()).collection('calorieIn').orderBy("timestamp", "asc").get()
    .then(function(querySnapshot){
        var data=[];
        querySnapshot.forEach(function(doc){
            data.push({'calorie':doc.data().calorie,'date':doc.data().timestamp.toDate()})
            tot=tot+doc.data().calorie
        })
        setCalories(data);
        setTodayCalories(tot)
        
    })

firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date1.toString()).get()
  .then(function(doc){
   
      if(doc.exists){
        if(doc.data().calorieIN >0){
          setData1(doc.data().calorieIN);
        
        }
      }
    })
firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date2.toString()).get()
  .then(function(doc){
 
      if(doc.exists){
        if(doc.data().calorieIN >0){
          setData2(doc.data().calorieIN);
        }
      }
    })
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date3.toString()).get()
    .then(function(doc){
      if(doc.exists){
        if(doc.data().calorieIN >0){
          setData3(doc.data().calorieIN);
        }
      }
    })
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date4.toString()).get()
  .then(function(doc){

      if(doc.exists){
        if(doc.data().calorieIN >0){
          setData4(doc.data().calorieIN);
        }
      }
    })
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date5.toString()).get()
  .then(function(doc){
 
      if(doc.exists){
        if(doc.data().calorieIN >0){
          setData5(doc.data().calorieIN);
        }
      }
    })
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date6.toString()).get()
  .then(function(doc){
   
      if(doc.exists){
        if(doc.data().calorieIN >0){
          setData6(doc.data().calorieIN);
        }
      }
    })
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date7.toString()).get()
  .then(function(doc){
   
      if(doc.exists){
        if(doc.data().calorieIN >0){
          setData7(doc.data().calorieIN);
        }
      }
    })


 


    
setLoading(false)

  },[]);


  //to render the screen after value changed
  const restart=async()=>{
    setLoading(true);
  
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
    var cal=[];
  var   dd=new Date();
    dd.setHours(0,0,0,0);
 
    const dat=[date7,date6,date5,date4,date3,date2,date1]
var total=[];
var tot=0;
await firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(dd.toString()).collection('calorieIn').orderBy("timestamp", "asc").get()
  .then(function(querySnapshot){
      var data=[];
      querySnapshot.forEach(function(doc){
          data.push({'calorie':doc.data().calorie,'date':doc.data().timestamp.toDate()})
          tot=tot+doc.data().calorie
      })
      setCalories(data);
      setTodayCalories(tot)
      
  })

firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date1.toString()).get()
.then(function(doc){
 
    if(doc.exists){
      if(doc.data().calorieIN >0){
        setData1(doc.data().calorieIN);
      
      }
    }
  })
firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date2.toString()).get()
.then(function(doc){

    if(doc.exists){
      if(doc.data().calorieIN >0){
        setData2(doc.data().calorieIN);
      }
    }
  })
  firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date3.toString()).get()
  .then(function(doc){
    if(doc.exists){
      if(doc.data().calorieIN >0){
        setData3(doc.data().calorieIN);
      }
    }
  })
  firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date4.toString()).get()
.then(function(doc){

    if(doc.exists){
      if(doc.data().calorieIN >0){
        setData4(doc.data().calorieIN);
      }
    }
  })
  firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date5.toString()).get()
.then(function(doc){

    if(doc.exists){
      if(doc.data().calorieIN >0){
        setData5(doc.data().calorieIN);
      }
    }
  })
  firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date6.toString()).get()
.then(function(doc){
 
    if(doc.exists){
      if(doc.data().calorieIN >0){
        setData6(doc.data().calorieIN);
      }
    }
  })
  firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(date7.toString()).get()
.then(function(doc){
 
    if(doc.exists){
      if(doc.data().calorieIN >0){
        setData7(doc.data().calorieIN);
      }
    }
  })





  
setLoading(false)


  }
   //function invoked after calorie entry is deleted   
  const deleteCalorie=(calo,dt)=>{
    var de=new Date(dt)
    de.setHours(0,0,0,0)
    var user = firebase.auth().currentUser;
    let usid=user.uid;
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(de.toString()).collection('calorieIn').doc(dt.toString())
    .delete().then(function(){
      alert('Delete Successful');
    })
    firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(de.toString()).set({
      calorieIN: (todayCalories - calo)
    },{merge:true})
    restart();
  }
      today.setHours(0,0,0,0)

      function NicoDates(props) {
        const call = props.calories;
        const listItems = call.map((call) =>
        <View style={{display:'flex',height:100,backgroundColor:'#2a8000',width:Dimensions.get("window").width,margin:10,flexDirection:'row'}}> 
          <View style={{flex:0.7}}> 
          <Text style={{color:'white',fontWeight:'bold',fontSize:40,textAlign:'center'}}>{call.calorie}</Text>
         <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>calories at {moment(call.date).format('HH:mm')} </Text>   
         </View>
         <View style={{backgroundColor:'white', justifyContent:'center',
        alignItems:'center',flex:0.3,marginRight:0}}>
         <Entypo name="cross" size={35} color="red" onPress={() => deleteCalorie(call.calorie,call.date)} />
         </View>
         </View>
        );
        return (
          <View>{listItems}</View>
        );
      }
     if(loading){
       return <></>
     }  
     
     else{ 
      
       
    return (
        <KeyboardAwareScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={fitnessstyles.coboxtwo}>
      <Text style={{fontSize:48,color:'#ff6666'}}>{todayCalories}</Text>
          <Text style={{fontSize: 16,alignItems:'center'}}> Calories In Today.</Text> 
          <MaterialIcons name="add" size={48} color="#ff6666" onPress={()=>setShowCalorieIn(true)} /> 
          </View>
        <View>
  
  <LineChart
      data={{
        labels: [days[(today.getDay()+1) % 7],days[(today.getDay()+2) % 7], days[(today.getDay()+3) % 7],days[(today.getDay()+4) % 7], days[(today.getDay()+5) % 7], days[(today.getDay()+6) % 7], days[(today.getDay()) % 7]],
        datasets: [
          {
           
            data:[data7,data6,data5,data4,data3,data2,data1]
          
              
            
            
           
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
        <View style={fitnessstyles.coboxtwo}>
 
        </View>
        <Dialog.Container visible={showCalorieIn} onBackdropPress={handleCancel} headerStyle={fitnessstyles.dialogHeader} footerStyle={fitnessstyles.dialogFooter}> 
        <Dialog.Title>Add Calories</Dialog.Title>
        <Button color="#0d74a1" onPress={showDatepicker} title={date.toDateString()} />
        <Button color="#0d74a1" onPress={showTimepicker} title={date.toLocaleTimeString()} />
      
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
        <Dialog.Input
                    style={fitnessstyles.input}
                    placeholder='Calories In'
                    keyboardType='number-pad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCalorieIN(parseInt(text))}
                    value={calorieIN}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 
       
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Add" onPress={AddCalorieIn} />
        </Dialog.Container>
            <View style={styles.box1}>
       
                
              </View>
                <View style={styles.box2}>
                </View>
               
                    </View>
                    <NicoDates calories={calories} /> 
        </View>
        </KeyboardAwareScrollView>
    );
        }
      }