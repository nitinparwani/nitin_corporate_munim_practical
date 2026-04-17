/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from './src/screens/TaskList';
import AddTask from './src/screens/AddTask';

const Stack = createNativeStackNavigator();

function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="AddTask" component={AddTask} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
