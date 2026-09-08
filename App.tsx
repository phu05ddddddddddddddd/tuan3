import React, {
  memo,
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

const ProductItem = memo(function ProductItem({
  item,
  onSelect,
}: {
  item: {
    id: string;
    name: string;
    price: number;
  };
  onSelect: (item: {
    id: string;
    name: string;
    price: number;
  }) => void;
}) {
  return (
    <View style={styles.productButton}>
      <Button
        title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
        onPress={() => onSelect(item)}
        color="#2196F3"
      />
    </View>
  );
});

export default function ProductScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const products = useMemo(
    () => [
      {
        id: '1',
        name: 'Điện thoại',
        price: 12000000,
      },
      {
        id: '2',
        name: 'Máy tính bảng',
        price: 9000000,
      },
      {
        id: '3',
        name: 'Tai nghe',
        price: 1500000,
      },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword
      .trim()
      .toLowerCase();

    return products.filter(product =>
      product.name
        .toLowerCase()
        .includes(normalizedKeyword)
    );
  }, [keyword, products]);

  const handleSelectProduct = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
    }) => {
      setSelectedName(product.name);
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
        placeholder="Tìm sản phẩm"
        placeholderTextColor="#AAAAAA"
        style={styles.input}
      />

      <Text style={styles.selected}>
        Sản phẩm đã chọn:{' '}
        <Text style={styles.selectedName}>
          {selectedName || 'Chưa chọn'}
        </Text>
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onSelect={handleSelectProduct}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy sản phẩm
          </Text>
        }
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
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
    fontSize: 26,
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

  selected: {
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: 15,
  },

  selectedName: {
    color: '#64B5F6',
    fontWeight: 'bold',
  },

  productButton: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2196F3',
  },

  separator: {
    height: 12,
  },

  empty: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 17,
    marginTop: 30,
  },
});
