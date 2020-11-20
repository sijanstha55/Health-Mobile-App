/*
This contains the code for goals part. Here app deals with showing the goals and user can set the goals.
*/
import { firestore } from 'firebase';
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View ,Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import goalsstyles from '../goalsstyles';
import styles from '../styles';
import { firebase } from '../../../firebase/config';
import { render } from 'react-dom';
export default function Goals({navigation}){
    const [weight,setWeight]=useState(0);
    const [goalWeight,setGoalWeight]=useState(0);
    const [goal, setGoal]=useState('');
    const [week, setWeek] = useState(0);
    const [dailyCalorieGoal, setDailyCalorieGoal]=useState('');
    const [dailyNetCalorieGoal, setDailyNetCalorieGoal]=useState(0);
    const [dailyCalorieBurnedGoal, setDailyCalorieBurnedGoal]=useState('');
    const [TEE, setTEE]=useState(0);

    //for setting daily calorie goal
    const onSetDailyCalorieGoal=()=>{
      if(dailyCalorieGoal==''){
        alert('Please enter the goal amount')
      }
      else{
        var user = firebase.auth().currentUser;
        let usid=user.uid;
        firebase.firestore().collection('users').doc(usid).set({
            
            dailyCalorieGoal: dailyCalorieGoal
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
        alert('Goal Added');
      }
setDailyCalorieGoal('');
    }

    //for setting daily calorie burned goal
    const onSetDailyCalorieBurnedGoal=()=>{
      if(dailyCalorieBurnedGoal==''){
        alert('Please enter the goal amount')
      }
      else{
        var user = firebase.auth().currentUser;
        let usid=user.uid;
        firebase.firestore().collection('users').doc(usid).set({
            
            dailyCalorieBurnedGoal: dailyCalorieBurnedGoal
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
      }
      setDailyCalorieBurnedGoal('');
      alert('Goal Added');
      
    }

    //for setting daily net calorie goal
   const  onSetNetCalorieGoal=(cal)=>{
     if(goal=='lose'){
     var call= TEE - (cal * 500)
    
      
      }
      else{
       var call= TEE + (cal * 500)
       
      }
      var user = firebase.auth().currentUser;
      let usid=user.uid;
      firebase.firestore().collection('users').doc(usid).set({
          
          dailyNetCalorieGoal: call
      }, { merge: true })
          
          
          .catch((error) => {
              alert(error)
      });
    alert('Goal Added');
    }
     
    useEffect(()=> {
        var user = firebase.auth().currentUser
        var d = new Date();
        
        d.setHours(0,0,0,0);
        if(user)
         {
           let usid=user.uid;
           
          firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc =>{
            setWeight(doc.data().weight)
            setGoalWeight(doc.data().goalWeight)
            setTEE(doc.data().TEE)
           
              if(doc.data().weight>doc.data().goalWeight){
                setGoal('lose')
                var week = (doc.data().weight - doc.data().goalWeight) / 0.5
                week = week.toFixed(2);
                setWeek(week)
               
            }
            else{
              setGoal('gain')
              var week = (doc.data().goalWeight - doc.data().weight) / 0.5
              week=week.toFixed(2);
              setWeek(week)
            }
            
    
          })
          
         
         
       
        }
        
         
      })
     
    return(
        
         <KeyboardAwareScrollView>
       
  
           {((weight - goalWeight) >= 0.5 || (weight - goalWeight) <= -0.5) &&   
           
        <TouchableOpacity
                    style={goalsstyles.goals}
                    onPress={() => onSetNetCalorieGoal(0.5)}
                    >
                    <Text style={goalsstyles.goalsTitle}>Easy</Text>
                    <Text style={{textAlign:'center'}}>You will {goal} 0.5 lb in one week and will reach your desired weight in {(week/1).toFixed(0)} weeks.</Text>
                    <Text style={{textAlign:'center',marginTop:10}}>Daily Net Calorie Goal: {TEE - 250}</Text>
                    
                </TouchableOpacity>
} 
          {((weight - goalWeight) >= 1 || (weight - goalWeight) <= -1) &&  
        <TouchableOpacity
        style={goalsstyles.goals}
        onPress={() => onSetNetCalorieGoal(1)}
        >
        <Text style={goalsstyles.goalsTitle}>Moderate</Text>
        <Text style={{textAlign:'center'}}>You will {goal} 1 lb in one week. You will reach your desired weight in {(week/2).toFixed(0)} weeks.</Text>
        <Text style={{textAlign:'center',marginTop:10}}>Daily Net Calorie Goal: {TEE - 500}</Text>
        </TouchableOpacity>
}
{((weight - goalWeight) >= 1.5 || (weight - goalWeight) <= -1.5) &&  
        <TouchableOpacity
        style={goalsstyles.goals}
        onPress={() => onSetNetCalorieGoal(1.5)}
        >
        <Text style={goalsstyles.goalsTitle}>Hard</Text>
        <Text style={{textAlign:'center'}}> You will {goal} 1.5 lb in one week.You will reach your desired weight in {(week/3).toFixed(0)} weeks.</Text>
        <Text style={{textAlign:'center',marginTop:10}}>Daily Net Calorie Goal: {TEE - 750}</Text>
        </TouchableOpacity>
}
{((weight - goalWeight) >= 2 || (weight - goalWeight) <= -2) &&  
        <TouchableOpacity
        style={goalsstyles.goals}
        onPress={() => onSetNetCalorieGoal(2)}
        >
        <Text style={goalsstyles.goalsTitle}> Very Hard</Text>
        <Text style={{textAlign:'center'}}> You will {goal} 2 lb in one week. You will reach your desired weight in {(week/4).toFixed(0)} weeks.</Text>
        <Text style={{textAlign:'center',marginTop:10}}>Daily Net Calorie Goal: {TEE - 1000}</Text>
           </TouchableOpacity> 
}  
<View
        style={goalsstyles.customgoals}
        onPress={() => onSetNetCalorieGoal}
        >
        <Text style={goalsstyles.goalsTitle}>Custom Goals</Text>
        <TextInput
                    style={styles.input}
                    placeholder='Daily Calorie In Goal'
                    keyboardType='number-pad'
                    required
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDailyCalorieGoal(parseInt(text))}
                    value={dailyCalorieGoal}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSetDailyCalorieGoal()}>
                    <Text style={styles.buttonTitle}>Set Daily Calorie Goal</Text>
                </TouchableOpacity>
                 <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder='Daily Calorie In Goal'
                    required
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDailyCalorieBurnedGoal(parseInt(text))}
                    value={dailyCalorieBurnedGoal}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSetDailyCalorieBurnedGoal()}>
                    <Text style={styles.buttonTitle}>Add Calorie Burned Goal</Text>
                </TouchableOpacity>
        
           </View> 
      
        
      </KeyboardAwareScrollView> 

    );}
