import MovieCarousel from 'src/components/movieCarousel'
import MovieHeadCard from 'src/components/movieHeadCard'

const HomeContent = () => {
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

  return (
    <>
      <MovieHeadCard />

      {movieCategory.map((category, index) => (
        <MovieCarousel category={category} key={index} />
      ))}
    </>
  )
}

export default HomeContent
