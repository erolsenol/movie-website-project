import React from 'react'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

import Header from 'src/components/header'
import Footer from 'src/components/footer'

const Yok = styled(Box)`
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh;
`

const ContentContainer = styled(Container)`
  padding-top: 80px; /* Header yüksekliği kadar boşluk */
  padding-bottom: 60px; /* Footer yüksekliği kadar boşluk */
`

const FilmCard = styled(Box)`
  width: 200px;
  height: 300px;
  background-color: #333333;
  color: #ffffff;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Films() {
  const data = [
    { id: 1, name: 'Film 1' },
    { id: 2, name: 'Film 2' },
    { id: 3, name: 'Film 3' },
    { id: 4, name: 'Film 4' },
    { id: 5, name: 'Film 5' },
    { id: 6, name: 'Film 6' },
    { id: 7, name: 'Film 7' },
    { id: 8, name: 'Film 8' },
    { id: 9, name: 'Film 9' },
    { id: 10, name: 'Film 10' },
    { id: 11, name: 'Film 11' },
    { id: 12, name: 'Film 12' },
    { id: 13, name: 'Film 13' },
    { id: 14, name: 'Film 14' }
  ]

  const renderFilmCards = () => {
    return data.map(film => (
      <FilmCard key={film.id}>
        <span>{film.name}</span>
      </FilmCard>
    ))
  }

  return (
    <Yok>
      <Header />
      <ContentContainer>
        <Box mb={4}></Box>
      </ContentContainer>
      <Footer />
    </Yok>
  )
}
