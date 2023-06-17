'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './styles.module.css'

const Carousel = ({ slides }) => {
  const carouselRef = useRef(null)
  const slidesToShow = 14
  const slideWidth = 100 / slidesToShow

  const handleMouseScroll = e => {
    const delta = Math.sign(e.deltaY)
    carouselRef.current.scrollLeft += delta * slideWidth
  }

  useEffect(() => {
    const carouselContainer = carouselRef.current
    carouselContainer.addEventListener('wheel', handleMouseScroll)
    return () => {
      carouselContainer.removeEventListener('wheel', handleMouseScroll)
    }
  }, [])

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel} ref={carouselRef}>
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            <div className={styles.slideContent}>
              <Image src={slide.image} alt={slide.title} width={300} height={200} />
              <div className={styles.slideInfo}>
                <h3>{slide.title}</h3>
                <p>{slide.category}</p>
                <p>Rating: {slide.rating}</p>
              </div>
            </div>
          </div>
        ))}
        {slides.slice(0, slidesToShow).map((slide, index) => (
          <div className={styles.slide} key={index}>
            <div className={styles.slideContent}>
              <Image src={slide.image} alt={slide.title} width={300} height={200} />
              <div className={styles.slideInfo}>
                <h3>{slide.title}</h3>
                <p>{slide.category}</p>
                <p>Rating: {slide.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
