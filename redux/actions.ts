import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

export const fetchEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get('/episode');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchEpisodeDetails = createAsyncThunk(
  'episodes/fetchEpisodeDetails',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(`/episode/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchCharacterDetails = createAsyncThunk(
  'characters/fetchCharacterDetails',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(`/character/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeFavorite = createAsyncThunk(
  'characters/removeFavorite',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await apiClient.delete(`/character/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
