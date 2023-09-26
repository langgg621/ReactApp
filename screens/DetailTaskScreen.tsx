
// screens/Screen1.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
            await deleteApi(userId);
            alert('Xóa sinh viên thành công');
            navigation.navigate('TaskScreen');
        } catch (err) {
            const errorMessage = err.response;
            alert(errorMessage);
        }
    }
    useEffect(() => {
      getUserById()
    }, [ userId ])

    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Thông tin chi tiết sinh viên </Text>
        <View style={styles.onF}>
          <View style={styles.item}>
            <Text style={styles.label}>Tên sinh viên: </Text>
            <Text style={styles.content}>{user?.name}</Text>
          </View>
          <View style={styles.item}>
          <Text style={styles.label}>MSSV </Text>
          <Text style={styles.content}>{user?.mssv}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Lớp </Text>
            <Text style={styles.content}>{user?.lop}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Email </Text>
            <Text style={styles.content}>{user?.email}</Text>
          </View>
          <Text style={styles.label}>Địa chỉ </Text>
          <Text style={styles.address} multiline={true} numberOfLines={1}>
            {user?.address}</Text>
        </View>
        

        <Text 
                onPress={deleteUser} 
                style={styles.customButton}>Xóa sinh viên</Text>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
      
  },
  onF:{
      marginHorizontal:20,
      marginTop:20,
  },
  item:{
    borderBottomWidth:2
  },
  mainText: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: "bold",
      textAlign:'center'
  },
  content: {
      alignItems: "flex-start",
      width: "100%",
      fontSize:16,
      borderBottomWidth:1
  },
  label: {
      marginVertical: 10,
      fontWeight:'bold',
      fontSize:16, 
      marginTop:20
  },
  address:{
    height: 100,
    borderWidth:1
  },
  customButton:{
    margin:20,
    textDecorationLine:'underline',
    color:'blue'
  }
})
export default DetailUserScreen;
