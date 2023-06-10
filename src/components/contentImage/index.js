import React from 'react'
import Image from 'next/image'
import { Box, Typography, Button } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'

export default function MovieCard({ movieName, description, imageUrl }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 500,
        overflow: 'hidden'
      }}
    >
      <Image src={imageUrl} alt={movieName} fill />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: 2,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        <Typography
          variant='h4'
          color='white'
          sx={{ fontWeight: 'bold', overflowWrap: 'break-word' }}
          noWrap={false}
          maxRows={2}
        >
          {movieName}
        </Typography>
        <Typography variant='body1' color='white' sx={{ overflowWrap: 'break-word' }} noWrap={false} maxRows={2}>
          {description}
        </Typography>
        <Button variant='contained' color='primary' startIcon={<PlayArrow />} sx={{ marginTop: 1 }}>
          İzle
        </Button>
      </Box>
    </Box>
  )
}
