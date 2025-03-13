import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale, width } from '../styles/style';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Colors from '../styles/palette';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../components/loader';
import Toast from "react-native-toast-message";
import Apis from '../services/Services';
import CommonData from '../components/commonData';

const data = [
    { label: 'Admin', value: '1' },
    { label: 'User', value: '2' },

];

const Register = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [hideBottomImage, setBottomImageHide] = useState(true);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [userType, setUserType] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [startLoader, setLoader] = useState(false);

    const handleSignIn = () => {
        navigation.navigate("Login");
    }

    const handleRegistration = async () => {
        try {
            setErrorMessage('');

            if (!userName.trim()) {
                setErrorMessage('Name cannot be empty');
                return;
            } else if (!email.trim()) {
                setErrorMessage('Email cannot be empty');
                return;
            } else if (!CommonData.emailReg.test(email.trim())) {
                setErrorMessage('Enter valid email address');
                return;
            }
            else if (!password.trim()) {
                setErrorMessage('Password cannot be empty');
                return;
            } else if (!CommonData.passwordReg.test(password.trim())) {
                setErrorMessage('Password does not match the format.');
                return;
            }
            else if (!userType.trim()) {
                setErrorMessage('Select role');
                return;
            } else {
                setLoader(true);
                const userData = {
                    Email: email,
                    Password: password,
                    User_Name: userName,
                    User_Role: userType
                };
                const res = await Apis.register(userData);

                setEmail('');
                setPassword('');
                setUserName('');
                setUserType('');

                setLoader(false);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Registration completed successfully, kindly login.',
                    position: 'top',
                });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        } catch (error) {
            setLoader(false);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'An error occurred while logging in. Please try again later.',
                position: 'top',
            });

        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={styles.topImageContainer}>
                                <Image source={require("../assets/images/TopWave.png")} style={styles.topImage} />
                            </View>
                            <Text style={styles.createAccText}>Create account</Text>

                            <View style={styles.inputContainer}>
                                <AntDesign name={"user"} style={styles.inputIcon} />
                                <TextInput style={styles.inputText} placeholder='Name'
                                    value={userName}
                                    onChangeText={text => {
                                        setErrorMessage('');
                                        return setUserName(text);
                                    }}
                                    returnKeyType="next"
                                    onFocus={() => setBottomImageHide(false)}
                                    onBlur={() => setBottomImageHide(true)}
                                    onSubmitEditing={() => {
                                        return Keyboard.dismiss();
                                    }}
                                ></TextInput>
                            </View>
                            {errorMessage != null && errorMessage.toLowerCase().includes("name") ? (
                                <View style={styles.errorTextContainer}>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            ) : null}
                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name={"email"} style={styles.inputIcon} />
                                <TextInput style={styles.inputText} placeholder='Email'
                                    value={email}
                                    onChangeText={text => {
                                        setErrorMessage('');
                                        return setEmail(text);
                                    }}
                                    onFocus={() => setBottomImageHide(false)}
                                    onBlur={() => setBottomImageHide(true)}
                                    returnKeyType="next"
                                    onSubmitEditing={() => Keyboard.dismiss()}></TextInput>
                            </View>
                            {errorMessage != null && errorMessage.toLowerCase().includes("email") ? (
                                <View style={styles.errorTextContainer}>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            ) : null}
                            <View style={styles.infoTextContainer}>
                                <MaterialCommunityIcons name={"information"} style={styles.infoIcon} />
                                <Text style={styles.infoText}>Password - minimum 8 digits (Eg:Welcome@1)</Text>
                            </View>

                            <View style={styles.passInputContainer}>
                                <MaterialCommunityIcons name={"lock"} style={styles.inputIcon} />
                                <TextInput
                                    secureTextEntry={isPasswordSecure}
                                    style={styles.inputText} placeholder='Password'
                                    value={password}
                                    returnKeyType="done"
                                    onChangeText={text => {
                                        setErrorMessage('');
                                        return setPassword(text);
                                    }}
                                    onFocus={() => setBottomImageHide(false)}
                                    onBlur={() => setBottomImageHide(true)}
                                    onSubmitEditing={() => Keyboard.dismiss()}

                                />
                                <TouchableOpacity onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}>
                                    <MaterialCommunityIcons
                                        name={isPasswordSecure ? "eye-off" : "eye"}
                                        size={moderateScale(20)}
                                        color={Colors.greyColor}
                                        style={{ marginRight: horizontalScale(15) }}
                                    />
                                </TouchableOpacity>
                            </View>
                            {errorMessage != null && errorMessage.toLowerCase().includes("password") ? (
                                <View style={styles.errorTextContainer}>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            ) : null}
                            <View style={styles.inputContainer}>
                                <Dropdown
                                    style={[styles.dropdown]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    search
                                    maxHeight={verticalScale(300)}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Select role' : '...'}
                                    searchPlaceholder="Search..."
                                    value={userType}
                                    onFocus={() => {
                                        setBottomImageHide(false);
                                        return setIsFocus(true);
                                    }}
                                    onBlur={() => {
                                        setBottomImageHide(true);
                                        return setIsFocus(false);
                                    }}
                                    onChange={item => {
                                        setUserType(item.value);
                                        setIsFocus(false);
                                    }}
                                    onSubmitEditing={handleRegistration}

                                />
                            </View>
                            {errorMessage != null && errorMessage.toLowerCase().includes("role") ? (
                                <View style={styles.errorTextContainer}>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            ) : null}
                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Sign up</Text>
                                <TouchableOpacity onPress={handleRegistration}>
                                    <LinearGradient colors={[Colors.lightSeaGreenColor, Colors.dodgerBlueColor,]} style={styles.linearGradient}>
                                        <MaterialCommunityIcons name={"arrow-right"} style={styles.rightArrowIcon} />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signInContainer}>
                                <TouchableOpacity onPress={handleSignIn}>
                                    <Text style={styles.dontHaveText}>Already have account?
                                        <Text style={styles.signInText}> Sign in</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>

                    </ScrollView>
                    {hideBottomImage && (
                        <View style={styles.bottomImageContainer}>
                            <Image source={require("../assets/images/BottomWave.png")} style={styles.bottomImage} />
                        </View>
                    )}
                </View>
            </SafeAreaView>
            {startLoader && <Loader />}
        </KeyboardAvoidingView>


    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whitesmoke,
        flex: 1
    },
    topImageContainer: {
        height: width > 600 ? verticalScale(70) : verticalScale(100),

    },
    topImage: {
        flex: 1,
    },

    createAccText: {
        textAlign: "center",
        fontSize: moderateScale(23),
        fontWeight: "bold",
        color: Colors.blackColor,
        marginBottom: verticalScale(20),
        marginTop: verticalScale(30),

    },

    inputContainer: {
        backgroundColor: Colors.whiteColor,
        flexDirection: "row",
        borderRadius: moderateScale(15),
        marginHorizontal: horizontalScale(40),
        elevation: moderateScale(10),
        marginVertical: verticalScale(10),
        alignItems: "center",
        height: verticalScale(60),

    },
    passInputContainer: {
        backgroundColor: Colors.whiteColor,
        flexDirection: "row",
        borderRadius: moderateScale(15),
        marginHorizontal: horizontalScale(40),
        elevation: moderateScale(10),
        marginBottom: verticalScale(10),
        marginTop: verticalScale(3),
        alignItems: "center",
        height: verticalScale(60),

    },
    inputIcon: {
        marginLeft: horizontalScale(15),
        fontSize: moderateScale(20),
        color: Colors.greyColor

    },
    inputText: {
        flex: 1,
        fontSize: moderateScale(14),
        marginLeft: horizontalScale(10),
    },


    signUpContainer: {
        marginTop: verticalScale(30),
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "90%"

    },
    signUpText: {
        marginRight: horizontalScale(10),
        color: Colors.blackColor,
        fontSize: moderateScale(18),
        fontWeight: "bold"

    },
    rightArrowIcon: {
        fontSize: moderateScale(20),
        color: Colors.whiteColor,

    },
    linearGradient: {
        height: verticalScale(35),
        width: horizontalScale(55),
        borderRadius: moderateScale(17),
        alignItems: "center",
        justifyContent: "center"
    },
    bottomImage: {
        height: verticalScale(200),
        width: horizontalScale(400),
    },
    bottomImageContainer: {
        position: "absolute",
        bottom: 0
    },

    signInText: {
        fontWeight: "bold",
        fontSize: moderateScale(18),
        color: Colors.blackColor

    },
    dontHaveText: {
        color: Colors.blackColor,
        fontSize: moderateScale(17),
    },
    signInContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(30)
    },
    dropdown: {
        flex: 1,
        paddingHorizontal: horizontalScale(15)
    },

    placeholderStyle: {
        fontSize: moderateScale(14),
        color: Colors.greyColor
    },
    selectedTextStyle: {
        fontSize: moderateScale(14),
    },
    iconStyle: {
        marginLeft: horizontalScale(15),
        color: Colors.greyColor
    },
    inputSearchStyle: {
        height: verticalScale(40),
        fontSize: moderateScale(14),
    },
    errorTextContainer: {
        height: verticalScale(20),
        marginHorizontal: horizontalScale(45),
    },
    errorText: {
        fontSize: moderateScale(14),
        color: Colors.redColor
    },
    infoTextContainer: {
        flexDirection: "row",
        alignSelf: 'flex-end',
        marginHorizontal: horizontalScale(40),
        marginTop: verticalScale(5),
    },
    infoIcon: {
        fontSize: moderateScale(15),
        color: Colors.dodgerBlueColor
    },
    infoText: {
        textAlign: 'right',
        fontSize: moderateScale(10),
        color: Colors.royalBlueColor,
        marginLeft: horizontalScale(5),
        marginBottom: verticalScale(1)

    }

})