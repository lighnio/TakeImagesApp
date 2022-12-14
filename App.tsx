import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  // Hooks
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [mediaLibPermission, setMediaLibPermission] = useState(false);

  // Variables
  let camera: any;

  // Functions
  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      //Starting the camera in the above line.
      setStartCamera(true);
    } else {
      Alert.alert("Access Denied");
    }
  };

  const __savePhoto = () => {
    MediaLibrary.saveToLibraryAsync(capturedImage.uri).then(() => {
      setCapturedImage(null);
    });
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const getMediaPermission = async () =>{
    const mediaPermission = await MediaLibrary.requestPermissionsAsync();
    setMediaLibPermission(mediaPermission.status === 'granted');
  }

  // Components
  const CameraPreview = ({ photo }: any) => {
    console.log(photo);
    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        >
          <Text
            onPress={__retakePicture}
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 30,
              textAlign: "center",
              backgroundColor: "transparent",
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
            }}
          >
            Re Take
          </Text>
          {mediaLibPermission ? (
            <Text
              onPress={__savePhoto}
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 30,
                backgroundColor: "transparent",
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              Save Photo
            </Text>
          ) : (
            <Text
              onPress={getMediaPermission}
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 30,
                backgroundColor: "transparent",
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              Save Photo
            </Text>
          )}
        </ImageBackground>
      </View>
    );
  };

  const __takePicture = async () => {
    // Above line validate if the camera has permissions
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
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
                  flexDirection: "row",
                  flex: 1,
                  width: "100%",
                  padding: 20,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  ></TouchableOpacity>
                </View>
              </View>
            </Camera>
          )}
        </>
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
