//This section is for weight. This component is called in Homescreen. Here user update their weight

import React, { useState, Component,useEffect } from 'react';
import Dialog from 'react-native-dialog';
import { Image, Text, TextInput, TouchableOpacity, View, Button ,Dimensions,ScrollView} from 'react-native'

import styles from '../styles';
import { firebase } from '../../../firebase/config';

import { MaterialIcons } from '@expo/vector-icons'; 

import DateTimePicker from '@react-native-community/datetimepicker';

import { LineChart} from "react-native-chart-kit";
import fitnessstyles from '../fitnessstyles';
export default class Weight extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            isLoading: true,
           
          weight:0,
            weights:[],
            months:[],
          weightInput:false,
          showweightDate:false,
          weightDate: new Date(),
          usid:'',
          
    
        };
      
      }

      //Getting upto date weights
      getWeights= async () =>{
        var user = firebase.auth().currentUser
       
        if(user)
         {
           let usid=user.uid;
           var data=[];
           var date=[];
     await firebase.firestore().collection('users').doc(usid).collection('weight').orderBy("timestamp", "asc").get()
     .then(function(querySnapshot){
         
         querySnapshot.forEach(function(doc){
             data.push(parseInt(doc.data().weight))
             date.push(doc.data().timestamp.toDate())
         })
       
         
         
     }
     )
     this.setState({weights:data,months:date})
     
     this.setState({isLoading:false})
    }
      }
      componentDidMount(){
        this.getWeights();

      }
      showWeightInput=()=>{
        this.setState({weightInput:true})
      }
       handleCancel = () => {
        this.setState({weightInput:false});
      };

      //Function to update weight in the database.
      
       UpdateWeight =async()=>{
           if(this.state.weight==0){
                alert("Please select valid weight")
           }else{
           this.setState({isLoading:true})
        let weightDate = this.state.weightDate;
        weightDate.setHours(0,0,0,0);
        let w=weightDate.toString();
        var user = firebase.auth().currentUser
        let usid=user.uid;
        firebase.firestore().collection('users').doc(user.uid).collection('weight').doc(w).set({
          
          weight: this.state.weight,
          timestamp: weightDate,
          
        })
        var data=[];
        var date=[];
  await firebase.firestore().collection('users').doc(usid).collection('weight').orderBy("timestamp", "asc").get()
  .then(function(querySnapshot){
      
      querySnapshot.forEach(function(doc){
          data.push(parseInt(doc.data().weight))
          date.push(doc.data().timestamp.toDate())
      })
    
      
      
    })
  
  this.setState({weights:data,months:date})
  this.setState({weightInput:false});
  this.setState({isLoading:false})
 this.props.handler;
       }}
       
      showWeightDate =() =>{
        this.setState({showweightDate:true});
      }
      
        onWeightDateChange = (event, selectedDate) => {
          const currentDate = selectedDate  || this.state.weightDate;
          
          this.setState({weightDate:currentDate,showweightDate:false});
      }
      render(){
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
        if(this.state.isLoading){
           
            return <></>
        }
       const  data = {
            labels: this.state.months.map((p)=>(monthNames[p.getMonth()]+' '+p.getDate()).toString()),
            datasets: [
              {
                data: this.state.weights.map((p)=>p)
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
return(
    <View style={{flex:1}}>
        
    <Dialog.Container visible={this.state.weightInput} onBackdropPress={this.handleCancel} headerStyle={fitnessstyles.dialogHeader} footerStyle={fitnessstyles.dialogFooter}> 
    <Dialog.Title>Update Your Weight </Dialog.Title>
   
   
    <Dialog.Input
                style={fitnessstyles.input}
                placeholder='Weight in lbs'
                keyboardType='number-pad'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => this.setState({weight: parseInt(text)})}
                value={this.state.weight}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
             
   
    <Dialog.Button  accessibilityLabel="Cancel" label="Cancel" onPress={this.handleCancel} />
    <Dialog.Button label="Update" onPress={this.UpdateWeight} />
  </Dialog.Container>
    
  <View style={{backgroundColor: '#0d74a1',height: 40, justifyContent: 'center', alignItems: 'center',marginLeft: 10,marginRight:10,flexDirection:'row'}}>
    <Text style={{color:'white',fontWeight:'bold'}}>Weight Section</Text>
  <MaterialIcons name="add" size={30} color="white" onPress={this.showWeightInput}/> 
 </View>
<ScrollView horizontal={true}>
    
<LineChart
  style={{marginLeft:10,marginRight:10}}
 
  data={data}
 width={Dimensions.get("window").width-10}
  height={250}
  yAxisSuffix="lbs"
  
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/></ScrollView>
</View>
)
}}