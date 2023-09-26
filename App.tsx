import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TaskScreen from './screens/TaskScreen';
import AddUserScreen from './screens/AddUserScreen';
import DetailTaskScreen from './screens/DetailTaskScreen';

const StackNavigator = createStackNavigator({
  TaskScreen: {  screen: TaskScreen  },
  AddUserScreen: { screen: AddUserScreen },
  DetailTaskScreen: { screen: DetailTaskScreen }, 
}, {
  initialRouteName: "TaskScreen"
})
export default createAppContainer(StackNavigator)