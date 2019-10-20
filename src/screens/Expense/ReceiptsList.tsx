import React from 'react';
import {
  FlatListProps,
  FlatList,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Receipt} from '../../redux/actions/expenses/types';
import {getReceiptImagePath} from '../../config/api/routes';

const {width} = Dimensions.get('window');

interface Props extends Omit<FlatListProps<Receipt>, 'renderItem'> {}

const renderItem = ({item}: {item: Receipt}) => {
  const {url} = item;
  return (
    <View style={styles.imageContainer}>
      <Image source={{uri: getReceiptImagePath(url)}} style={styles.image} />
    </View>
  );
};

export default (props: Props) => {
  return (
    <FlatList
      horizontal
      keyExtractor={i => i.url}
      renderItem={renderItem}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    width: width * 0.25,
    height: width * 0.25,
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
