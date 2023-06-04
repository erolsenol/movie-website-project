// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  movies: null,
  setMovies: () => null,
  movie: null,
  setMovie: () => null,
  loading: true,
  setLoading: () => Boolean,

  getMovieDetail: () => Promise.resolve()
}
const MovieContext = createContext(defaultProvider)

const MovieProvider = ({ children }) => {
  // ** States
  const [movies, setMovies] = useState(defaultProvider.movies)
  const [movie, setMovie] = useState(defaultProvider.movie)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initMoviePage = async () => {
      console.log('initMoviePage')

      // const getMovieRes = await service.movieService.getMovies()
      // console.log('getMovieRes', getMovieRes)
    }
    initMoviePage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMovieDetail = id => {
    console.log('id', id)
  }

  const values = {
    movies,
    setMovies,
    movie,
    setMovie,
    loading,
    setLoading,
    getMovieDetail: handleMovieDetail
  }

  return <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
}

export { MovieContext, MovieProvider }
