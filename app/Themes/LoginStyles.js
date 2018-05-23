import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import {
    Platform,
  } from "react-native";
  
const isAndroid = Platform.OS == "android";
const viewPadding = 10;

const LoginStyles = {
  screen: {
    logo: {
        width: 300,
        resizeMode: 'contain'
    },
    textInput: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "#c4c8ce",
        backgroundColor: "#c4c8ce",
        color: 'black',
        borderWidth: isAndroid ? 0 : 1,
        width: "80%"
    },
    loginSquare: {
        backgroundColor: 'white',
        opacity: 0.80,
        height: 400,
        width: 300,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    loginHeader: {
        alignItems: 'center',
        width: '100%',
        height: 150,
    },
    loginButton: {
        marginTop: isAndroid ? 0 : 10,
        backgroundColor: '#474d56',
    },
    sectionTitleLogin: {
        ...Fonts.style.h1,
        paddingVertical: Metrics.baseMargin,
        color: '#236EFF',
        marginVertical: Metrics.smallMargin,
        textAlign: 'center',
    },
    sectionLogin: {
    ...Fonts.style.normal,
    paddingVertical: Metrics.baseMargin,
    color: 'black',
    marginVertical: Metrics.smallMargin,
    textAlign: 'center'
    },
  },
}

export default LoginStyles