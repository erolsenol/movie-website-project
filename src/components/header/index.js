import { Grid, AppBar, Toolbar, Typography, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import Autocomplete from '@mui/material/Autocomplete'

const Header = props => {
  const handleInputChange = event => {
    // İstediğiniz işlemleri burada gerçekleştirebilirsiniz
  }

  return (
    <AppBar position='static' style={{ backgroundColor: '#000' }}>
      <Toolbar>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm={6} container spacing={2} style={{ justifyContent: 'center', transition: 'all 0.3s' }}>
            <Typography variant='h1' style={{ fontWeight: 'bold', fontSize: 24, color: '#e50914' }}>
              HdFilmCehennemi
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} style={{ transition: 'all 0.3s' }}>
            <Autocomplete
              freeSolo
              options={['Movie 1', 'Movie 2', 'Movie 3']}
              onChange={handleInputChange}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder='Ara...'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <div style={{ color: '#fff', padding: 4 }}>
                        <SearchIcon />
                      </div>
                    )
                  }}
                  style={{
                    color: '#fff',
                    backgroundColor: '#333',
                    borderRadius: 4,
                    width: '100%',
                    transition: 'all 0.3s'
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
