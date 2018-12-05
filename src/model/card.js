import {queryList,deleteOne,addOne,getStatistic} from '../service/card';

export default {

  namespace: 'card',

  state: {
    cardsList: [],
    statistic: {},
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(queryList);
      console.log('queryList');
      console.log(rsp);
      yield put({ type: 'saveList', payload: { cardsList: rsp.result } });
    },
    *deleteOne({ payload }, { call, put }) {
      const rsp = yield call(deleteOne, payload);
      console.log('deleteOne');
      console.log(rsp);
      return rsp;
    },
    *addOne({ payload }, { call, put }) {
      const rsp = yield call(addOne, payload);
      yield put({ type: 'queryList' });
      return rsp;
    },
    *getStatistic({ payload }, { call, put }) {
      const rsp = yield call(getStatistic, payload);
      yield put({
        type: 'saveStatistic',
        payload: {
          id: payload,
          data: rsp.result,
        },
      });
      return rsp;
    },
  },

  reducers: {
    saveList(state, { payload: { cardsList } }) {
      return {
        ...state,
        cardsList,
      }
    },
    saveStatistic(state, { payload: { id, data } }) {
      return {
        ...state,
        statistic: {
          ...state.statistic,
          [id]: data,
        },
      }
    },
  },
};