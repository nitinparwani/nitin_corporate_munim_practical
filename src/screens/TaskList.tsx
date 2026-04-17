import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import EmptyState from '../components/EmptyState';
import { getTasks, saveTasks } from '../storage/taskStorage';

const TaskList = ({ navigation }: { navigation: any }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(true);
  const handleNavigation = () => {
    navigation.navigate('AddTask', { setTasks ,tasks});
  };

  const toggleItem = (id: number) => {
    setTasks((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const setCatchData = async () => {
    const catched = await getTasks();
    setTasks(catched);
  };
  const fetchTasks = async() => {
    const getData = await getTasks();
    
    api
      .get('/todos')
      .then(async response => {
        if (getData.length != response.data?.length) {
          setTasks(getData)
          await saveTasks(getData);
        }else{
        setTasks(response?.data);
          await saveTasks(response?.data);
        }
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
        setRefreshing(false);
        setCatchData();
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //load until api return response
  if (loading) {
    <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.main}>
      <Button title="Add New Task" onPress={handleNavigation} />

      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item?.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleItem(item?.id)}>
            <Text style={{ padding: 10, borderBottomWidth: 1 }}>
              {item?.completed ? '✅' : '❌'}
              {item?.title}
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchTasks();
            }}
          />
        }
        ListEmptyComponent={<EmptyState />} // Shows when data is empty
      />
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
});
