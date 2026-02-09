'use client';

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Loading.module.css'

export default function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cityState, setCityState] = useState({ city: '', state: '' })

  console.log('[v0] Loading component mounted')
  console.log('[v0] Location state:', location.state)

  useEffect(() => {
    console.log('[v0] Loading useEffect triggered')
    // Fetch location based on zip code entered by user
    const fetchLocationFromZip = async () => {
      try {
        const zipCode = location.state?.zipCode
        console.log('[v0] Zip code from state:', zipCode)
        
        if (zipCode) {
          // Use US ZIP code API to get city and state
          const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
          const data = await response.json()
          console.log('[v0] Zip code location data:', data)
          
          if (data.places && data.places.length > 0) {
            const place = data.places[0]
            const city = place['place name'] || 'Your Area'
            const state = data.state || 'USA'
            setCityState({ city, state })
          } else {
            setCityState({ city: 'Your Area', state: 'USA' })
          }
        } else {
          setCityState({ city: 'Your Area', state: 'USA' })
        }
      } catch (error) {
        console.log('[v0] Zip code location fetch failed:', error)
        setCityState({ city: 'Your Area', state: 'USA' })
      }
    }

    fetchLocationFromZip()
  }, [])

  useEffect(() => {
    console.log('[v0] Timer useEffect triggered')
    // Simulate realistic loading with random duration (3-5 seconds)
    const loadingDuration = 3000 // Fixed 3 seconds for testing
    console.log('[v0] Loading duration set to:', loadingDuration)
    
    const timer = setTimeout(() => {
      console.log('[v0] Timeout fired, navigating to congratulations')
      console.log('[v0] Passing cityState:', cityState)
      navigate('/congratulations', {
        state: {
          ...location.state,
          cityState: cityState,
        },
      })
    }, loadingDuration)

    return () => {
      console.log('[v0] Cleaning up timer')
      clearTimeout(timer)
    }
  }, [navigate, location.state, cityState])

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
