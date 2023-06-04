import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { useAuth } from 'src/hooks/useAuth'

const Movies = ({ posts }) => {
  const auth = useAuth()

  async function dataFetch() {
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
    setMovies(pageInit.results)
    setPagination({ page: pageInit.page, limit: pageInit.limit, totalPages: pageInit.totalPages })
    setLoading(false)
  }

  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, totalPages: 0 })

  useEffect(() => {
    dataFetch()
  }, [])

  return (
    <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {movies.map((movie, index) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
          <Card sx={{ minWidth: 300 }}>
            <CardHeader title={movie.title}></CardHeader>
            <CardContent>
              <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
              <Typography color='brown[500]'>
                Please make sure to read our Template Documentation to understand where to go from here and how to use
                our template.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Movies
