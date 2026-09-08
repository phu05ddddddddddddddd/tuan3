import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

export default function ConnectionScreen() {

  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Chưa kết nối');

  
  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Trạng thái kết nối
      </Text>

      <Switch
        value={isConnected}
        onValueChange={setIsConnected}
        trackColor={{
          false: '#555555',
          true: '#4CAF50',
        }}
        thumbColor={isConnected ? '#FFFFFF' : '#CCCCCC'}
      />

      <Text
        style={[
          styles.message,
          {
            color: isConnected ? '#4CAF50' : '#FF5252',
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },

  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
