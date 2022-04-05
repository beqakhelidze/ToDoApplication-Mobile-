import React, { useState } from 'react';

import {
    Pressable,
    Text,
    StyleSheet,
} from "react-native";

const CustomButton = (props) => {

    return (
        <Pressable
            onPress={props.onPress}
            style={({ pressed }) => [{
                backgroundColor: pressed ? '#0BDA51' : '#0FFF50' ,
                ...styles.button,
                ...props.STYLE,
            }]}
        >
            <Text style={styles.text}>
                {props.title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily:"Feather",
        color:"#FFFFFF"
    },
    button:{
        padding:10,
        borderRadius:10,
    }
});


export default CustomButton;