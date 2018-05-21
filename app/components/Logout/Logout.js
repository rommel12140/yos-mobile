import React from 'react';
import { Icon } from 'react-native-elements';
import { withNavigation, NavigationActions } from 'react-navigation';

class Logout extends React.Component {
  render() {
    return <Icon 
                name='exit-to-app'
                size= {35}
                color= 'blue' 
                containerStyle={{paddingRight:10}}
                type='MaterialCommunityIcons' 
                title="Logout" 
                onPress={() => { this.props.navigation.navigate('Login') }} />;
  }
}

export default withNavigation(Logout);
