// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const Home = () => {
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <Grid container spacing={3}>
      {myArray.map((item, index) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
          <Card sx={{ minWidth: 300 }}>
            <CardHeader title='Kick start your project 🚀'></CardHeader>
            <CardContent>
              <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
              <Typography>
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

export default Home
