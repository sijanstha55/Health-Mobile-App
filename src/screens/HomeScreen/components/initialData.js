// This section is for entering the initial data after user registered the account

import React, { useState } from 'react'
import { Image, Text, Picker, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../../firebase/config'



export default function initialData({navigation}) {
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [goalWeight, setGoalWeight] = useState('')
    const [sex, setSex] = useState('1')
    const [heightft, setHeightFt] = useState('')
    const [heightin, setHeightIn] = useState('')
    const [weightM, setWeightM] = useState('lbs');
    const [activitylevel, setActivityLevel] = useState('1.5');
   
    //Function to update profile with new data

    const onUpdateProfile=()=>{
        if(age===''||weight===''||goalWeight==='' ||heightft===''||heightin===''){
            alert('Please do not leave any field empty');
        }
        else{
        if(weightM=="kg"){
            var realWeight= weight * 2.21
            var realGoalWeight = goalWeight * 2.21
        }
        else{
            var realWeight= weight 
           var realGoalWeight = goalWeight
        }
        var heightIn=(heightft * 12)+ heightin
        if(sex=="1"){ //For female
            var BMR = 655 + (4.35 * realWeight) +(4.7 * heightIn) - (4.7 * age)
            var TEE = BMR * parseFloat(activitylevel)
            

        }
        else if(sex=="2"){ //For male
            var BMR = 66 + (6.2 * realWeight) +(12.7 * heightIn) - (6.76 * age)
            var TEE = BMR * parseFloat(activitylevel)
        }
        var use="yy";
                var user = firebase.auth().currentUser;
        let usid=user.uid;


        //setting the value in database based on user's entry
        firebase.firestore().collection('users').doc(usid).set({
            
            age: age,
            BMR: BMR,
            TEE: TEE,
            weight: realWeight,
            goalWeight: realGoalWeight,
            sex: sex,
            heightFt: heightft,
            heightIn:heightin,
            activitylevel: activitylevel,
            dailyNetCalorieGoal:0,
            dailyCalorieGoal:0,
            dailyCalorieBurnedGoal:0,
          
            data: true
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
        navigation.navigate('MyTabs');
    }}

  
    return (
        
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
               <View style={styles.initialData}>
                    
                <TextInput
                    style={styles.input}
                    placeholder='Age'
                    keyboardType='number-pad'
                    required
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAge(parseInt(text))}
                    value={age}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.height}>
                <View style={styles.weight}>
                <TextInput
                    style={styles.input}
                    placeholder='Weight'
                    keyboardType='number-pad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setWeight(parseInt(text))}
                    value={weight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /></View>
                <View style={styles.weightM}>
                <Picker
                     selectedValue={weightM}
                     style={{ height: 40, width: 100 }}
                     onValueChange={(itemValue, itemIndex) => setWeightM(itemValue)}
                     >
                     <Picker.Item label="kg" value='kg' />
                      <Picker.Item label="lbs" value='lbs' />
                </Picker></View>
                </View>
                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder='Goal Weight'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setGoalWeight(parseInt(text))}
                    value={goalWeight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                  <View style={styles.height}>
                    <View>
                <Text style={{marginLeft:30,marginTop:10, height:40}}>Sex</Text></View>
                <View style={{marginLeft:50}}>
                <Picker
                     selectedValue={sex}
                     style={{ height: 40, width: 150 }}
                     onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
                     >
                     <Picker.Item label="Female" value='1' />
                      <Picker.Item label="Male" value='2' />
                      
                </Picker></View></View>
                <View style={styles.height}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    keyboardType='number-pad'
                    placeholder='Height in feet'
                    onChangeText={(text) => setHeightFt(parseInt(text))}
                    value={heightft}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /><Text style={{marginTop:20}}>ft</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    
                    placeholder='in inch '
                    keyboardType='number-pad'
                    onChangeText={(text) => setHeightIn(parseInt(text))}
                    value={heightin}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={{marginTop:20}}>inch</Text>
                
                </View>
                <View style={styles.height}>
                    <View>
                <Text style={{marginLeft:30,marginTop:10, height:40}}>Activity Level</Text></View>
                <View style={{marginLeft:50}}>
                <Picker
                     selectedValue={activitylevel}
                     style={{ height: 40, width: 150 }}
                     onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}
                     >
                     <Picker.Item label="Sedentary" value='1.50' />
                      <Picker.Item label="Moderate" value='1.80' />
                      <Picker.Item label="Active" value='2.10' />
                      <Picker.Item label="Very Active" value='2.40' />
                </Picker></View></View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onUpdateProfile()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
                </View> 
            </KeyboardAwareScrollView>
       
    )
     
}





