
import { firestore } from 'firebase';
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View ,Dimensions} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../../firebase/config';
 import Goals from './goals'
import { LineChart} from "react-native-chart-kit";


const onAddCalorie =(today,val) => {
    var user = firebase.auth().currentUser;
    let usid=user.uid;
    var d = new Date();
    

d.setDate(d.getDate() - 1); 
    d.setHours(0,0,0,0);
    var calorie=today+val
    const ref=firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString());
      ref.get()
      .then(function(doc){
        if(doc.exists){
          console.log('Found')
          ref.update({
            calorieIN: calorie
          })
        }
        else{
          ref.set({
            calorieIN: calorie,
            timestamp: d
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
        }
      })
    
    
  }

  
export default class calorie extends Component{
    constructor(props){
      super(props);
      this.state ={
        today: 0,
        yesterday:0,
        calorieIN:''
        

      }
    
    }
    componentDidMount() {
        var user = firebase.auth().currentUser
        var d = new Date();
        
        d.setHours(0,0,0,0);
        if(user)
         {
           let usid=user.uid;
           
          firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc =>{
            this.setState({email: doc.data().fullName})
    
          })
          firebase.firestore().collection('users').doc(usid).collection('dailyRecord').where("timestamp","==",d).onSnapshot((querySnapshot) => {
            var turmarkers=0;
            querySnapshot.forEach((doc) => {
            
            
            
            turmarkers = turmarkers+  doc.data().calorieIN
        });
        this.setState({
          today:turmarkers
      });
      
    })
          
         
       
        }
        
         
      }
      
    render(){
        var today = new Date();
    return (
        <KeyboardAwareScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
    
    <LineChart
      data={{
        labels: [today.getDate()-3, today.getDate()-2, today.getDate()-1, today.getDate()],
        datasets: [
          {
            data:[
              this.state.today,
              this.state.yesterday,
             800 ,
              850 
              
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
        //decimalPlaces: 2, // optional, defaults to 2dp
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
         
            this.setState({calorieIN:parseInt(text)})}
  
        
  
                    style={styles.input}
                    id="calorie"
                    placeholder='Calorie'
                    placeholderTextColor="#aaaaaa"
                    
                    value={this.state.calorieIN}
                    
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /></View>
                <View style={styles.box2}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onAddCalorie(this.state.today,this.state.calorieIN)}>
                    <Text style={styles.buttonTitle}>Add Calorie</Text>
                </TouchableOpacity></View>
                
                    </View>
                   
        </View>
        </KeyboardAwareScrollView>
    );
  }}
  