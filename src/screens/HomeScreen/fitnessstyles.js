//Stylesheet for exercise section
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor:'#f2f2f2',
        flexDirection:'column'
    },
    containerone:{
        flex:0.5,
        marginLeft:5,
        marginRight:5,
        flexDirection:'column'
    },
    coboxone:{
        
        flex: 1,
        flexDirection:'row'
    },
    coboxtwo:{
        backgroundColor:'#fff',
        flex: 0.6,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    containertwo:{
        flex:0.3,
        marginLeft:5,
        marginRight:5,
        flexDirection:'row'
    },
    boxone:{
        flex:1,
        backgroundColor:'#ffbf80',
        alignItems:'center'
       
    },
    boxtwo:{
        flex:1,
        backgroundColor: '#b3b3ff',
       
        alignItems:'center'
       
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f2f2f2',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 16
    },
    picker: {
        height: 48,
        width: 250,
        
        
        backgroundColor: '#f2f2f2'
    },
    dialogHeader:{
        backgroundColor:'#ffbf80',
        marginTop:0,
        marginLeft:0,
        marginRight:0,
        height:30,
        textAlign:'center',
        alignItems:'center'
    },
    dialogFooter:{
        
        
        alignContent:'center',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    btone:{
        flex:0.25,
        flexDirection:'row',
    },
    bttwo:{
        flex:0.7,
        marginTop: 5,
        alignItems:'center'
        
      
    },
    

})