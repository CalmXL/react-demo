import { InfoObject } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const warningSlice = createSlice({
  name: 'warningStore',
  initialState: {
    list: [] as InfoObject[], // { host: string, monitor: []}
    warnings: [],
  },
  reducers: {
    setInfosActions(state, { payload }: { payload: InfoObject }) {
      const isExist = state.list.find((item) => item.host === payload.host);
      if (isExist) {
        // ip 存在
        state.list = state.list.map((item: InfoObject) => {
          if (item.host === payload.host) {
            return {
              host: payload.host,
              monitor: payload.monitor,
            };
          }
          return item;
        });
      } else {
        state.list.push(payload);
      }
    },
    setWarningsAction(state, { payload }) {
      state.warnings = payload;
    },
  },
});

export const { setInfosActions, setWarningsAction } = warningSlice.actions;

export default warningSlice.reducer;
