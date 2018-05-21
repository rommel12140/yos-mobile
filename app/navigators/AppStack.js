import Login from '../components/Login/Login';
//import MainApp from '../containers/AppContainer';
import UserApp from '../containers/UserAppContainer';
import { createSwitchNavigator } from 'react-navigation';

const StackNavigate = createSwitchNavigator({
    Login: Login,
    //AdminMain : MainApp,
    UserMain : UserApp,
  },{
    initialRouteName : 'Login',
    headerMode : 'none',
  });

export default StackNavigate;
  