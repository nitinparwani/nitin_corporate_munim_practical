import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { api } from '../api/client';
import { saveTasks } from '../storage/taskStorage';

const AddTask = ({ navigation, route }: { navigation: any; route: any }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { setTasks,tasks } = route.params;

  const handleAddTodo = async () => {
    // Validate input before sending
    if (!title.trim() || title.length < 3) {
      Alert.alert('Error', 'Minimum 3 characters required');
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setLoading(false);
    try {
      const response = await api.post('/todos', newTask);
      console.log('Success:', response.data);
      setTasks((prev: any) => [newTask, ...prev]);
      const newData = [newTask,...tasks]
      await saveTasks(newData);
      navigation.goBack();
      setTitle(''); // Clear input
      setLoading(false);
    } catch (error) {
      console.error('Error posting todo:', error);
      Alert.alert('Error', 'Failed to add todo. Check your connection.');
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        placeholder="Tasks"
        value={title}
        onChangeText={setTitle}
        style={styles.textInput}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Add Task" onPress={handleAddTodo} />
      )}
    </KeyboardAvoidingView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
  },
});
