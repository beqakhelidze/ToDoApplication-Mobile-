
import React, {useEffect} from 'react';
import GlobalStyles from '../utils/GlobalStyles';
 
import {
   Text,
   View,
   StyleSheet,
   Image,
} from 'react-native';
 
 
const Splash = ({navigation}) => {

    
    useEffect(() =>{
        setTimeout(() => {
            navigation.navigate("My Tasks")
        }, 500);
    },[])
 
   return (
     <View style={styles.body}>
       <Image source={require("../../assets/Todo.png")} />
       <Text style={{ ...styles.AplicationName, ...GlobalStyles.CustomFont}}>To-Do List</Text>
       <Text style={styles.Author}>By: Beqa Khelidze</Text>
     </View>
   );
 };
 
const styles = StyleSheet.create({
   body: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#0080ff"
   },
   AplicationName :{
     fontSize:45,
     marginTop:10,
     color:"white",
   },
   Author :{
     color:"white",
     fontSize:15,
     marginTop:5,
   }
})
 
 
export default Splash;
 