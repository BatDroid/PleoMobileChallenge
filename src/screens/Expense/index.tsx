import React, {useState, useEffect} from 'react';
import {View, NativeModules} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import ReceiptsList from './ReceiptsList';
import {ExpenseType} from 'src/redux/actions/expenses/types';
import {ExpenseStoreType} from 'src/redux/reducers/expenses';
import {
  setCommentExpense,
  uploadReceipt,
} from '../../redux/actions/expenses/index';
import FormTextArea from '../../components/FormTextArea';
import FullLoading from '../../components/FullLoading';
import LoadingButton from '../../components/LoadingButton';
import ImageTaker from '../../components/ImageTaker';
import useCameraPicker from '../../hooks/useCameraPicker';

type NavigationParmas = {
  onSavePressed: () => void;
};
type NavigationType = NavigationScreenProp<Props, NavigationParmas>;
interface Props {
  currentExpense: null | ExpenseType;
  isLoading: boolean;
  navigation: NavigationType;
  setCommentExpense: Function;
  uploadReceipt: Function;
}

const Expense = (props: Props) => {
  const {currentExpense, setCommentExpense, isLoading, uploadReceipt} = props;
  if (!currentExpense) return <FullLoading />;
  const [comment, setComment] = useState('');
  const [receiptPath, setReceiptPath] = useCameraPicker(null);
  useEffect(() => {
    // for case of returning to native part and entring with different expense
    setComment(currentExpense.comment);
  }, [currentExpense]);

  return (
    <View>
      <FormTextArea
        title="Comments"
        value={comment}
        onChangeText={v => setComment(v)}
      />
      <LoadingButton
        title="Save"
        isLoading={isLoading}
        onPress={() => {
          setCommentExpense(currentExpense.id, comment);
        }}
      />
      <ImageTaker
        currentImagePath={receiptPath}
        isLoadingUpload={isLoading}
        onTakePressed={() => {
          NativeModules.CameraManager.takeImage();
        }}
        onUploadPressed={() => {
          uploadReceipt(currentExpense.id, receiptPath, () => {
            setReceiptPath(null);
          });
        }}
      />
      <ReceiptsList data={currentExpense.receipts} />
    </View>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({setCommentExpense, uploadReceipt}, dispatch);
}

function mapStateToProps({
  expenses: {currentExpense, isLoading},
}: ExpenseStoreType) {
  return {
    currentExpense,
    isLoading,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Expense);
