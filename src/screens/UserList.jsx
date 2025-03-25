import { StyleSheet, Text, View,FlatList,ScrollView,Switch,SafeAreaView } from 'react-native'
import React, { useContext,useState,useEffect,useCallback } from 'react'
import { ThemeContext } from '../contexts/ThemeContext';
import Colors from '../styles/palette';
import CustomAppbar from '../navigation/appbar';
import { horizontalScale, moderateScale, verticalScale } from '../styles/style';
import Apis from '../services/Services';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../components/loader';

const UserList = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];
    const [users, setUsers] = useState([]);
    const [startLoader, setLoader] = useState(false);

 
    useFocusEffect(
    useCallback(() => {
        getUserList(30,1);
    }, [])
);

    const getUserList = async (limit, page) => {
        try {
            setLoader(true);
            console.log("li", limit);
            console.log("pag",page);
            
           const response = await Apis.userList(limit, page);
           setUsers(response.result);
       } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to fetch users',
                position: 'top',
              });          
       }finally {
            setLoader(false);
        }

    }

    const toggleApproval = async (id, approveStatus) => {
        try {
            setLoader(true);
              const approveData = {
                        Approved: !approveStatus,
                        UserId: id,
            };
            console.log(approveData);
            
            await Apis.approveUser(approveData);
            setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === id ? { ...user, Approved: !approveStatus } : user
            )
        );
            setLoader(false);
        } catch (error) {
             setLoader(false);
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: error.message || 'An error occurred. Please try again later.',
                            position: 'top',
                        });
        }finally {
            setLoader(false);
        }
       
    };
    return (
         <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: activeColors.primaryColor, flex: 1 }}>
                    <CustomAppbar title="User list" />
                         {users == null && users.length < 0} ? 
                                ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.emptyText}>No users available</Text>
                                </View>)
                            :
                             (<FlatList
                                    data={users}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={styles.card}>
                                            <Text style={styles.title}>{item.User_Name}</Text>
                                            <Text style={styles.price}>{item.Email}</Text>
                                            <View style={styles.toggleContainer}>
                                                <Text style={[styles.toggleText, { color: item.Approved ? Colors.greenColor : Colors.redColor }]}>
                                                    { item.Approved ? "Approved" : "Disapproved"}</Text>
                                                <Switch
                                                    value={item.Approved || false}
                                                    onValueChange={() => toggleApproval(item._id,item.Approved)}
                                                />
                                            </View>
                                        </View>
                                    )}
                                    contentContainerStyle={styles.container}
                                    showsHorizontalScrollIndicator={false}
                                    ListFooterComponent={<View style={{ height: 100 }} />}
                                />)                           
            </View>
            {startLoader && <Loader />}
        </SafeAreaView>

    )
}

export default UserList

const styles = StyleSheet.create({
    container: {
        padding: moderateScale(10),
    },
    card: {
        backgroundColor: Colors.whiteColor,
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
        shadowColor: Colors.greyColor,
        shadowOpacity: moderateScale(0.2),
        shadowRadius: moderateScale(10),
        elevation: moderateScale(3),
        marginBottom: verticalScale(15),
        marginHorizontal:horizontalScale(5)
    },
    title: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        marginBottom: verticalScale(5),
    },
    price: {
        fontSize: moderateScale(16),
        color: Colors.greyColor,
        marginBottom: verticalScale(10),
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleText: {
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    
    emptyText: {
        fontSize: moderateScale(16),
        color: Colors.greyColor,
        fontWeight: 'bold',
    },
})