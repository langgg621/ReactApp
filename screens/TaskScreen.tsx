
// screens/Screen1.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { User } from '../services/interfaces/UserService';
import { listUserApi } from '../services/user';

const TaskScreen = ({ navigation }) => {

    const loadTasks = async() => {
        setRefreshing(true)
        try {
            const { data } = await listUserApi()
            setTasks(data)
        } catch(err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }

    useEffect(() => {
        loadTasks()
    }, [])

    const [ tasks, setTasks ] = useState<User[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const goToDetail = (item: User) => {
        navigation.navigate("DetailTaskScreen", { userId: item.id })
    }

    const renderTask = ({ item }: { item: User }) => {
        return (
        <TouchableOpacity onPress={() => goToDetail(item)} style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.name}</Text>
            <Text >{item.mssv}</Text>
            <Text >{item.email}</Text>
        </TouchableOpacity>
        )
    }
    const handleSearch = () => {
        // Lọc danh sách sinh viên dựa trên từ khóa tìm kiếm
        const filteredTasks = tasks.filter((item) =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.mssv.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.email.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        // Cập nhật danh sách đã lọc
        setTasks(filteredTasks);
    }
    return (
        <View style={styles.container}>
            <View style ={styles.line}>
                <Text style={styles.mainTitle}>Danh sách sinh viên</Text>
                <Text style= {styles.add} onPress={() => navigation.navigate("AddUserScreen")}>+</Text>
            </View>
            <View style={styles.line}>
                <TextInput placeholder='Tìm kiếm theo tên, MSSV hoặc Email'
                 style={styles.textInput}
                 value={searchKeyword}
                    onChangeText={(text) => setSearchKeyword(text)}
                 />
                <Text style={styles.btn}onPress={handleSearch}>Tìm kiếm</Text>
            </View>
            <FlatList 
                data={tasks} 
                renderItem={(item) => renderTask(item)} 
                onRefresh={loadTasks}
                refreshing={refreshing}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
    },
    taskItem: {
        backgroundColor: "#fff",
        marginBottom: 2,
        padding: 10,
        borderBottomWidth: 1,
        marginHorizontal:10
    },
    taskTitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    mainTitle: {
        padding: 18,
        fontWeight: "700",
        fontSize: 22,
        textAlign:"center",
        width:'90%'
    },
    datetime: {
        alignSelf: "flex-end",
        color: "#bbb",
        marginTop: 5
    },
    
    line:{
        flexDirection: 'row',
        justifymssv: "space-between",
        alignItems: 'center',
    },
    add:{
        fontSize: 40,
        width:"20%"
    },
    btn:{
        width:"100%", 
        flex: 1, 
        alignItems: 'flex-end',
        borderWidth:2,
        padding:4,
        textAlign:'center',
        margin:10,
    },
    textInput:{
        padding:7,
        width: '65%',
        borderWidth:2,
         margin:10
    }
})

export default TaskScreen;
