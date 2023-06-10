import ContentImage from 'src/components/contentImage'
import MovieSlider from 'src/components/movieSlider'

const HomeContent = () => {
  const imageUrl =
    'https://www.donanimhaber.com/images/images/haber/158747/1400x788harry-potter-film-serisi-izleme-sirasi.jpg'

  const movieName =
    'Film İsmi Lorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis neque'

  const description =
    'Lorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis nequeLorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis nequeLorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis nequeLorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis neque'

  const movieCategory = [
    'Aksiyon Filmleri',
    'Bilim Kurgu Filmleri',
    'Fantastik Filmler',
    'Gerilim Filmleri',
    'Macera Filmleri',
    'Animasyon Filmleri',
    'Komedi Filmleri',
    'Dram Filmleri',
    'Blu Ray Filmler',
    'Aile Filmleri',
    'Belgeseller',
    'Animasyon Filmleri',
    'Korku Filmleri'
  ]

  const carouselCount = 4

  const carousels = movieCategory.map((category, index) => <MovieSlider category={category} key={index} />)

  return (
    <div>
      <ContentImage imageUrl={imageUrl} movieName={movieName} description={description} />

      {carousels}
    </div>
  )
}

export default HomeContent
