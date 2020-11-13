import { HeaderBackground } from '@react-navigation/stack';
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput,Picker, TouchableOpacity, View ,Dimensions,Button} from 'react-native'
import Dialog from 'react-native-dialog';
import fitnessstyles from '../fitnessstyles';
import { firebase } from '../../../firebase/config';
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons'; 
export default function fitness(){

 const [walkvisible,setWalkVisible]=useState(false);
 const [runvisible,setRunVisible]=useState(false);
 const [burnedvisible,setBurnedVisible]=useState(false);
 const [calorieBurned,setCalorieBurned]=useState(0);
 const [value,setValue]=useState(0);
 const [walk,setWalk]=useState(0);
 const [run,setRun]=useState(0);
 const [today,setToday]=useState(0);
 const [met, setMet]=useState(7);
 const [walkmet, setWalkMet]=useState('3');
 const [walkingspeed, setWalkingspeed]=useState(2.5);
 const [duration,setDuration]=useState('');
const [loading,setLoading]=useState(false);
const [weight, setWeight] = useState(0);
const [index,setIndex]=useState(0);
 const showWalk = () => {
  setWalkVisible(true);
};
const showRun = () => {
  setRunVisible(true);
};
const showCalorieBurned = () => {
  setBurnedVisible(true);
};

const handleCancel = () => {
  setWalkVisible(false);
  setRunVisible(false);
  setBurnedVisible(false);
};
const handleDelete = () => {
  
  setWalkVisible(false);
  setRunVisible(false);
};
const AddCalorieBurned = () => {
  
  var user = firebase.auth().currentUser;
    let usid=user.uid;
    var d = new Date();
    


    d.setHours(0,0,0,0);
    var calorie=today+(calorieBurned)
    setToday(calorie);
    const ref=firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString());
      ref.get()
      .then(function(doc){
        if(doc.exists){
          console.log('Found')
          ref.update({
            calorieBurned: parseInt(calorie)
          })
        }
        else{
          ref.set({
            calorieBurned: parseInt(calorie),
            timestamp: d
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
        }
      })
};
const  AddWalk = ()=>{
  var calorieBurn = parseFloat(met) * (weight/2.21) * (parseInt(duration)/60);
 var wal=0;
  if(walkmet=="3"){
   wal = ((parseFloat(duration)/60) * 2.5)
 }
 else if(walkmet=="3.5"){
   wal =((parseFloat(duration)/60) * 3)
 }
 else if(walkmet=="4.3"){
   wal = ((parseFloat(duration)/60) * 3.5)
 }
 else if(walkmet=="5"){
   wal =((parseFloat(duration)/60) * 4)
 }

wal = parseFloat(walk) +(wal);
wal = wal.toFixed(2);
  setWalk(wal);
  var user = firebase.auth().currentUser;
    let usid=user.uid;
    var d = new Date();
    


    d.setHours(0,0,0,0);
    var calorie=today+calorieBurn
    setToday(calorie);
    const ref=firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString());
      ref.get()
      .then(function(doc){
        if(doc.exists){
          console.log('Found')
          ref.update({
            calorieBurned: parseInt(calorie),
            walk:wal
          })
        }
        else{
          ref.set({
            calorieBurned: parseInt(calorie),
            walk: wal,
            timestamp: d
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
        }
      })
      setWalkVisible(false);

}
const  AddRun = ()=>{
  var calorieBurn = parseFloat(met) * (weight/2.21) * (parseInt(duration)/60);
 const Met = [7,6,8.3,9,9.8,10.5,11,11.8,11.8,12.3,12.8,14.5,16,19,19.8,23]
 const speed = [2,4,5,5.2,6,6.7,7,7.5,8,8.6,9,10,11,12,13,14]
 var ran = speed[index] * (parseFloat(duration)/60);
 ran = ran.toFixed(2) + run;
setRun(ran)

  
  var user = firebase.auth().currentUser;
    let usid=user.uid;
    var d = new Date();
    


    d.setHours(0,0,0,0);
    var calorie=today+calorieBurn
    setToday(calorie);
    const ref=firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString());
      ref.get()
      .then(function(doc){
        if(doc.exists){
          console.log('Found')
          ref.update({
            calorieBurned: parseInt(calorie),
            run:parseFloat(ran) + run
            
          })
        }
        else{
          ref.set({
            calorieBurned: parseInt(calorie),
            
            timestamp: d
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
        }
      })
      setRunVisible(false);
}
useEffect(() => {
  var user = firebase.auth().currentUser;
    let usid=user.uid;
    var d = new Date();
    


    d.setHours(0,0,0,0);
    firebase.firestore().collection('users').doc(usid).get().then(function(doc){
      setWeight(doc.data().weight);
    })
    
    const ref=firebase.firestore().collection('users').doc(usid).collection('dailyRecord').doc(d.toString());
      ref.get()
      .then(function(doc){
       if(doc.data().calorieBurned >= 0){
          setToday(doc.data().calorieBurned)}
          else{
            ref.set({calorieBurned:0},{merge:true})
          }
          if(doc.data().walk >= 0){  
          setWalk(doc.data().walk)
          }else{
            ref.set({walk:0},{merge:true})
          }
          if(doc.data().run >= 0){
          setRun(doc.data().run)
      }
    else{
      ref.set({run:0},{merge:true})
    }}
      
         
      
       

 ) })  

if (loading) {	
  return (	
    <></>	
  )	

}
    return (
    <View style={fitnessstyles.mainContainer}>

      <View style={fitnessstyles.containerone}>
        <View style={fitnessstyles.coboxone}></View>
        <View style={fitnessstyles.coboxtwo}>
          <Text style={{fontSize:48,color:'#ff6666'}}>{today}</Text>
          <Text style={{fontSize: 16}}> Calories Burned Today.</Text> 
          <MaterialIcons name="add" size={48} color="#ff6666" onPress={showCalorieBurned} /> 
        </View>
        <Dialog.Container visible={burnedvisible} onBackdropPress={handleCancel} headerStyle={fitnessstyles.dialogHeader} footerStyle={fitnessstyles.dialogFooter}> 
        <Dialog.Title>Add Calories Burned</Dialog.Title>
       
        <Dialog.Input
                    style={fitnessstyles.input}
                    placeholder='Calories Burned'
                    keyboardType='number-pad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setCalorieBurned(text)}
                    value={calorieBurned}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 
       
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Add" onPress={AddCalorieBurned} />
      </Dialog.Container>
      <Dialog.Container visible={walkvisible} onBackdropPress={handleCancel} headerStyle={fitnessstyles.dialogHeader} footerStyle={fitnessstyles.dialogFooter}> 
        <Dialog.Title>Add Your walking {met}</Dialog.Title>
       
        <Dialog.Input
                    style={fitnessstyles.input}
                    placeholder='Duration in minutes'
                    keyboardType='number-pad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDuration(text)}
                    value={duration}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Picker
                     selectedValue={met}
                     style={{width:250,marginLeft:10}}
                     onValueChange={(itemValue, itemIndex) => {setWalkMet(itemValue); setIndex(itemIndex)}}
                     >
                     <Picker.Item label="Slow Walking (2.5 mph)" value='3' />
                      <Picker.Item label="Moderate Walking (3 mph)" value='3.5' />
                      <Picker.Item label="Fast Walking (3.5 mph)" value='4.3' />
                      <Picker.Item label="Very Fast Walking (4 mph)" value='5' />
                </Picker>
       
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Add" onPress={AddWalk} />
      </Dialog.Container>
      <Dialog.Container visible={runvisible} onBackdropPress={handleCancel} headerStyle={fitnessstyles.dialogHeader} footerStyle={fitnessstyles.dialogFooter}> 
        <Dialog.Title>{'Add Your Running'}</Dialog.Title>
       
        <Dialog.Input
                    style={fitnessstyles.input}
                    placeholder='Duration in minutes'
                    keyboardType='number-pad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDuration(text)}
                    value={duration}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 <Picker
                     selectedValue={met}
                     style={{width:250,marginLeft:10}}
                     onValueChange={(itemValue, itemIndex)=> {setMet(itemValue); setIndex(itemIndex)} }
                    
                     >
                     <Picker.Item color='green' label="Jogging General" value='7' />
                      <Picker.Item color='blue' label="4 mph (15 min/mile)" value='6' />
                      <Picker.Item color='green' label="5 mph (12 min/mile)" value='8.3' />
                      <Picker.Item color='blue' label="5.2 mph (11.5 min/mile)" value='9' />
                      <Picker.Item color='green' label="6 mph (10 min/mile)" value='9.8' />
                      <Picker.Item color='blue' label="6.7 mph (9 min/mile)" value='10.5' />
                      <Picker.Item color='green' label="7 mph (8.5 min/mile)" value='11' />
                      <Picker.Item color='blue' label="7.5 mph (8 min/mile)" value='11.8' />
                      <Picker.Item color='blue' label="8 mph (7.5 min/mile)" value='11.8' />
                      <Picker.Item color='green' label="8.6 mph (7 min/mile)" value='12.3' />
                      <Picker.Item color='blue' label="9 mph (6.5 min/mile)" value='12.8' />
                      <Picker.Item color='green' label="10 mph (6 min/mile)" value='14.5' />
                      <Picker.Item color='blue' label="11 mph (5.5 min/mile)" value='16' />
                      <Picker.Item color='green' label="12 mph (5 min/mile)" value='19' />
                      <Picker.Item color='blue'  label="13 mph (4.6 min/mile)" value='19.8' />
                      <Picker.Item color='green' label="14 mph (4.3 min/mile)" value='23' />
                </Picker>
       
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Add" onPress={AddRun} />
      </Dialog.Container>
    
      </View>
      <View style={fitnessstyles.containertwo}>
      
        <View style={fitnessstyles.boxone}>
        <View style={fitnessstyles.btone}>
          <Text style={{flex:1,fontSize:26,marginLeft: 5}}>Walk</Text>
        <MaterialIcons name="add" size={48} color="black" onPress={showWalk} /> 
        </View>
        <View style={fitnessstyles.bttwo}>
        <Text style={{fontSize:60}}>
          {walk}
        </Text>
        <Text>miles <FontAwesome5 name="walking" size={24} color="black" /> today</Text>
        </View>
        </View>
       
        <View style={fitnessstyles.boxtwo}>
          <View style={fitnessstyles.btone}>
          <Text style={{flex:1,fontSize:26,marginLeft:5}}>Running</Text>
        <MaterialIcons name="add" size={48} color="black" onPress={showRun} /> 
        </View>
        <View style={fitnessstyles.bttwo}>
        <Text style={{fontSize:60}}>
          {run}
        </Text>
        <Text>miles <FontAwesome5 name="running" size={24} color="black" /> today</Text>
        </View>
        </View>

      </View>
    </View>
    );
  }