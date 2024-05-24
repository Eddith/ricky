import {createSlice} from '@reduxjs/toolkit';
import {fetchEpisodes, fetchEpisodeDetails} from '../actions';

const episodeSlice = createSlice({
  name: 'episodes',
  initialState: {
    episodes: [],
    episodeDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEpisodes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload.results;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEpisodeDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchEpisodeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.episodeDetails = action.payload;
      })
      .addCase(fetchEpisodeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default episodeSlice.reducer;
