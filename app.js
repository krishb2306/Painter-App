import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Modal, Image,Platform,Pressable,TouchableOpacity, Switch,SafeAreaView, View, LogBox} from 'react-native';
import ExpoDraw from 'expo-draw'
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import { ColorPicker } from 'react-native-color-picker'
import { circle } from 'react-native/Libraries/Animated/Easing';

LogBox.ignoreAllLogs();

export default function App() {
  const[settings, setSettings] = useState(false)
  const[colorPattern, setColor] = useState({color: "#a4c647"})
  const[previousColor, setPrevColor] = useState({color: "#a4c647"})
  const[previousWidth, setWidth] = useState(4)
  const[range, setRange] = useState(4)
  const[type, setType] = useState("P")
  const[circleCount, setCircle] = useState(0)
  const[brushCount, setBrush] = useState(1)
  const[eraserCount, setEraser] = useState(0)
  const[rectCount, setRect] = useState(0)
  const [isOn, setOn] = useState(false);
  

  function toggleSwitch() {
    setColor(eraserCount%2 == 0 ? {color: "white"}: {color: previousColor.color} )
    setRange(previousWidth)
    setBrush(eraserCount%2 == 0 ? 2 : 1)
  }

  return (
    
  <View style={styles.container}>
    
    <SafeAreaView style = {styles.safeAreaStyle}>
    <View style = {styles.header}>
    <TouchableOpacity
        style = {styles.settingStyle} 
        onPress={() => {setSettings(true)}}
      >
      <Image
      style= {{
        width: 30,
        height: 30
      }}
      source = {
        require('./assets/gear2.png')
      }
      >
      
      </Image>
            </TouchableOpacity>
    </View>
    
    <View style = {styles.paintCont}>

  <ExpoDraw
  strokes={[]}
  containerStyle={{borderRadius: 25,  width: "90%", backgroundColor: 'white'}}
  //rewind={(undo) => {this._undo = undo}}
  //clear={(clear) => {this._clear = clear}}
  color={colorPattern.color}
  strokeWidth={range}
  enabled={true}
  type = {type}
  //onChangeStrokes={(strokes) => console.log(strokes)}
/>

</View>
<Modal
          animationType="slide"
          transparent={true}
          visible={settings}
        >
           <View style={styles.centeredView}>
            <View style={styles.settingsView}>



            <View style = {styles.settingsDivider}>
            <TouchableOpacity
              style = {styles.pauseCloseButton} 
        
              onPress={() => {setSettings(false)}}
              >
          <Text style = {{color: "white"}}>x</Text>
            </TouchableOpacity>
            <TouchableOpacity
        style = {{
        backgroundColor: "white",
        width: "25%",
        height: Platform.OS == "android"? "100%" : "70%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        margin: 10,}} 

        onPress={() => {setColor({color: "#a4c647"})}}
        disabled = {eraserCount%2 == 0 ? false :true}
      >
      <Image
      style= {{
        width: 30,
        height: 30
      }}
      source = {
        require('./assets/color.png')
      }
      >
      
      </Image>
            </TouchableOpacity>

            <TouchableOpacity
        style = {{
        backgroundColor: colorPattern.color,
        width: "60%",
        height: Platform.OS == "android"? "100%" : "70%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        margin: 10,}} 
        disabled = {true}
      >
            </TouchableOpacity>
      </View>

      <ColorPicker
              onColorSelected={color => {eraserCount%2 == 0 ? [setPrevColor({color}), setWidth(range), setColor({color})]: setColor({color: "white"})}}
              style={{width: 220, height: 220}}
              hideSliders = {false}
              defaultColor = {colorPattern.color}
              />

    <View style = {styles.rowDivider}>
    <TouchableOpacity
        style = {{
        backgroundColor: "white",
        width: "20%",
        height: Platform.OS == "android"? "106%" : "90%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: circleCount%2 == 0 ? "black" :"blue",
        borderRadius: 15,
        margin: 10,}} 

        onPress={() => {setType("C"); setCircle(circleCount + 1); setRect(0); setBrush(0);setEraser(0); setRange(4)}}
        disabled = {circleCount%2 == 0 && eraserCount%2 == 0 ? false :true}
      >
      <Image
      style= {{
        width: 30,
        height: 30
      }}
      source = {
        require('./assets/circle.png')
      }
      >
      
      </Image>
            </TouchableOpacity>

      <TouchableOpacity
        style = {{
        backgroundColor: "white",
        width: "20%",
        height: Platform.OS == "android"? "106%" : "90%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: rectCount%2 == 0 ? "black" :"blue",
        borderRadius: 15,
        margin: 10,}} 

        onPress={() => {setType("R"); setRect(rectCount + 1); setBrush(2);setRange(4); setEraser(0); setCircle(0)}}
        disabled = {rectCount%2 == 0 && eraserCount%2 == 0 ? false :true}
      >
      <Image
      style= {{
        width: 30,
        height: 30
      }}
      source = {
        require('./assets/rect.png')
      }
      >
      
      </Image>
            </TouchableOpacity>

    <TouchableOpacity
        style = {{
        backgroundColor: "white",
        width: "20%",
        height: Platform.OS == "android"? "106%" : "90%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: brushCount%2 == 0 ? "black" :"blue",
        borderRadius: 15,
        margin: 10,}} 

        onPress={() => {setType("P"); setBrush(brushCount + 1); setRange(previousWidth); setCircle(0);setRect(0); setEraser(0)}}
        disabled = {brushCount%2 == 0 && eraserCount%2 == 0 ? false : true}
      >
      <Image
      style= {{
        width: 30,
        height: 30
      }}
      source = {
        require('./assets/brush.png')
      }
      >
      
      </Image>
            </TouchableOpacity>
    <TouchableOpacity
        style = {{
        backgroundColor: "white",
        width: "20%",
        height: Platform.OS == "android"? "106%" : "90%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: eraserCount%2 == 0 ? "black" :"blue",
        borderRadius: 15,
        margin: 10,}} 

        onPress={() => {toggleSwitch(); setType("P"); setEraser(eraserCount+1);setRect(0); setCircle(0)}}
      >
      <Image
      style= {{
        width: 30,
        height: 30
      }}
      source = {
        require('./assets/eraser.png')
      }
      >
      
      </Image>
            </TouchableOpacity>
              </View>
              <View style = {styles.rowDivider}>
              <TouchableOpacity
        style = {{
        backgroundColor: "white",
        width: "25%",
        height: Platform.OS == "android"? "106%" : "90%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        margin: 10,}} 

        onPress={() => {setRange(4); setWidth(4)}}
        //disabled ={true}
      >
      <Image
      style= {{
        width: 30,
        height: 30
      }}
      source = {
        require('./assets/stroke.png')
      }
      >
      
      </Image>
            </TouchableOpacity>
              <View style = {styles.sliderSpace}>
    <Slider
      style={{marginTops:25, width: 180, height: 40, justifyContent: "center", alignContent: "center" }}
      onValueChange = {value => {setRange(value); setWidth(value)}}
      step = {1}
      minimumValue={1}
      value = {range}
      maximumValue={100}
      minimumTrackTintColor="#3478F6"
      maximumTrackTintColor="#E3E3E5"
      />
      <Text>{range}</Text>
      </View>
              </View>
            
          </View>
          </View>
        </Modal>
</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424C55',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  },
  paintCont: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: "#424C55",
    flexDirection: "column"
  },
  buttonCont: {
    flex: 0.2, 
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    flex: 0.07,
    //backgroundColor: "red",
    marginTop: Platform.OS == "android" ? 25 :0,
    width: "96%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  settingStyle: {
    //backgroundColor: "red",
    width: "10%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "white",
    width: "25%",
    height: "25%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  safeAreaStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    flexDirection: "column"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22
  },
  settingsDivider: {
    //backgroundColor: "red",
    flex: 0.5,
    marginBottom: "10%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  rowDivider: {
    //backgroundColor: "red",
    flex: 0.4,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%"
  },
  settingsView: {
    //marginTop: "100%",
    height: "65%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 50
  },
  instructModalButton: {
    borderRadius: 20,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#C95D63",
  },
  modalButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#450920",
    fontWeight: "bold"
  },
  modalButtonCont: {
    width: "43%",
    //backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    
  },
  sliderSpace: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "android" ? 10 :0,
  },
  pauseCloseButton: {
    backgroundColor: "grey",
    height: 27,
    width: 27,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 27/2,
    alignSelf: "flex-end",
    position: "absolute",
    left: "100%",
    bottom: "100%"  
  },
});
