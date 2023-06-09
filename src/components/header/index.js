import { Grid, AppBar, Toolbar, Typography, styled, fade } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { keyframes } from '@emotion/react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-10px); /* Y ekseni üzerinde yukarı doğru kaydırma */
}
to {
  opacity: 1;
  transform: translateY(0); /* Y ekseni üzerinde kayma olmadan sıfır konumu */
}
`

const Header = styled(AppBar)`
  background-color: #000; /* Header arkaplan rengi */
  animation: ${fadeIn} 0.5s ease-in; /* Animasyon uygulama */
`

const Logo = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 24px;
    color: #e50914; /* Logo metin rengi */
    animation: ${fade} 0.5s ease-in; /* Logo için fade animasyonu */
  }
`

const SearchInput = styled(TextField)`
  && {
    color: #fff; /* Search input metin rengi */
    background-color: #333; /* Search input arkaplan rengi */
    border-radius: 4px;
    width: 100%;
    animation: ${fade} 0.5s ease-in; /* Search input için fade animasyonu */
  }
`

const SearchIconWrapper = styled('div')`
  && {
    color: #fff; /* Search icon rengi */
    padding: 4px;
  }
`

const HeaderComp = () => {
  return (
    <Header position='static'>
      <Toolbar>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm={6} spacing={2}>
            <Logo variant='h1'>HdFilmCehennemi</Logo>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              freeSolo
              options={['Movie 1', 'Movie 2', 'Movie 3']} // Arama seçeneklerini buraya ekleyebilirsin
              renderInput={params => (
                <SearchInput
                  {...params}
                  placeholder='Ara...'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                    )
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </Header>
  )
}

export default HeaderComp
