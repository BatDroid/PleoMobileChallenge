import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {ExpenseType} from 'src/redux/actions/expenses/types';
import {ExpenseStoreType} from 'src/redux/reducers/expenses';
import {setCommentExpense} from '../../redux/actions/expenses/index';
import FormTextArea from '../../components/FormTextArea';
import FullLoading from '../../components/FullLoading';
import LoadingButton from '../../components/LoadingButton';

type NavigationParmas = {
  onSavePressed: () => void;
};
type NavigationType = NavigationScreenProp<Props, NavigationParmas>;
interface Props {
  currentExpense: null | ExpenseType;
  isLoading: boolean;
  navigation: NavigationType;
  setCommentExpense: Function;
}

const Expense = (props: Props) => {
  const {currentExpense, setCommentExpense, isLoading} = props;
  if (!currentExpense) return <FullLoading />;
  const [comment, setComment] = useState("");
  useEffect(() => {
    // for case of returning to native part and entring with different expense
    setComment(currentExpense.comment)
  }, [currentExpense])
  return (
    <View>
      <FormTextArea
        title="Comments"
        value={comment}
        onChangeText={v => setComment(v)}
      />
      <LoadingButton title="Save" isLoading={isLoading} onPress={() => {
        setCommentExpense(currentExpense.id, comment)
      }}/>
    </View>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({setCommentExpense}, dispatch);
}

function mapStateToProps({expenses: {currentExpense, isLoading}}: ExpenseStoreType) {
  return {
    currentExpense,
    isLoading,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Expense);
