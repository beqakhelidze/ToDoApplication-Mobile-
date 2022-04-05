import React, { useEffect } from "react";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert
} from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { useSelector, useDispatch } from "react-redux";
import { setTasks, setTaskID } from "../Redux/Actions";

const Item = ({ Item, onPress, onDeletePress, onCheckPress }) => (

    <View
        style={styles.itemBody}
        onStartShouldSetResponder={
            () => onPress(Item.ID)}
    >
        <View style={styles.item}>
            <CheckBox
                value={Item.done}
                onValueChange={(newValue) => {
                    onCheckPress(Item.ID, newValue)
                }}
            />
            <View style={styles.item.data}>
                <Text
                    style={styles.title}
                >
                    {Item.title}
                </Text>
                <Text
                    style={styles.description}
                    numberOfLines={1}
                >
                    {Item.description}
                </Text>
                <Text
                    style={styles.date}
                    numberOfLines={1}
                >
                    {moment(Item.date).format('YYYY/MM/D hh:mm ')}
                </Text>
            </View>
        </View>
        <TouchableOpacity style={styles.delete}
            onPress={() => onDeletePress(Item.ID)}
        >
            <Icon name={"delete"} size={35} color={"red"} />
        </TouchableOpacity>
    </View>
);

const ToDo = ({ navigation }) => {

    const { tasks } = useSelector(state => state.taskReducer);

    const dispatch = useDispatch();

    useEffect(() => {

        const getTasks = async () => {

            AsyncStorage.getItem("Tasks").then((tasks) => {
                return JSON.parse(tasks);
            }).then((parsedTasks) => {
                if (parsedTasks && typeof (parsedTasks) === "object") {
                    dispatch(setTasks(parsedTasks));
                }
            })
        }

        getTasks();
    }, [])

    const editTask = (ID) => {
        dispatch(setTaskID(ID));
        navigation.navigate("Task");
    }

    const deleteTask = (ID) => {
        const filteredTasks = tasks.filter(task => task.ID !== ID);
        AsyncStorage.setItem("Tasks", JSON.stringify(filteredTasks)).then(() => {
            dispatch(setTasks(filteredTasks));
            Alert.alert("Success", "Task is succesfully removed!");
        })
    }

    const checkItem = (ID, newValue) => {
        const index = tasks.findIndex(task => task.ID === ID);
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].done = newValue;
            AsyncStorage.setItem("Tasks", JSON.stringify(newTasks)).then(() => {
                dispatch(setTasks(newTasks));
                Alert.alert("Success!", "Task is succesfully changed!");
            })
        }
    }

    const TaskHandler = () => {
        let lastID;
        if (tasks.length === 0) {
            lastID = 0;
        } else {
            lastID = tasks[tasks.length - 1].ID + 1;
        }

        dispatch(setTaskID(lastID));
        navigation.navigate("Task");
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={tasks.filter(task => task.done === false)}
                renderItem={({ item }) => <Item
                    Item={item}
                    onPress={editTask}
                    onDeletePress={deleteTask}
                    onCheckPress={checkItem}
                />}
                keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={TaskHandler}
            >
                <Icon name={"plus"} size={20} color={"#ffffff"} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    button: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0080ff',
        padding: 15,
        position: "absolute",
        bottom: 25,
        right: 25,
        borderRadius: 30,
    },
    itemBody: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 7,
        backgroundColor: "white",
        marginVertical: 15,
        marginHorizontal: 13,
        borderRadius: 10,
        elevation: 5,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        data: {
            marginLeft: 10,
        }
    },
    title: {
        fontSize: 30,
        color: "black",
    },
    description: {
        margin: 5,
        fontSize: 15,
    },
    date:{
        textAlign:"right",
        width:"100%",
    },
    delete: {
        marginRight: 10,
    }
})

export default ToDo;