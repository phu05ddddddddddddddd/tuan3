import React, { useReducer } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

const initialState = {
  quantity: 0,
};

function cartReducer(state: typeof initialState, action: { type: string }) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case 'REMOVE':
      return {
        ...state,
        quantity: Math.max(0, state.quantity - 1),
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function CartScreen() {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🛒 Giỏ hàng
      </Text>

      <Text style={styles.quantity}>
        Số sản phẩm: {state.quantity}
      </Text>

      <View style={styles.button}>
        <Button
          title="Thêm sản phẩm"
          color="#4CAF50"
          onPress={() => dispatch({ type: 'ADD' })}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Bớt sản phẩm"
          color="#FF9800"
          onPress={() => dispatch({ type: 'REMOVE' })}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Xóa giỏ hàng"
          color="#F44336"
          onPress={() => dispatch({ type: 'RESET' })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#121212',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 15,
  },

  quantity: {
    fontSize: 22,
    textAlign: 'center',
    color: '#64B5F6',
    marginBottom: 25,
  },

  button: {
    marginVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
