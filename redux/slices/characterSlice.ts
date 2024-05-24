import {createSlice} from '@reduxjs/toolkit';
import {fetchCharacterDetails} from '../actions';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    characterDetails: null,
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      if (state.favorites.length < 10) {
        if (
          state.favorites.find(character => character.id === action.payload.id)
        ) {
          Alert.alert('Bu karakter zaten favorilerde.');
          return;
        }
        state.favorites.push(action.payload);
        Alert.alert('Karakter favorilere eklendi.');
      } else {
        Alert.alert(
          'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.',
        );
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        character => character.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharacterDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.characterDetails = action.payload;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {addFavorite, removeFavorite} = characterSlice.actions;
export default characterSlice.reducer;
