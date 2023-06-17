import { useState, useEffect } from 'react'
import { Container, Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const MovieCarousel = ({ category }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, totalPages: 0 })
  const [hoveredMovie, setHoveredMovie] = useState(null)

  function movieDetailOpen({ title, id }) {
    router.push(`movies/${title}/${id}`)
  }

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
    console.log('pageInit.results :>> ', pageInit.results)
    setMovies(pageInit.results)
    setPagination({ page: pageInit.page, limit: pageInit.limit, totalPages: pageInit.totalPages })
    setLoading(false)
  }

  useEffect(() => {
    movieCategoryFetch(category)
  }, [category])

  const handleMouseEnter = movie => {
    setHoveredMovie(movie)
  }

  const handleMouseLeave = () => {
    setHoveredMovie(null)
  }

  return (
    <Container
      sx={{
        maxWidth: '100%',
        padding: '20px',
        borderRadius: '3px',
        animation: 'fadeIn 1s ease-in-out',
        background: 'rgba(26, 26, 26, 0.9)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Typography variant='h5' component='h2' mb={3} mt={3} sx={{ color: '#FFFFFF' }}>
        {category}
      </Typography>

      <Box
        display='flex'
        flexDirection='row'
        flexWrap='nowrap'
        alignItems='flex-start'
        bgcolor='transparent'
        m={2}
        p={1}
        gap={1}
        sx={{
          overflowX: 'scroll',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          animation: 'fadeIn 1s ease-in-out',
          background: 'transparent',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
          borderRadius: '5px'
        }}
      >
        {movies.map((movie, index) => (
          <Box
            onClick={() => movieDetailOpen({ title: movie.title, id: movie.id })}
            onMouseEnter={() => handleMouseEnter(movie)}
            onMouseLeave={handleMouseLeave}
            key={index}
            minWidth={200}
            minHeight={350}
            p={1}
            display='flex'
            flexDirection='column'
            justifyContent='flex-end'
            alignItems='flex-start'
            bgcolor='transparent'
            boxShadow={hoveredMovie === movie ? '0px 0px 10px rgba(0, 0, 0, 0.5)' : 'none'}
            transition='box-shadow 0.3s ease-in-out'
            m={3}
            sx={{
              borderRadius: '5px',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.7)',
                transform: 'scale(1.05)'
              }
            }}
          >
            {/* <Image src={movie.imageUrl} alt={movie.name} width={200} height={300} /> */}

            <Typography variant='subtitle2' component='div' sx={{ color: '#FFFFFF' }}>
              {movie.title}
            </Typography>
            <Typography variant='caption' component='div' sx={{ color: '#CCCCCC' }}>
              IMDB: {movie.imdb.rating}
            </Typography>
          </Box>
        ))}
        <Box
          minWidth={200}
          minHeight={350}
          p={1}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          bgcolor='transparent'
          boxShadow='none'
          transition='none'
          m={3}
          sx={{
            flex: '0 0 auto',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)'
            },
            borderRadius: '5px'
          }}
          onClick={() => router.push(`/movies/${category}`)}
        >
          <Typography variant='subtitle2' component='div' sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Daha Fazla {category}
          </Typography>
          <ArrowForwardIcon sx={{ mt: 1, color: '#FFFFFF' }} />
        </Box>
      </Box>
    </Container>
  )
}

export default MovieCarousel
