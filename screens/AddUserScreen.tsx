
// screens/Screen1.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { User } from '../services/interfaces/UserService';
import { addUserApi } from '../services/user';

const AddUserScreen = ({ navigation }) => {

    const [ user, setUser ] = useState<User>({ 
        name: "",
        id: "", // Cung cấp giá trị mặc định cho các thuộc tính khác nếu cần
        mssv: "",
        address: "",
        email: "",
        lop: "", 
    });
    const validateInputs = () => {
        if (user.name.length < 20) {
          Alert.alert("Lỗi", "Tên sinh viên phải tối thiểu 20 ký tự");
          return false;
        }
        if (user.mssv.length < 5) {
          Alert.alert("Lỗi", "MSSV phải tối thiểu 5 ký tự");
          return false;
        }
        if (!user.email.includes("@")) {
          Alert.alert("Lỗi", "Email phải chứa ký tự @");
          return false;
        }
        return true;
      };
    const addUserAction = async() => {
        if (!validateInputs()) {
            return;
          }
        try {
            const {data} = await addUserApi(user)
            navigation.navigate("TaskScreen")
        } catch(err) {
            const message = err.response
            alert(message)
        }
    }
    const onCancel = () => {
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc chắn muốn hủy thêm mới?",
          [
            {
              text: "Hủy",
              style: "cancel",
            },
            {
              text: "Đồng ý",
              onPress: () => {
                navigation.navigate("TaskScreen");
              },
            },
          ]
        );
      };
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Thêm mới sinh viên</Text>
            <View style={styles.address}>
            <Text style={styles.label}>Tên sinh viên</Text>
            <TextInput value={user.name}  onChangeText={(value) => {
                setUser({
                    ...user,
                    name: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>MSSV</Text>
            <TextInput value={user.mssv}  onChangeText={(value) => {
                setUser({
                    ...user,
                    mssv: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>Lớp</Text>
            <TextInput value={user.lop}  onChangeText={(value) => {
                setUser({
                    ...user,
                    lop: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>Email</Text>
            <TextInput value={user.email}  onChangeText={(value) => {
                setUser({
                    ...user,
                    email: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput value={user.address}  onChangeText={(value) => {
                setUser({
                    ...user,
                    address: value
                })
            }}  style={styles.inputAdd} multiline={true}  numberOfLines={10}/>
            <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancel}>Hủy bỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSave}onPress={addUserAction}>
                <Text>Lưu lại</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20
    },
    mainText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    address: {
        alignItems: "flex-start",
        width: "100%",
        height: 100
    },
    input: {
        borderWidth: 2,
        padding: 5,
        width: "100%",
    },
    label: {
        marginVertical: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
        alignItems: "center",
    },
    buttonSave:{
        borderBottomWidth:4,
        borderRightWidth:4,
        borderWidth:1
    },
    cancel:{
        textDecorationLine:'underline',
        color:'blue'
    },
    inputAdd:{
        borderWidth:2,
        height:100,
        width:'100%',
        
    }
})

export default AddUserScreen;
