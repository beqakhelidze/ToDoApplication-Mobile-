import React from "react";
import { RNCamera } from "react-native-camera";
import { useCamera } from "react-native-camera-hooks";
import Icon from "react-native-vector-icons/Ionicons";
import RNFS from "react-native-fs";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const CameraVision = () => {

    const [{ cameraRef }, { takePicture }] = useCamera(null);

    const handleClick = async () =>{
        try {
            const data = await takePicture();
            const filePath = data.uri;
            const newFilePath = RNFS.DocumentDirectoryPath + "/Test1.jpg";
            RNFS.moveFile(filePath,newFilePath).then(() =>{
                console.log(filePath);
                console.log(newFilePath)
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                style={styles.Preview}
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
            >
                <TouchableOpacity
                    style={styles.Button}
                    onPress={handleClick}
                >
                    <Icon name="camera" size={45} color={"white"} />
                </TouchableOpacity>
            </RNCamera>

        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    Preview: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    Button: {
        position: "absolute",
        bottom: 20,
        backgroundColor:"#0080ff",
        padding:10,
        borderRadius:50,
    }
})

export default CameraVision;