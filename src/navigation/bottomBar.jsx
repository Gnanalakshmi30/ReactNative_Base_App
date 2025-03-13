import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Home from '../screens/Dashboard';
import UserList from '../screens/UserList';
import { moderateScale, width, verticalScale, horizontalScale } from '../styles/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/palette';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../contexts/ThemeContext';
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, theme, primaryColor }) => (
    <TouchableOpacity
        style={
            {
                top: width > 600 ? verticalScale(-35) : verticalScale(-30),
                justifyContent: 'center',
                alignItems: 'center',
                shadowRadius: theme.mode === "light" ? 3.5 : 7,
                elevation: theme.mode === "light" ? 5 : 6,
                shadowColor: theme.mode === "light" ? Colors.blackColor : Colors.whiteColor,
                ...styles.shadow
            }
        }
        onPress={onPress}>
        <View
            style={{
                width: width > 500 ? horizontalScale(50) : horizontalScale(50),
                height: width > 500 ? horizontalScale(50) : verticalScale(55),
                borderRadius: width > 500 ? moderateScale(35) : moderateScale(25),
                backgroundColor: primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                }}
            >
                {children}
            </View>
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    const { theme } = useContext(ThemeContext);
    let activeColors = Colors[theme.mode];
    const globalValue = useSelector((state) => state.global.value);

    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarBadgeStyle: {
                    color: Colors.whiteColor,
                    backgroundColor: Colors.redColor,
                },
                tabBarShowLabel: false,
                headerShown: false,
                animation: 'fade',
                tabBarHideOnKeyboard: true,
                tabBarPosition: width < 1200 ? 'bottom' : 'left',
                tabBarActiveTintColor: route.name == "Notification" ? Colors.whiteColor : globalValue,
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name == "User") {
                        iconName = 'account-supervisor';

                    } else if (route.name == "Home") {
                        iconName = 'view-dashboard';

                    } else if (route.name == "Account") {
                        iconName = 'account-circle';

                    } else if (route.name == "Settings") {
                        iconName = 'settings-sharp';

                    }
                    else if (route.name == "Notification") {
                        iconName = 'heart';

                    }
                    return route.name == "Notification" ?

                        <View >
                            <Ionicons name={iconName} size={width > 400 ? 30 : 25} color={Colors.whiteColor} />
                        </View>
                        :
                        <View style={{ alignItems: 'center', height: width > 400 ? verticalScale(50) : verticalScale(25), width: horizontalScale(50) }}>
                            {route.name === "Settings" ? (
                                <Ionicons name={iconName} size={width > 400 ? 50 : 25} color={focused ? globalValue : Colors.greyColor} />
                            ) : (
                                <MaterialCommunityIcons name={iconName} size={width > 400 ? 50 : 25} color={focused ? globalValue : Colors.greyColor} />
                            )}
                            <Text style={{ fontSize: width > 400 ? moderateScale(12) : moderateScale(10), color: focused ? globalValue : Colors.greyColor }}  >
                                {route.name}
                            </Text>
                        </View>
                },


                tabBarStyle: {
                    position: 'absolute',
                    bottom: verticalScale(10),
                    left: horizontalScale(20),
                    right: horizontalScale(20),
                    height: verticalScale(70),
                    elevation: 0,
                    backgroundColor: activeColors.primaryColor,
                    borderRadius: moderateScale(15),
                    marginHorizontal: width > 400 ? horizontalScale(18) : horizontalScale(20),
                    paddingTop: verticalScale(10),
                    paddingBottom: verticalScale(5),
                    shadowRadius: theme.mode === "light" ? 3.5 : 7,
                    elevation: theme.mode === "light" ? 5 : 6,
                    shadowColor: theme.mode === "light" ? Colors.blackColor : Colors.whiteColor,
                    ...styles.shadow
                },

            })}>
            <Tab.Screen name="User" component={UserList}
                options={{

                    tabBarBadge: 3,
                    tabBarBadgeStyle: {
                        backgroundColor: Colors.redColor,
                        color: Colors.whiteColor,
                        position: 'absolute',
                        top: -19,
                        left: 10,
                        textAlign: 'center',
                        fontSize: moderateScale(12),
                        padding: 1
                    },

                }}
            />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Notification" component={Profile}
                options={{
                    tabBarLabel: "",
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} theme={theme} primaryColor={globalValue} />
                    )
                }}
            />
            <Tab.Screen name="Account" component={Profile} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default Tabs;

const styles = StyleSheet.create({
    shadow: {

        shadowOffset: {
            width: 0,
            height: verticalScale(10),
        },
        shadowOpacity: 0.25,
    },
})