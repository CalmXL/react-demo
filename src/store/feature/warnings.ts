import { MonitorData } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface Info {
  ip: string;
  infos: MonitorData[];
}

const warningSlice = createSlice({
  name: 'warningStore',
  initialState: {
    list: [] as Info[],
  },
  reducers: {
    setWarningsActions(state, { payload }: { payload: Info }) {
      const isExist = state.list.find((item) => item.ip === payload.ip);
      if (isExist) {
        // ip 存在
        state.list.map((item) => {
          if (item.ip === payload.ip) {
            return {
              ip: payload.ip,
              infos: payload.infos,
            };
          }
          return item;
        });
      } else {
        state.list.push(payload);
      }
    },
  },
});

export const { setWarningsActions } = warningSlice.actions;

export default warningSlice.reducer;
