import React, { useEffect, useState } from "react";
import CustomButton from "../Components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from '@react-native-community/checkbox';
import Icon from "react-native-vector-icons/Ionicons";
import PushNotification from "react-native-push-notification";
import DatePicker from 'react-native-date-picker'
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    Alert,
    TouchableOpacity,
    Modal,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { setTasks, setTaskID } from "../Redux/Actions";

const Task = ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [done, setDone] = useState(false);
    const [openModal, setModal] = useState(false);
    const [time, changeTime] = useState(false);
    const [selectedDate, setDate] = useState(new Date(Date.now()));
    const dispatch = useDispatch();
    const { tasks, taskID } = useSelector(state => state.taskReducer);

    useEffect(() => {
        getTask();
        CreateChannel();
    }, []);

    const setNotification = (newDate,title,description) => {

        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            title: title,
            message: description,
            date: newDate,
            allowWhileIdle: true
        })
    };

    const CreateChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "test-channel",
                channelName: "test-channel",
            }
        )
    }

    const getTask = () => {
        const Task = tasks.find(task => task.ID === taskID);
        if (Task) {
            setTitle(Task.title);
            setDescription(Task.description);
            setDone(Task.done);
            setDate(new Date(Task.date));
        }
    }

    const HandleClick = () => {
        if (title.length == 0) {
            Alert.alert("Warning!", "Please write your task title!")
        } else {
            try {
                var Task = {
                    ID: taskID,
                    title: title,
                    description: description,
                    done: done,
                    date: selectedDate,
                }

                const index = tasks.findIndex(task => task.ID === taskID);
                let newTasks = [];

                if (index > -1) {
                    newTasks = [...tasks];
                    newTasks[index] = Task;
                } else {
                    newTasks = [...tasks, Task];
                }
                setNotification(selectedDate,title,description);
                AsyncStorage.setItem("Tasks", JSON.stringify(newTasks)).then(() => {
                    dispatch(setTasks(newTasks));
                    Alert.alert("Success!", "Task saved succesfully!");
                    navigation.navigate("ToDo");
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.body}>
            <DatePicker
                modal
                open={openModal}
                date={selectedDate}
                mode="datetime"
                minimumDate={new Date(Date.now())}
                onConfirm={(date) => {
                    setModal(false);
                    setDate(date);
                }}
                onCancel={() => {
                    setModal(false)
                }}
            />
            <TextInput
                placeholder="title"
                value={title}
                style={styles.input}
                onChangeText={(value) => setTitle(value)}
            />
            <TextInput
                placeholder="Description"
                value={description}
                style={styles.input}
                onRequestClose={() => { console.log("daxure") }}
                onChangeText={(value) => setDescription(value)}
                multiline
            />
            <TouchableOpacity
                style={styles.modalView.Buttons.Button}
                onPress={() => {
                    setModal(true);
                }}
            >
                <Icon name="alarm-outline" size={30} color={"white"} />
            </TouchableOpacity>
            <View style={styles.checkView}>
                <CheckBox
                    value={done}
                    onValueChange={(newValue) => {
                        setDone(newValue);
                    }}
                />
                <Text style={styles.checkView.text}>Done</Text>
            </View>
            <CustomButton
                title={"Save Task"}
                STYLE={{ margin: 15 }}
                onPress={HandleClick}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        padding: 30,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 10,
        backgroundColor: "#ffffff",
        fontSize: 20,
        margin: 15,
    },
    checkView: {
        flexDirection: "row",
        text: {
            fontSize: 22,
        }
    },
    CustomButton: {
        backgroundColor: '#0080ff',
        width: "100%",
        borderRadius: 5,
        padding: 6,
        alignItems: "center",
    },
    centeredView: {
        backgroundColor: "#00000099",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 300,
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        input: {
            borderWidth: 1,
            width: 40,
            borderRadius: 5,
            fontSize: 20,
            padding: 6,
        },
        Buttons: {
            flexDirection: "row",
            Button: {
                backgroundColor: "#0080ff",
                width: "100%",
                borderRadius:6,
                alignItems:"center",
            }
        }
    }
})

export default Task;