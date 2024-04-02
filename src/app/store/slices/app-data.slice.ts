import { createSlice } from '@reduxjs/toolkit';
import { AppDataState } from '../types';

export const name = 'appData';

const userInitialState: AppDataState = {
  psyhologists: [],
  question: {
    slug: '',
    title: '',
    answers: [],
    comments: [],
    video: [],
    SEODesc: '',
    SEOTitle: '',
    canonical: '',
  },
};

export const appDataSlice = createSlice({
  name,
  initialState: userInitialState,
  reducers: {
    getAllPsyhologists(state, action) {
      state.psyhologists = action.payload;
    },
    getQuestion(state, action) {
      state.question = action.payload;
    },
  },
});

export const { getAllPsyhologists, getQuestion } = appDataSlice.actions;
