
// screens/Screen1.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getByIdApi, deleteApi } from '../services/user';
import { User } from '../services/interfaces/UserService';
const DetailUserScreen = ({ navigation }) => {

    const userId = navigation.getParam("userId")

    const [user, setUser] = useState<User>()
    const getUserById = async() => {
      try {
        const { data } = await getByIdApi(userId)
        setUser(data)
      } catch(err) {
        const errorMessage = err.response
        alert(errorMessage)
      }

    }
    const deleteUser = async () => {
        try {
            // Gọi API xóa sinh viên dựa trên userId
            await deleteApi(userId);
            // Hiển thị thông báo xóa thành công hoặc xác nhận xóa
            alert('Xóa sinh viên thành công');
            // Chuyển người dùng trở lại trang danh sách sinh viên hoặc màn hình khác
            navigation.navigate('TasksScreen');
        } catch (err) {
            const errorMessage = err.response;
            alert(errorMessage);
        }
    }
    useEffect(() => {
      getUserById()
    }, [ userId ])

    return (
      <View>
        <Text>Thông tin chi tiết sinh viên </Text>
        <Text>Tên sinh viên: {user?.name}</Text>
        <Text>{user?.mssv}</Text>
        <Text>{user?.lop}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.address}</Text>

        <Button title='Xóa sinh viên' onPress={deleteUser} />
      </View>
    );
};

export default DetailUserScreen;
