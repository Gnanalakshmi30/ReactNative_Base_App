import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, SafeAreaView, Alert, ImageBackground } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale, width } from '../styles/style';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Colors from '../styles/palette';
import React, { useState, useEffect } from 'react';
import Toast from "react-native-toast-message";
import Apis from '../services/Services';
import CommonData from '../components/commonData';
import Loader from '../components/loader';
import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { OAUTH_WEB_CLIENT_ID } from '@env';

const Login = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [startLoader, setLoader] = useState(false);


    useEffect(() => {
        GoogleSignin.configure({
            webClientId: OAUTH_WEB_CLIENT_ID,
        });
    }, [])  

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
             console.log("Google Sign-In Response", response);
            if (response && response.user) {
               console.log("User Info:", response.user);
            Alert.alert("Google Sign-In", JSON.stringify(response.user, null, 2));
            } else {
           console.log("Sign-in was canceled by the user.");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert("Sign-in already in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert("Play Services not available");
            } else {
                Alert.alert("Sign-in error", error.message);
            }
        }
    }

    const handleRegister = () => {
        navigation.navigate("Register");
    }
    const handleLogin = async () => {
        try {
            setErrorMessage('');
            if (!email.trim()) {
                setErrorMessage('Email cannot be empty');
                return;
            } else if (!CommonData.emailReg.test(email.trim())) {
                setErrorMessage('Enter valid email address');
                return;
            }
            else if (!password.trim()) {
                setErrorMessage('Password cannot be empty');
                return;
            } else {
                setLoader(true);
                const userData = {
                    Email: email,
                    Password: password,
                };
                const res = await Apis.login(userData);

                await RNSecureStorage.setItem('jwtToken', res.token, {
                    accessible: ACCESSIBLE.WHEN_UNLOCKED,
                });

                await RNSecureStorage.setItem('userId', res.userId, {
                    accessible: ACCESSIBLE.WHEN_UNLOCKED,
                });

                await RNSecureStorage.setItem('userRole', res.role.toString(), {
                    accessible: ACCESSIBLE.WHEN_UNLOCKED,
                });
                setEmail('');
                setPassword('');

                setLoader(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabs' }],
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
                <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                    <ImageBackground
                        source={require("../assets/images/BgImage.png")}
                        style={styles.bottomImage}
                        resizeMode="cover"
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}>


                            <Text style={[{ color: Colors.blackColor }, styles.welcomeText]}>Welcome</Text>
                            <Text style={[{ color: Colors.blackColor }, styles.signInTitle]}>Sign in to your account</Text>

                            <View style={styles.inputContainer}>
                                <MaterialCommunityIcons name={"email"} style={styles.inputIcon} />
                                <TextInput style={styles.inputText} placeholder='Email'
                                    value={email}
                                    onChangeText={text => {
                                        setErrorMessage('');
                                        return setEmail(text);
                                    }}
                                    returnKeyType="next"
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                ></TextInput>
                            </View>
                            {errorMessage != null && errorMessage.toLowerCase().includes("email") ? (
                                <View style={styles.errorTextContainer}>
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                </View>
                            ) : null}
                            <View style={styles.inputContainer}>
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
                                    onSubmitEditing={handleLogin}

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
                            <Text style={[{ color: Colors.greyColor }, styles.forgotPass]}>Forgot password ?</Text>
                            <View style={styles.signInContainer}>
                                <Text style={[{ color: Colors.blackColor }, styles.signInText]}>Sign in</Text>
                                <TouchableOpacity onPress={handleLogin}>
                                    <LinearGradient colors={[Colors.lightSeaGreenColor, Colors.dodgerBlueColor,]} style={styles.linearGradient}>
                                        <MaterialCommunityIcons name={"arrow-right"} style={styles.rightArrowIcon} />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.signUpContainer}>
                                <TouchableOpacity onPress={handleRegister} style={{ elevation: 1 }}>
                                    <Text style={[{ color: Colors.blackColor }, styles.dontHaveText]}>Dont have account?
                                        <Text style={[{ color: Colors.blackColor }, styles.signUpText]}> Sign up</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.otherOptionTextContainer}>
                                <Text style={styles.otherOptionText}>Or sign in to your account by choosing an option below:</Text>
                            </View>
                            <TouchableOpacity onPress={onGoogleButtonPress} >
                                <View style={styles.otherMethodContainer}>
                                    <MaterialCommunityIcons name={"google"} style={styles.signInMethodIcon} />
                                    <Text style={styles.signInMethodText}>Sign in with Google</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity  >
                                <View style={styles.otherMethodContainer}>
                                    <FontAwesome6 name={"mobile-screen"} style={styles.signInMethodIcon} />
                                    <Text style={styles.signInMethodText}>Sign in with Mobile number</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity >
                                <View style={styles.otherMethodContainer}>
                                    <MaterialCommunityIcons name={"email-check"} style={styles.signInMethodIcon} />
                                    <Text style={styles.signInMethodText}>Sign in with OTP</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </ImageBackground>
                </View>


            </SafeAreaView>
            {startLoader && <Loader />}

        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whitesmoke,
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: verticalScale(200)
    },
    topImageContainer: {
        height: width > 600 ? verticalScale(70) : verticalScale(100),

    },
    topImage: {
        flex: 1,
    },

    welcomeText: {
        textAlign: "center",
        fontSize: moderateScale(30),
        fontWeight: "bold",
        marginTop: verticalScale(95),
    },

    signInTitle: {
        marginTop: verticalScale(10),
        textAlign: "center",
        fontSize: moderateScale(20),
        marginBottom: verticalScale(20)
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
    forgotPass: {
        marginTop: verticalScale(5),
        textAlign: "right",
        fontSize: moderateScale(15),
        width: "90%"
    },

    signInContainer: {
        marginTop: verticalScale(30),
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "90%"

    },
    signInText: {
        marginRight: horizontalScale(10),
        fontSize: moderateScale(18),
        fontWeight: "bold"
    },
    rightArrowIcon: {
        fontSize: moderateScale(20),
        color: Colors.blackColor,

    },
    linearGradient: {
        height: verticalScale(35),
        width: horizontalScale(55),
        borderRadius: moderateScale(17),
        alignItems: "center",
        justifyContent: "center"
    },
    bottomImage: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
    },
    bottomImageContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },

    signUpText: {
        fontWeight: "bold",
        fontSize: moderateScale(18),
    },
    dontHaveText: {
        fontSize: moderateScale(17),
    },
    signUpContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(40)
    },
    errorTextContainer: {
        height: verticalScale(20),
        marginHorizontal: horizontalScale(45),
    },
    errorText: {
        fontSize: moderateScale(14),
        color: Colors.redColor
    },
    otherOptionTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(10)
    },
    otherOptionText: {
        color: Colors.greyColor,
        fontSize: moderateScale(15),
    },
    otherMethodContainer: {
        flexDirection: "row",
        marginHorizontal: horizontalScale(50),
        marginTop: verticalScale(20),
        backgroundColor: Colors.whiteColor,
        elevation: moderateScale(10),
        borderRadius: moderateScale(12),
        zIndex: 2,
        paddingHorizontal: horizontalScale(6),
        paddingVertical: verticalScale(10),
    },
    signInMethodIcon: {
        fontSize: moderateScale(30),
        paddingLeft: horizontalScale(5),
        color: Colors.greyColor
    },
    signInMethodText: {
        fontSize: moderateScale(17),
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: horizontalScale(40),
        paddingTop: verticalScale(5),
        color: Colors.greyColor
    }

})