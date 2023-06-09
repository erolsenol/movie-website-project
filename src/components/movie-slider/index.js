import { useState, useRef, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'

const movies = [
  { name: 'Movie 1', rating: 7.5, imageUrl: '/movie1.jpg' },
  { name: 'Movie 2', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 3', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 4', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 5', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 6', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 7', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 8', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 9', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 10', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 11', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 12', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 13', rating: 8.2, imageUrl: '/movie2.jpg' },
  { name: 'Movie 14', rating: 8.2, imageUrl: '/movie2.jpg' }
]

const MovieCarousel = () => {
  const containerRef = useRef(null)
  const [carouselMovies, setCarouselMovies] = useState([...movies, ...movies])

  useEffect(() => {
    // Sola doğru infinite scroll başlangıçta sona gelene kadar kaydırmak için
    const container = containerRef.current
    if (container) {
      container.scrollLeft = container.scrollWidth
    }
  }, [])

  const handleScroll = () => {
    const container = containerRef.current
    if (container) {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      if (scrollLeft === 0) {
        // Scroll başına gelindiğinde, listenin başına eklenen kopya film verileriyle devam edilir
        setCarouselMovies(prevMovies => [...movies, ...prevMovies])
        container.scrollLeft = container.scrollWidth / 2
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        // Scroll sonuna gelindiğinde, listenin sonuna eklenen kopya film verileriyle devam edilir
        setCarouselMovies(prevMovies => [...prevMovies, ...movies])
      }
    }
  }

  return (
    <Container sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Typography variant='h5' component='h2' mb={2}>
        Category
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
        {carouselMovies.map((movie, index) => (
          <Box
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
            <Image src={movie.imageUrl} alt={movie.name} width={200} height={300} />
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
