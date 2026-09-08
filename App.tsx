import React, { useReducer } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
  error: '',
};

function formReducer(
  state: typeof initialState,
  action: {
    type: string;
    payload?: string;
  }
) {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload || '',
        error: '',
      };

    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload || '',
        error: '',
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload || '',
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function LoginScreen() {
  const [state, dispatch] = useReducer(
    formReducer,
    initialState
  );

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }

    dispatch({
      type: 'SET_ERROR',
      payload: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={text =>
          dispatch({
            type: 'SET_EMAIL',
            payload: text,
          })
        }
        placeholder="Email"
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={text =>
          dispatch({
            type: 'SET_PASSWORD',
            payload: text,
          })
        }
        placeholder="Mật khẩu"
        placeholderTextColor="#AAAAAA"
        secureTextEntry
      />

      {state.error ? (
        <Text style={styles.error}>
          {state.error}
        </Text>
      ) : null}

      <View style={styles.button}>
        <Button
          title="Đăng nhập"
          color="#2196F3"
          onPress={handleLogin}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Đặt lại"
          color="#F44336"
          onPress={() =>
            dispatch({ type: 'RESET' })
          }
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
    marginBottom: 30,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 17,
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
  },

  error: {
    color: '#FF5252',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },

  button: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
