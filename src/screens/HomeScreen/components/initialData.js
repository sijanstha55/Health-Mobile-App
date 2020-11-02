import React, { useState } from 'react'
import { Image, Text, Picker, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../../firebase/config'



export default function initialData({navigation}) {
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [goalWeight, setGoalWeight] = useState('')
    const [sex, setSex] = useState('')
    const [heightft, setHeightFt] = useState('')
    const [heightin, setHeightIn] = useState('')
    const [weightM, setWeightM] = useState('lbs');
    const [activitylevel, setActivityLevel] = useState('');

    const onUpdateProfile=()=>{
        
        var heightM=(heightft * 0.3048)+(heightin * 0.0254)
       
        
        var user = firebase.auth().currentUser;
        let usid=user.uid;
        firebase.firestore().collection('users').doc(usid).set({
            
            age: age,
            
            weight: weight,
            goalWeight: goalWeight,
            sex: sex,
            heightFt: heightft,
            heightIn:heightin,
            activitylevel: activitylevel,
            data: true
        }, { merge: true })
            
            
            .catch((error) => {
                alert(error)
        });
        navigation.navigate('Goals');
    }

  
    return (
        
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
               <View style={styles.initialData}>
                    
                <TextInput
                    style={styles.input}
                    placeholder='Age'
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
                    placeholder='Goal Weight'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setGoalWeight(parseInt(text))}
                    value={goalWeight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Sex'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSex(text)}
                    value={sex}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.height}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    
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
                     <Picker.Item label="Sedentary" value='1' />
                      <Picker.Item label="Moderate" value='2' />
                      <Picker.Item label="Active" value='3' />
                      <Picker.Item label="Very Active" value='4' />
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





