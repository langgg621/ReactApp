import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TaskScreen from './screens/TaskScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import DetailTaskScreen from './screens/DetailTaskScreen';

const StackNavigator = createStackNavigator({
  TaskScreen: {  screen: TaskScreen  },
  AddTaskScreen: { screen: AddTaskScreen },
  DetailTaskScreen: { screen: DetailTaskScreen }, 
}, {
  initialRouteName: "TaskScreen"
})
export default createAppContainer(StackNavigator)