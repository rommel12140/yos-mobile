import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from './'
import {
  Platform,
} from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  logo: {
    width: 300,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "80%"
  },
    loginSquare: {
    backgroundColor: Colors.background,
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
    backgroundColor: '#236EFF',
  },
  titleCart: {
	  fontWeight: 'bold',
	  fontSize: 20,
  },
  info : {
		fontSize: 16,
	},
})
