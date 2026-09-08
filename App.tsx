import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

// Danh sách sản phẩm đặt bên ngoài component
// để tránh tạo array mới mỗi lần render
const products = [
  {
    id: '1',
    name: 'Áo thun',
    price: 200000,
  },
  {
    id: '2',
    name: 'Quần jean',
    price: 450000,
  },
  {
    id: '3',
    name: 'Giày thể thao',
    price: 800000,
  },
];

export default function App() {
  // Trạng thái từ khóa tìm kiếm
  const [keyword, setKeyword] = useState('');

  // Lọc sản phẩm bằng useMemo
  const filteredProducts = useMemo(() => {
    const searchKeyword = keyword
      .trim()
      .toLowerCase();

    return products.filter(product =>
      product.name
        .toLowerCase()
        .includes(searchKeyword)
    );
  }, [keyword]);

  // Tính tổng giá các sản phẩm đang hiển thị
  const totalPrice = useMemo(() => {
    return filteredProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  }, [filteredProducts]);

  // Hàm chọn sản phẩm
  const handleSelect = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
    }) => {
      console.log('Đã chọn:', product.name);
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Danh sách sản phẩm
      </Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm..."
        placeholderTextColor="#AAAAAA"
        style={styles.input}
      />

      <Text style={styles.total}>
        Tổng giá:{' '}
        {totalPrice.toLocaleString('vi-VN')}đ
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text style={styles.productName}>
              {item.name}
            </Text>

            <Text style={styles.price}>
              {item.price.toLocaleString('vi-VN')}đ
            </Text>

            <Button
              title="Chọn sản phẩm"
              color="#2196F3"
              onPress={() => handleSelect(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy sản phẩm
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#121212',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 17,
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
    marginBottom: 15,
  },

  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },

  product: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  productName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },

  price: {
    fontSize: 17,
    color: '#64B5F6',
    marginBottom: 10,
  },

  empty: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 17,
    marginTop: 30,
  },
});
