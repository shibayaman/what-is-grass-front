import { greet } from '@what-is-grass/shared';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text>{greet('World')}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdc8c8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
