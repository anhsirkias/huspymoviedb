import { useEffect } from "react";
import Moviecard from "./movie-card/movie-card";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, updateTab } from "../redux/reducer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";

const Tabpanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
`;

function Movies() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reducer);

  useEffect(() => {
    dispatch(fetchMovies(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllMovieCards = (data) =>
    data.map((movie) => {
      return (
        <Moviecard key={movie.id} movie={movie}>
          {movie.title}
        </Moviecard>
      );
    });

  const handleChange = (event, newValue) => {
    dispatch(updateTab(newValue));
  };

  return (
    <Container maxWidth="m">
      <h1>Popular Movies</h1>
      <Tabs
        value={state.selectedTab}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="All movies" />
        <Tab label="My movies" />
      </Tabs>
      {state.selectedTab === 0 && (
        <InfiniteScroll
          dataLength={state.movieList}
          next={() => dispatch(fetchMovies(state))}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <Tabpanel>{getAllMovieCards(state.movieList)}</Tabpanel>
        </InfiniteScroll>
      )}
      {state.selectedTab === 1 && (
        <Tabpanel>
          {getAllMovieCards(Object.values(state.starredMovieList))}
        </Tabpanel>
      )}
    </Container>
  );
}

export default Movies;
