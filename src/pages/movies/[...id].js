import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

async function getMovieDetail(id, setFunc) {
  return new Promise(async (resolve, reject) => {
    const movieDetail = await (await fetch('/api/movies/detail?id=' + id)).json()
    console.log('movieDetail', movieDetail)
    setFunc(movieDetail)
    resolve(true)
  })
}

const MovieDetail = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    console.log('router :>> ', router)
    if (router.query.id) {
      setLoading(true)
      getMovieDetail(router.query.id[1], setMovie).finally(res => setLoading(false))
    }
  }, [])

  return (
    <div>
      <h1>Movie Detail {movie.title}</h1>
      <h1>Movie Detail {movie.url}</h1>
      <iframe src={movie.url}></iframe>
    </div>
  )
}

export default MovieDetail
