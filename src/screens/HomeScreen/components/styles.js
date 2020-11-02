import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   container:{
       flex: 1,
       backgroundColor: '#136Df3'
       
   },
   container1:{
       flex: 0.2,
       flexDirection: 'row',
       borderBottomRightRadius: 40,
       borderBottomLeftRadius: 40,
       backgroundColor: '#fff',
       borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
   },
  
  box1:{
      flex: 1,
    
  },
  box2:{
    flex: 1,
  },
  container:{
      flex: 1,
      alignItems: 'center'
  },

   input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
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