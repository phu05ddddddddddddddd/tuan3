import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Số lượng: {count}</Text>

  
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCount(previousCount => previousCount + 1)}
      >
        <Text style={styles.buttonText}>TĂNG</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCount(previousCount => Math.max(0, previousCount - 1))}
      >
        <Text style={styles.buttonText}>GIẢM</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCount(0)}
      >
        <Text style={styles.buttonText}>ĐẶT LẠI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#1c1c1e', 
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#ffffff', 
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3', 
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
