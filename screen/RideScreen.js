import React,{Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,TextInput,ImageBackground,Image } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import db from '../config';

const bgImage  = require("../assets/background2.png")
const bicycleImage  = require("../assets/bicycle.png")
const appIconImage  = require("../assets/appIcon.png")

export default class RideScreen extends Component{
    constructor(){
        super()
        this.state = {
            domState:'normal',
            hasCameraPermission:null,
            scanned:false,
            userId:'',
            bicycleId:''
        }
    }

    getCameraPermisson = async(domState)=>{
      const{status} = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
          hasCameraPermission:status === "granted",
          domState:domState,
          scanned:false
      })
    }

    handleBarcodeScanned =async({type,data})=>{
        const{domState}=this.state
     if(domState==="bicycleId"){
      this.setState({
          domState:"bicycleId",
          scanned:true,
          bicycleId:data
      })
     }
     if(domState==="userId"){
        this.setState({
            domState:"userId",
            scanned:true,
            userId:data
        })
     }
    }

    handleTransaction = ()=>{
      var{bicycleId} = this.state
     db.collection('bike')
      .doc(bicycleId)
      .get()
      .then(doc=>{
        var bike = doc.data()
        if(bike.is_bike_available){
          this.assignBike()
        }else{
          this.returnBike()
        }
      })
    }

    assignBike =()=>{
      alert("bike is assigned to you for 1 hour")
    
    } 

    returnBike =()=>{
      alert("hope you enjoy your ride")
    }

    render(){
       const{domState,hasCameraPermission,scanned,scannedData,userId,bicycleId} = this.state
          if(domState !== "normal"){
              return(
                  <BarCodeScanner
                    onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned}
                  />
              )
          }
        return(
         <View style = {styles.container}>
            <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={styles.upperContainer}>
            <Image source={appIconImage} style={styles.appIconImage} />
          </View>
          <View style = {styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput
                style={styles.textinput}
                placeholder={"user Id"}
                placeholderTextColor={"#FFFFFF"}
                value={userId}
                onChangeText={text => this.setState({userId:text})}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("bookId")}
              >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <TextInput
                style={styles.textinput}
                placeholder={"bicycle Id"}
                placeholderTextColor={"#FFFFFF"}
                value={bicycleId}
                onChangeText={text => this.setState({bicycleId:text})}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("studentId")}
              >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
    
           
             <TouchableOpacity style = {styles.buttonStyle}
              onPress = {()=>this.handleTransaction()}>
              <Text style = {styles.buttonText}>Submit</Text>
            </TouchableOpacity> 
     
     </View>
     </ImageBackground>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      upperContainer: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center"
      },
      appIconImage: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginTop: 80
      },
      lowerContainer: {
        flex: 0.4,
        alignItems: "center"
      },
      textinputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: "#9DFD24",
        borderColor: "#FFFFFF"
      },
      textinput: {
        width: "57%",
        height: 50,
        padding: 10,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 3,
        fontSize: 18,
        backgroundColor: "#5653D4",
        fontFamily: "Rajdhani_600SemiBold",
        color: "#FFFFFF"
      },
      scanbutton: {
        width: 100,
        height: 50,
        backgroundColor: "#9DFD24",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center"
      },
      scanbuttonText: {
        fontSize: 24,
        color: "#0A0101",
        fontFamily: "Rajdhani_600SemiBold"
      }
})