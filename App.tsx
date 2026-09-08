import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Pressable,
} from 'react-native';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoAction =
  | {
      type: 'ADD_TODO';
      payload: string;
    }
  | {
      type: 'TOGGLE_TODO';
      payload: string;
    }
  | {
      type: 'DELETE_TODO';
      payload: string;
    };

const initialTodos: Todo[] = [];

function todoReducer(
  state: Todo[],
  action: TodoAction
): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now().toString(),
          title: action.payload,
          completed: false,
        },
      ];

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(
        todo => todo.id !== action.payload
      );

    default:
      return state;
  }
}

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType | null>(null);

function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsDark(previous => !previous);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem = React.memo(
  function TodoItem({
    todo,
    onToggle,
    onDelete,
  }: TodoItemProps) {
    const { isDark } = useContext(ThemeContext)!;

    return (
      <View
        style={[
          styles.todoItem,
          {
            backgroundColor: isDark
              ? '#1E1E1E'
              : '#F2F2F2',
          },
        ]}
      >
        <Pressable
          style={styles.todoContent}
          onPress={() => onToggle(todo.id)}
        >
          <Text
            style={[
              styles.todoText,
              {
                color: isDark
                  ? '#FFFFFF'
                  : '#222222',
                textDecorationLine: todo.completed
                  ? 'line-through'
                  : 'none',
                opacity: todo.completed ? 0.5 : 1,
              },
            ]}
          >
            {todo.completed ? '✓ ' : '○ '}
            {todo.title}
          </Text>
        </Pressable>

        <View style={styles.deleteButton}>
          <Button
            title="Xóa"
            color="#F44336"
            onPress={() => onDelete(todo.id)}
          />
        </View>
      </View>
    );
  }
);

function TodoScreen() {
  const { isDark, toggleTheme } =
    useContext(ThemeContext)!;

  const [todos, dispatch] = useReducer(
    todoReducer,
    initialTodos
  );

  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleAddTodo = useCallback(() => {
    const title = input.trim();

    if (!title) {
      return;
    }

    dispatch({
      type: 'ADD_TODO',
      payload: title,
    });

    setInput('');
  }, [input]);

  const handleToggleTodo = useCallback(
    (id: string) => {
      dispatch({
        type: 'TOGGLE_TODO',
        payload: id,
      });
    },
    []
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      dispatch({
        type: 'DELETE_TODO',
        payload: id,
      });
    },
    []
  );

  const filteredTodos = useMemo(() => {
    const searchKeyword = keyword
      .trim()
      .toLowerCase();

    return todos.filter(todo =>
      todo.title
        .toLowerCase()
        .includes(searchKeyword)
    );
  }, [todos, keyword]);

  const remainingTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed)
      .length;
  }, [todos]);

  useEffect(() => {
    console.log(
      `Danh sách hiện có ${todos.length} công việc`
    );
  }, [todos.length]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? '#121212'
            : '#FFFFFF',
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: isDark
              ? '#FFFFFF'
              : '#222222',
          },
        ]}
      >
        Quản lý công việc
      </Text>

      <View style={styles.themeRow}>
        <Text
          style={[
            styles.themeText,
            {
              color: isDark
                ? '#FFFFFF'
                : '#222222',
            },
          ]}
        >
          {isDark
            ? '🌙 Chế độ tối'
            : '☀️ Chế độ sáng'}
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{
            false: '#999999',
            true: '#4CAF50',
          }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.counterBox}>
        <Text style={styles.counter}>
          Việc chưa hoàn thành: {remainingTodos}
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập công việc..."
          placeholderTextColor={
            isDark ? '#AAAAAA' : '#777777'
          }
          style={[
            styles.input,
            {
              color: isDark
                ? '#FFFFFF'
                : '#222222',
              backgroundColor: isDark
                ? '#1E1E1E'
                : '#F5F5F5',
            },
          ]}
        />

        <Button
          title="Thêm"
          color="#2196F3"
          onPress={handleAddTodo}
        />
      </View>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="🔍 Tìm công việc..."
        placeholderTextColor={
          isDark ? '#AAAAAA' : '#777777'
        }
        style={[
          styles.searchInput,
          {
            color: isDark
              ? '#FFFFFF'
              : '#222222',
            backgroundColor: isDark
              ? '#1E1E1E'
              : '#F5F5F5',
          },
        ]}
      />

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.empty,
              {
                color: isDark
                  ? '#AAAAAA'
                  : '#777777',
              },
            ]}
          >
            {todos.length === 0
              ? 'Chưa có công việc nào'
              : 'Không tìm thấy công việc'}
          </Text>
        }
      />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TodoScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  themeText: {
    fontSize: 16,
  },

  counterBox: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  counter: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  todoContent: {
    flex: 1,
  },

  todoText: {
    fontSize: 17,
  },

  deleteButton: {
    marginLeft: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },

  empty: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 30,
  },
});
