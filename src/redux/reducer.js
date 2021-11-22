import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const moviesReducer = createSlice({
  name: "movies",
  initialState: {
    movieList: [],
    pageNo: 0,
    totalPages: 0,
    starredMovieList: {},
    selectedTab: 0,
  },
  reducers: {
    updateStateData: (state, action) => {
      state.movieList = [...state.movieList, ...action.payload.results];
      state.pageNo = action.payload.page;
      state.totalPages = action.payload.total_pages;
    },
    addStarredMovie: (state, action) => {
      state.starredMovieList = {
        ...state.starredMovieList,
        [action.payload.id]: action.payload,
      };
    },
    removeStarredMovie: (state, action) => {
      delete state.starredMovieList[action.payload];
    },
    updateTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const fetchMovies = (state) => (dispatch) => {
  if (state.pageNo === 0 || state.pageNo < state.totalPages) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=f6a87a1401051aff485fd664c929c93e&language=en-US&page=${
      state.pageNo + 1
    }`;
    axios.get(url).then((response) => {
      dispatch(updateStateData(response.data));
    });
  }
};

// Action creators are generated for each case reducer function
export const {
  updateStateData,
  addStarredMovie,
  removeStarredMovie,
  updateTab,
} = moviesReducer.actions;

export default moviesReducer.reducer;
