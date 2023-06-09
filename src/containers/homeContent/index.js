import ContentImage from 'src/components/content-image'
import MovieCarousel from 'src/components/movie-slider'

const HomeContent = () => {
  const imageUrl =
    'https://www.donanimhaber.com/images/images/haber/158747/1400x788harry-potter-film-serisi-izleme-sirasi.jpg'
  const movieName =
    'Film İsmi Lorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis neque'
  const description =
    'Lorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis nequeLorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis nequeLorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis nequeLorem ipsum dolr sit amet, consectetur adipiscing elit. Vestibulum dignissim venenatis neque'

  const carouselCount = 4
  const carousels = Array.from({ length: carouselCount }, (_, index) => <MovieCarousel key={index} />)

  return (
    <div>
      <ContentImage imageUrl={imageUrl} movieName={movieName} description={description} />

      {carousels}
    </div>
  )
}

export default HomeContent
