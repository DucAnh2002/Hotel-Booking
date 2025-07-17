import React, { useEffect, useState } from 'react'
import style from './Header.module.css'
import Navbar from '../Navbar/Navbar.jsx'

const images = ['/banner/banner1.jpg', '/banner/banner2.jpg', '/banner/banner4.jpg']

const Header = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setIndex(prev => (prev + 1) % images.length)
  }

  return (
    <div className={style.header}>
      <Navbar />
      <div className={style.slideshow}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`banner-${i}`} className={`${style.image} ${i === index ? style.active : ''}`} />
        ))}
        <button className={`${style.navButton} ${style.prev}`} onClick={handlePrev}>
          ‹
        </button>
        <button className={`${style.navButton} ${style.next}`} onClick={handleNext}>
          ›
        </button>
      </div>
    </div>
  )
}

export default Header
