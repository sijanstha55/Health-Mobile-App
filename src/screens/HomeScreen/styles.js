import { blue } from '@material-ui/core/colors';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default StyleSheet.create({
   container:{
       flex: 1,
       backgroundColor: '#f2f2f2'
       
   },
   containerone:{
       flex: 0.8,
       flexDirection: 'column',
      // borderBottomRightRadius: 60,
      // borderBottomLeftRadius: 60,
       backgroundColor: '#fff',
       //borderTopRightRadius: 40,
     // borderTopLeftRadius: 40,
     margin:10,
     

   },
   containertwo:{
       flex:0.2,
       backgroundColor:'#fff',
      // borderTopRightRadius: 60,
      // borderTopLeftRadius: 60,
       
      flexDirection:'row'
   },
   empty:{
       flex: 0.05,
       backgroundColor: '#136Df3'
   },
   containeron:{
    flex:1.5,
    backgroundColor:'#fff',
   // borderTopRightRadius: 60,
   // borderTopLeftRadius: 60,
    
   flexDirection:'column',
   margin: 10,
   height:200,
   borderBottomLeftRadius:12,
   borderBottomRightRadius:12
},
  top:{
       backgroundColor: '#ecb879',
     
  },
   input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
},
button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    
},

buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},

   box1:{
       flex:1,
       backgroundColor: '#ecb879',
       borderRadius: 30,
       height: 100,
       marginTop: 10,
       marginLeft: 5,
       flexDirection: 'row'
       
   },
   one:{
       flex: 1,
       marginTop: 35
   },
   two:{
        flex: 0.5,
        
   },
   box2:{
    flex:0.9,
    backgroundColor: '#ecb879',
    borderRadius: 30,
    height: 300,
    marginTop: 10,
    marginRight: 5
      
       
       
       
   },
   height:{
        flexDirection:'row',
        flex: 1,
    
    

   },
   weight:{
    flex: 0.7,
   
   
    
   },
   weightM:{
       flex: 0.4,
       marginTop: 10,
    
   
   },
   box3:{
       flex: 0.1
   },
   box4:{
       flex: 0.5,
       color: '#fff',
       flexDirection:'row'
   },
   boxx1:{
       flex: 1
   },
   boxx2:{
       flex:1,
   },
   name:{
       fontSize: 24,
       color: '#136Df3',
       fontWeight: 'bold',
       letterSpacing: -0.5,
       marginTop: 5,
       marginLeft:15

   },
   subtitle:{
       fontSize: 20,
       color: '#136Df3',
       marginLeft: 15
   }

})