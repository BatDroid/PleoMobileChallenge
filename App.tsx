import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import RootNavigation from './src/config/navigation';
import store from './src/config/redux/store';
import {ExpenseType} from './src/redux/actions/expenses/types';
import {setCurrentExpense} from './src/redux/actions/expenses';

interface Props {
  expense: string;
}

const App = (props: Props) => {
  const {expense} = props;
  useEffect(() => {
    setCurrentExpense(JSON.parse(expense) as ExpenseType, store.dispatch);
  }, [expense]);
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default (props: Props) => <App {...props} />;
