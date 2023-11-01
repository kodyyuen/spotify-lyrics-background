import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLyricsThunk, getSpotifyCurrentSongThunk } from "../spotify/app-thunks";

const GradientBackground = () => {
  const [gradient, setGradient] = useState(["red", "blue", "yellow"]);
  const [lastCurrentSong, setLastCurrentSong] = useState("");
  const [repeat, setRepeat] = useState(true)
  const { currentSong, lyrics } = useSelector((state) => state.app);
  let timer;
  const dispatch = useDispatch();

  const style = {
    background: `
    linear-gradient(140deg, rgb(33, 47, 61), rgba(0,0,0,0) 70%),
    linear-gradient(220deg, red, rgba(0,0,0,0) 70%),
    linear-gradient(320deg, rgb(46, 204, 113), rgba(0,0,0,0) 70%),
    linear-gradient(40deg, rgb(255, 215, 0), rgba(0,0,0,0) 70%)`,
    // background: `linear-gradient(45deg, ${gradient.join(",")})`,
    // background: "radial-gradient(#e66465, #9198e5, blue, red)",
    // background: `linear-gradient(45deg, #e66465, #9198e5)`,
    // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
    // https://medium.com/@stvehayes/working-with-spotifys-api-to-display-currently-playing-with-react-99544f8797d8
    // https://leerob.io/blog/spotify-api-nextjs
    backgroundSize: "180% 180%",
    height: 1000,
  };
  const getRandomKey = () => {
    return Math.random(100);
  };
  const changeGradient = (colors) => {
    setGradient(colors);
  };

  const updateCurrentSong = (repeat) => {
    console.log('updateCurrentSong')
    console.log('repeat: ' + repeat)
    if (repeat) {
      dispatch(getSpotifyCurrentSongThunk());
      timer = setTimeout(updateCurrentSong, 10000);
    } else {
      clearTimeout(timer)
      return;
    }
  }

  const toggleCurrentSongFunc = () => {
    updateCurrentSong(!repeat)
    setRepeat(!repeat)
  }

  useEffect(() => {
    console.log('useEffect')
    // dispatch(getSpotifyCurrentSongThunk());
    updateCurrentSong(true);
  }, []);

  useEffect(() => {
    if (currentSong && lastCurrentSong !== currentSong) {
      dispatch(getLyricsThunk({track: currentSong.item.name, artist: currentSong.item.artists[0].name}))
      setLastCurrentSong(currentSong);
    }
  }, [currentSong])

  return (
    <div
      key={getRandomKey()}
      style={style}
      className="bg-animation d-flex justify-content-center align-items-center"
    >
      {
        currentSong &&
      <h1>{currentSong.item.name}</h1>
      }
      <br></br>
      <h1>{lyrics}</h1>
      <button onClick={() => toggleCurrentSongFunc()}>Click me</button>
    </div>
  );
};

export default GradientBackground;
