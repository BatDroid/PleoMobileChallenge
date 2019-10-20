import React from 'react';
import {View, Button, Image, StyleSheet, Dimensions} from 'react-native';
import LoadingButton from './LoadingButton';

interface Props {
  currentImagePath: string | undefined | null;
  isLoadingUpload: boolean;
  onTakePressed: () => void;
  onUploadPressed: () => void;
}

const {width} = Dimensions.get('window');

export default (props: Props) => {
  const {
    currentImagePath,
    onTakePressed,
    onUploadPressed,
    isLoadingUpload,
  } = props;
  const imageAvailable = !!currentImagePath && currentImagePath.length > 0;
  const takeTitle = `${imageAvailable ? 'Re' : ''}Take Image`;
  const uploadTitle = 'Upload';

  return (
    <View style={styles.root}>
      {imageAvailable && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: currentImagePath || ''}} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title={takeTitle} onPress={onTakePressed} />
        {imageAvailable && (
          <LoadingButton
            title={uploadTitle}
            onPress={onUploadPressed}
            isLoading={isLoadingUpload}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    marginTop: 30,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    width: width * 0.25,
    height: width * 0.25,
    overflow: 'hidden',
    alignSelf: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
