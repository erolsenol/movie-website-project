// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { useEffect, useState } from 'react'

const SecondPage = () => {
  const [canvas, setCanvas] = useState(null)
  const [ctx, setCtx] = useState(null)

  useEffect(function () {
    const getCanvas = document.getElementById('image-canvas')
    setCanvas(getCanvas)
    const getCtx = getCanvas.getContext('2d')
    setCtx(getCtx)

    var img1 = new Image(500, 500)
    img1.onload = function (e) {
      console.log('123', e)

      if (!canvas || !ctx) return

      console.log('@@@@@@', e)

      canvas.width = e.naturalWidth
      canvas.height = e.naturalHeight

      console.log(ctx)

      ctx.drawImage(e, 0, 0)
      ctx.drawImage(e, 0, 0, e.width, e.height)
    }
    img1.src = '/images/insaat.jpg'
  }, [])

  function drawImageActualSize() {
    console.log('123', this)

    if (!canvas || !ctx) return

    console.log('@@@@@@', this)

    canvas.width = this.naturalWidth
    canvas.height = this.naturalHeight

    console.log(ctx)

    ctx.drawImage(this, 0, 0)
    ctx.drawImage(this, 0, 0, this.width, this.height)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Awesome 🙌'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>This is your second page.</Typography>
            <Typography>
              Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot cake dragée chupa chups jujubes.
              Macaroon liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.
            </Typography>

            <canvas width='300' height='300' id='image-canvas'>
              {/* <img src='' width='150' height='150' alt='A clock' /> */}
            </canvas>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecondPage
