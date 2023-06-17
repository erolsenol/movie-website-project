import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Container, Box, Typography, Button } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'

export default function MovieHeadCard() {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState(null) // Başlangıçta null olarak tanımlanır
  const [pagination, setPagination] = useState({ page: 1, limit: 20, totalPages: 0 })

  async function movieCategoryFetch() {
    setLoading(true)

    const pageInit = await (
      await fetch(
        '/api/movies?' +
          new URLSearchParams({
            page: pagination.page,
            limit: pagination.limit
          })
      )
    ).json()
    console.log(' :>> ', pageInit.results)
    setMovies(pageInit.results)
    setPagination({ page: pageInit.page, limit: pageInit.limit, totalPages: pageInit.totalPages })
    setLoading(false)
  }

  useEffect(() => {
    movieCategoryFetch()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!movies) {
    return <div>No movies available.</div>
  }

  const selectedMovie = movies[Math.floor(Math.random() * movies.length)]

  return (
    <Container
      sx={{
        position: 'relative',
        maxWidth: '100%',
        height: '10%',
        overflow: 'hidden',
        margin: '0 auto',
        borderRadius: '20px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Image
        src='https://cdn.kayiprihtim.com/wp-content/uploads/2022/12/Yeni-Harry-Potter-film-serisi.jpg'
        alt={selectedMovie.title}
        fill
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <Typography
          variant='h4'
          color='white'
          sx={{ fontWeight: 'bold', margin: '10px', overflowWrap: 'break-word', lineHeight: '1.2' }}
          noWrap={false}
        >
          {selectedMovie.title}
        </Typography>
        <Typography
          variant='body1'
          color='white'
          m={2}
          sx={{
            overflow: 'hidden',
            maxWidth: '40ch',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            lineHeight: '1.2',
            maxLines: 2,
            margin: '10px',
            '@media (max-width: 700px)': {
              maxWidth: '100%',
              animation: 'pulse 1s infinite',
              margin: '10px',
              boxSizing: 'border-box'
            }
          }}
        >
          {selectedMovie.fullplot}
        </Typography>

        <Button
          variant='contained'
          color='secondary'
          startIcon={<PlayArrow />}
          sx={{
            maxWidth: '40ch',
            animation: 'pulse 1s infinite',
            margin: '10px',
            boxSizing: 'border-box',

            '@media (max-width: 700px)': {
              maxWidth: '100%',
              animation: 'pulse 1s infinite',
              margin: '10px',
              boxSizing: 'border-box'
            }
          }}
        >
          İzle / Detaylar
        </Button>
      </Box>
    </Container>
  )
}
