import { useState, useRef, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const MovieCarousel = ({ category }) => {
  const containerRef = useRef(null)
  const router = useRouter()

  function movieDetailOpen({ title, id }) {
    router.push(`movies/${title}/${id}`)
  }

  // const [carouselMovies, setCarouselMovies] = useState([...movies, ...movies])

  async function movieCategoryFetch(category) {
    setLoading(true)

    const pageInit = await (
      await fetch(
        '/api/movies/category?' +
          new URLSearchParams({
            page: pagination.page,
            limit: pagination.limit,
            genres: category
          })
      )
    ).json()
    console.log(pageInit.results)
    setMovies(pageInit.results)
    setPagination({ page: pageInit.page, limit: pageInit.limit, totalPages: pageInit.totalPages })
    setLoading(false)
  }

  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 14, totalPages: 0 })

  useEffect(() => {
    // Sola doğru infinite scroll başlangıçta sona gelene kadar kaydırmak için
    const container = containerRef.current
    if (container) {
      container.scrollLeft = container.scrollWidth
    }
    movieCategoryFetch(category)
  }, [])

  const handleScroll = () => {
    const container = containerRef.current
    if (container) {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth

      // if (scrollLeft === 0) {
      //   // Scroll başına gelindiğinde, listenin başına eklenen kopya film verileriyle devam edilir
      //   setCarouselMovies(prevMovies => [...movies, ...prevMovies])
      //   container.scrollLeft = container.scrollWidth / 2
      // } else if (scrollLeft + clientWidth >= scrollWidth) {
      //   // Scroll sonuna gelindiğinde, listenin sonuna eklenen kopya film verileriyle devam edilir
      //   setCarouselMovies(prevMovies => [...prevMovies, ...movies])
      // }
    }
  }

  return (
    <Container sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Typography variant='h5' component='h2' mb={2}>
        {category}
      </Typography>
      <Box
        display='flex'
        flexWrap='nowrap'
        p={2}
        pb={0}
        alignItems='center'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          overflowX: 'auto'
        }}
        onScroll={handleScroll}
        ref={containerRef}
      >
        {movies.map((movie, index) => (
          <Box
            onClick={() => movieDetailOpen({ title: movie.title, id: movie.id })}
            key={index}
            width={200}
            height={400}
            p={1}
            display='flex'
            flexDirection='column'
            justifyContent='flex-end'
            alignItems='flex-start'
            bgcolor='#f5f5f5'
            mr={1}
          >
            {/* <Image src={movie.imageUrl} alt={movie.name} width={200} height={300} /> */}
            <Typography variant='subtitle2' component='div'>
              {movie.name}
            </Typography>
            <Typography variant='caption' component='div'>
              Rating: {movie.rating}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default MovieCarousel
