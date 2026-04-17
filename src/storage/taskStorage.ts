import AsyncStorage from '@react-native-async-storage/async-storage';


// save tasks
export const saveTasks = async (tasks: any) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem('tasks', jsonValue);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

// get tasks
export const getTasks= async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('tasks');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error fetching data:', e);
    return null;
  }
};
