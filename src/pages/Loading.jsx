'use client';

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Loading.module.css'

export default function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cityState, setCityState] = useState({ city: '', state: '' })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Fetch location based on zip code entered by user
    const fetchLocationFromZip = async () => {
      try {
        const zipCode = location.state?.zipCode
        
        if (zipCode) {
          // Use US ZIP code API to get city and state
          const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
          const data = await response.json()
          
          if (data.places && data.places.length > 0) {
            const place = data.places[0]
            const city = place['place name'] || 'Your Area'
            const state = data.state || 'USA'
            setCityState({ city, state })
            setIsReady(true)
          } else {
            setCityState({ city: 'Your Area', state: 'USA' })
            setIsReady(true)
          }
        } else {
          setCityState({ city: 'Your Area', state: 'USA' })
          setIsReady(true)
        }
      } catch (error) {
        setCityState({ city: 'Your Area', state: 'USA' })
        setIsReady(true)
      }
    }

    fetchLocationFromZip()
  }, [location.state?.zipCode])

  // Separate effect for navigation - waits until fetch is complete
  useEffect(() => {
    if (!isReady) return
    
    const loadingDuration = 3000
    
    const timer = setTimeout(() => {
      navigate('/congratulations', {
        state: {
          ...location.state,
          cityState: cityState,
        },
      })
    }, loadingDuration)

    return () => clearTimeout(timer)
  }, [isReady, cityState, navigate, location.state])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Finding Your Best Options</h1>

        <p className={styles.location}>
          Checking availability in <span className={styles.highlight}>{cityState.city}, {cityState.state}</span>
        </p>

        {/* Loading animation */}
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <div className={styles.pulseCircles}>
            <div className={styles.pulse}></div>
            <div className={styles.pulse}></div>
            <div className={styles.pulse}></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>

        <p className={styles.status}>Analyzing your profile...</p>
      </div>
    </div>
  )
}
