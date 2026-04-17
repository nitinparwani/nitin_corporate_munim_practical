import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{"No tasks yet !!"}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
      container: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  textStyle: {
    textAlign: 'center',
    fontSize: 18,
  },
});
