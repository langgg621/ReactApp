
// screens/Screen1.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { User } from '../services/interfaces/UserService';
import { listUserApi } from '../services/user';

const TasksScreen = ({ navigation }) => {

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
            <Text style={styles.content}>{item.mssv}</Text>
            <Text style={styles.content}>{item.email}</Text>
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
                <Text style= {styles.add} onPress={() => navigation.navigate("AddTaskScreen")}>+</Text>
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
        flex: 1
    },
    taskItem: {
        backgroundColor: "#fff",
        marginBottom: 2,
        padding: 10
    },
    taskTitle: {
        fontWeight: "bold",
        marginBottom: 5,
        fontSize:20
    },
    mainTitle: {
        padding: 18,
        fontWeight: "700",
        fontSize: 22,
        textAlign:"center"
    },
    datetime: {
        alignSelf: "flex-end",
        fontSize: 18,
        color: "#bbb",
        marginTop: 5
    },
    content:{
        fontSize: 20
    },
    line:{
        margin:20,
        flexDirection: 'row',
        justifymssv: "space-between",
        alignItems: 'center', // Đảm bảo các phần tử nằm giữa hàng ngang
        justifyContent: 'space-between', // Đẩy các phần tử sang hai bên của hàng ngang
        marginBottom: 5, // Điều chỉnh khoảng cách giữa các dòng
    },
    add:{
        marginLeft:50,
        fontSize: 40,
    },
    btn:{
        width:"100%", 
        fontSize:20,
        flex: 1, 
        alignItems: 'flex-end',
        borderWidth:1,
        padding:10,
        textAlign:'center'
    },textInput:{
        fontSize:20,
        padding:10,
        width: '80%',
        borderWidth:1
    }
})

export default TasksScreen;
