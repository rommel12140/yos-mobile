import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, LoginStyles, Colors } from './'
import {
  Platform,
} from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...LoginStyles.screen,
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  centered: {
    alignItems: 'center'
  },
  titleCart: {
	  fontWeight: 'bold',
	  fontSize: 20,
  },
  info : {
		fontSize: 16,
	},
})
