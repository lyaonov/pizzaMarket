import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { getAppVersion } from '../../LocalStorage/GetAppVersion';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const appVersion = getAppVersion();
    const { sortBy, order, category, search, currentPage } = params;
    const limit = appVersion === 1 ? 10 : 4;
    
    const { data } = await axios.get<Pizza[]>(`https://2cdb8ebc-9a4a-4c97-b4a7-a6cac2b1724a-00-1wm7k35sjiz27.global.replit.dev/pizzas`, {
      params: pickBy(
        {
          page: currentPage,
          limit,
          category,
          sortBy,
          order,
          search,
        },

        identity,
      ),
    });
    
    return data;
  },
);
