//This was initiallly designed for profile but now using for goals.
//Will be used as profile in future
import React, { useState, Component,useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View ,Dimensions} from 'react-native'

import Goals from './goals'
export default function profile(){
    return (
   
        <Goals /> //calling goal component
    

    );
  }