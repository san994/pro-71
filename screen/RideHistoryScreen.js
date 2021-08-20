import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class RideHistoryScreen extends Component{
    render(){
        return(
         <View style = {styles.container}>
             <Text style = {styles.textStyle}>Ride History Screen</Text>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffcc00",
        alignitem:"center",
        justifyContent:"'center"
    },
    textStyle:{
        color:"purple",
        marginLeft:560,
        marginTop:50,
        fontSize:20,
    },
})