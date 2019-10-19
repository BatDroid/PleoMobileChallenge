
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import screens from './screens';
import Expense from '../../screens/Expense';

const AppNavigator = createStackNavigator(
    {
      [screens.expense]: Expense,
    },
    {
      initialRouteName: screens.expense,
    }
  );

  export default createAppContainer(AppNavigator);