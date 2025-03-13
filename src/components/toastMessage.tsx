import { BaseToast, ErrorToast } from 'react-native-toast-message';
import Colors from '../styles/palette';
import { moderateScale, verticalScale } from '../styles/style';


interface ToastProps {
    text1?: string;
    text2?: string;
}

export const toastConfig = {
    success: ({ text1, text2 }: ToastProps) => (
        <BaseToast
            style={{
                borderLeftColor: Colors.greenColor,
                borderLeftWidth: moderateScale(7),
                width: '90%',
                height: verticalScale(70),
                borderRightColor: Colors.greenColor,
                borderRightWidth: moderateScale(7),
            }}
            contentContainerStyle={{ paddingHorizontal: moderateScale(15) }}
            text1={text1}
            text2={text2}
            text1Style={{ fontSize: moderateScale(17), fontWeight: '700' }}
            text2Style={{ fontSize: moderateScale(14) }}
        />
    ),
    error: ({ text1, text2 }: ToastProps) => (
        <ErrorToast
            text2NumberOfLines={3}
            style={{
                borderLeftColor: Colors.redColor,
                borderLeftWidth: moderateScale(7),
                width: '90%',
                height: verticalScale(70),
                borderRightColor: Colors.redColor,
                borderRightWidth: moderateScale(7),
            }}
            contentContainerStyle={{ paddingHorizontal: moderateScale(15) }}
            text1={text1}
            text2={text2}
            text1Style={{ fontSize: moderateScale(17), fontWeight: '700' }}
            text2Style={{ fontSize: moderateScale(14) }}
        />
    ),
};
