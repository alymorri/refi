'use client';

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Loading.module.css'

export default function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cityState, setCityState] = useState({ city: '', state: '' })
  const [hasNavigated, setHasNavigated] = useState(false)

  console.log('[v0] Loading component mounted')
  console.log('[v0] Location state:', location.state)

  useEffect(() => {
    console.log('[v0] Fetch useEffect triggered')
    // Fetch location based on zip code entered by user
    const fetchLocationFromZip = async () => {
      try {
        const zipCode = location.state?.zipCode
        console.log('[v0] Zip code from state:', zipCode)
        
        if (zipCode) {
          // Use US ZIP code API to get city and state
          const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
          const data = await response.json()
          console.log('[v0] Zip code location data:', JSON.stringify(data, null, 2))
          console.log('[v0] State from API:', data.state)
          
          if (data.places && data.places.length > 0) {
            const place = data.places[0]
            const city = place['place name'] || 'Your Area'
            const state = data.state || 'USA'
            console.log('[v0] Setting cityState to:', { city, state })
            setCityState({ city, state })
          } else {
            console.log('[v0] No places found in response')
            setCityState({ city: 'Your Area', state: 'USA' })
          }
        } else {
          console.log('[v0] No zip code provided')
          setCityState({ city: 'Your Area', state: 'USA' })
        }
      } catch (error) {
        console.log('[v0] Zip code location fetch failed:', error)
        setCityState({ city: 'Your Area', state: 'USA' })
      }
    }

    fetchLocationFromZip()
  }, [location.state?.zipCode])

  // Separate effect for navigation - runs after fetch completes
  useEffect(() => {
    if (hasNavigated) return // Prevent duplicate navigations
    
    console.log('[v0] Navigation effect triggered, cityState:', cityState)
    const loadingDuration = 3000
    
    const timer = setTimeout(() => {
      if (hasNavigated) return // Double-check before navigating
      
      console.log('[v0] Timeout fired, navigating to congratulations')
      console.log('[v0] Passing cityState:', cityState)
      setHasNavigated(true)
      navigate('/congratulations', {
        state: {
          ...location.state,
          cityState: cityState,
        },
      })
    }, loadingDuration)

    return () => clearTimeout(timer)
  }, [cityState, hasNavigated, navigate, location.state])

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
