import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

async function getMovieDetail(id, setFunc) {
  return new Promise(async (resolve, reject) => {
    console.log('qweqw')
    const movieDetail = await (await fetch('/api/movies/detail?id=' + id)).json()
    setFunc(movieDetail)
    resolve(true)
  })
}

const MovieDetail = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    if (router.query.id) {
      setLoading(true)
      getMovieDetail(router.query.id[1], setMovie).finally(res => setLoading(false))
    }
  }, [])

  return <h1>Movie Detail {movie.title}</h1>
}

export default MovieDetail
