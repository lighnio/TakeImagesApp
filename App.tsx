import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  let camera: any;
  const [startCamera, setStartCamera] = React.useState(false);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      //Starting the camera in the above line.
      setStartCamera(true);
    } else {
      Alert.alert("Access Denied");
    }
  };

  const __takePicture = async () => {
    console.log("TAKING PICTUREEEE");
    
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera
          style={{ flex: 1, width: "100%" }}
          ref={(r) => {
            camera = r;
          }}
        >

          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 20,
              justifyContent: 'space-between'
            }}>
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center'
                }}>

                  <TouchableOpacity
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: '#fff'
                    }}>

                  </TouchableOpacity>

              </View>

          </View>

        </Camera>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take Picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
