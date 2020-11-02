
import { firestore } from 'firebase';
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View ,Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../../firebase/config';
import { render } from 'react-dom';
export default function Goals({navigation}){
    const [weight,setWeight]=useState(0);
    const [goalWeight,setGoalWeight]=useState(0);
    const [goal, setGoal]=useState('');
       
   const  onAddCalorie=()=>{
        navigation.navigate('MyTabs');
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
           
              if(doc.data().weight>doc.data().goalWeight){
                setGoal('lose')
            }
            else{
              setGoal('gain')
            }
    
          })
          
         
         
       
        }
        
         
      })
      
    return(
        <View>
          <Text>Hmm..So you want to {goal} weight. Below are few recommendations you can choose from to reach your desired weight.</Text>
        <TouchableOpacity
                    style={styles.button}
                    onPress={() => onAddCalorie()}
                    >
                    <Text style={styles.buttonTitle}>Very Easy:You will {goal} 0.5 lb in one week</Text>
                </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        >
        <Text style={styles.buttonTitle}>Easy: You will {goal} 1 lb in one week</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        >
        <Text style={styles.buttonTitle}>Moderate: You will {goal} 1.5 lb in one week</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        >
        <Text style={styles.buttonTitle}>Hard: You will {goal} 2 lb in one week</Text>
        </TouchableOpacity>
        </View>
    );}
