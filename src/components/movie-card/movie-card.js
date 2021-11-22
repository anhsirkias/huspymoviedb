import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import { removeStarredMovie, addStarredMovie } from "../../redux/reducer";

const Cardcontainer = styled.div`
  display: grid;
  padding: 10px;
  width: 210px;
  justify-self: center;
  box-shadow: 0 2px 8px rgb(0 0 0 / 50%);
  position: relative;
`;

const Poster = styled.img`
  width: 210px;
`;

const starStyles = `
  position: absolute;
  fill: gold;
  right: 15px;
  top: 15px;
  transform: scale(1.2);
  cursor: pointer;
`;

const Star = styled(StarIcon)`
  ${starStyles}
`;

const StarOutline = styled(StarBorderIcon)`
  ${starStyles}
`;

const Delete = styled(DeleteIcon)`
  ${starStyles}
  fill: #7C7C7C;
  top: 360px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: 4px
`;

const Moviecard = ({ movie, ...props }) => {
  const dispatch = useDispatch();
  const starredMovieList = useSelector(
    (state) => state.reducer.starredMovieList
  );
  const selectedTab = useSelector((state) => state.reducer.selectedTab);

  return (
    <Cardcontainer>
      <Poster
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}?api_key=f6a87a1401051aff485fd664c929c93e&language=en-US&page=1`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYCKWDuIFcWmkmnDEVYI96n0v1mQ0t1mTeQ&usqp=CAU"
        }
        alt={movie.title}
      />
      {!selectedTab &&
        (starredMovieList[movie.id] ? (
          <Star onClick={() => dispatch(removeStarredMovie(movie.id))}></Star>
        ) : (
          <StarOutline
            onClick={() => dispatch(addStarredMovie(movie))}
          ></StarOutline>
        ))}
      {!!selectedTab && <Delete onClick={() => dispatch(removeStarredMovie(movie.id))} ></Delete>}
      <Title> {movie.title}</Title>
      <div> {movie.release_date && movie.release_date.split("-")[0]}</div>
      <div>
        Rating: <b>{movie.vote_average}</b>
      </div>
    </Cardcontainer>
  );
};

export default Moviecard;
