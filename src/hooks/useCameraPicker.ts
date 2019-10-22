import {useEffect, useState, SetStateAction, Dispatch} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

export default function useCameraPicker(
  initialImage: string | undefined | null,
): [
  (string | undefined | null),
  Dispatch<SetStateAction<string | undefined | null>>,
] {
  let [imagePath, setImagePath] = useState(initialImage);
  useEffect(() => {
    const cameraEvent = new NativeEventEmitter(NativeModules.CameraManager);
    const onImagePicked = (res: {image: string}) => {
      if (res && res.image) {
        setImagePath(res.image);
      }
    };
    cameraEvent.addListener('onImagePicked', onImagePicked);
    return () => cameraEvent.removeListener('onImagePicked', onImagePicked);
  }, []);
  return [imagePath, setImagePath];
}
