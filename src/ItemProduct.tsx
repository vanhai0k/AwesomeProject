import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';

type props = {
  onPress: () => void;
  image: string;
  nameProduct: string;
  price: number;
  priceSale: number;
};

const ItemProduct = (props: props) => {
  const {onPress, image, nameProduct, price, priceSale} = props;
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{nameProduct}</Text>
        <View style={styles.with3}>
          <Image style={styles.borderImage} source={{uri: image}} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  with3: {
    width: '30%',
  },
  borderImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
});
