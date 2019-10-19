import React from 'react';
import {ActivityIndicator, ButtonProps, Button} from 'react-native';

interface Props extends ButtonProps {
  isLoading: boolean;
}
export default ({isLoading, ...buttonProps}: Props) =>
  isLoading ? <ActivityIndicator /> : <Button {...buttonProps} />;
