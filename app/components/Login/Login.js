import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  Image, 
  View, 
  TextInput,
  Keyboard,
  Platform,
  StyleSheet,
  AppRegistry,
  SafeAreaView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { connect } from 'react-redux';

import { Images } from '../../Themes';

// Styles
import styles from '../../Themes/LoginStyles';

const viewPadding = 10;

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO: CHANGE THIS BACK
      username: 'RYB',
      password: 'RYB',
      loading : false,
    }
  }

  onChangeName(value){
    this.setState({
          username:value
    });
  }

  onChangePassword(value){
    this.setState({
          password:value
    });
  }
  
  onSubmit(){
    this.setState({loading : true});
    this.props.getAuthToken(this.state);
  }

  componentWillMount(){
    this.props.resetAuthToken()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.accept && !nextProps.fail){
      if(this.props.user.is_Staff){
        //this.props.navigation.navigate('AdminMain');
        this.setState({loading : false});
      }else{
        this.props.navigation.navigate('UserMain');
        this.setState({loading : false});
      }
    }else{
      this.setState({loading : false});
    }
  }

  render () {
    return (
        <SafeAreaView style={styles.mainContainer}>
          <Image source={Images.background} style={styles.backgroundImage} blurRadius={2}/>
          {/* <View style={styles.centered}>
                <Image source={Images.logo} style={styles.logo} height={200} weight={200} />
          </View> */}
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.loginSquare}>
              <View style={styles.loginHeader}>
                <Image source={Images.logo} style={styles.logo} height={200} weight={200} />
              </View>
                <Text style={styles.sectionLogin}>User</Text>
                <TextInput 
                  placeholder='username'
                  keyboardType='email-address'
                  keyboardAppearance='dark'
                  style={styles.textInput}
                  value={this.state.username}
                  onChangeText={(value) => this.onChangeName(value)}
                />

                <Text style={styles.sectionLogin}>Password</Text>
                <TextInput 
                  placeholder='password'
                  style={styles.textInput}
                  keyboardAppearance='dark'
                  secureTextEntry = {true}
                  onChangeText={(value) => this.onChangePassword(value)}
                />
                <Button 
                  raised
                  disabled = {this.state.loading}
                  clear = {true}
                  loading = {this.state.loading}
                  title="Log-in"
                  onPress={this.onSubmit.bind(this)}
                  buttonStyle={styles.loginButton}
                  />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      
    )
  }
}


function mapStateToProps(state) {
	return {
    token: state.Token,
    user : state.User,
    accept : state.AuthAccept,
    fail : state.AuthCheck,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
