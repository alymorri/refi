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
    // Fetch user's location based on IP
    const fetchLocation = async () => {
      try {
        console.log('[v0] Fetching IP location...')
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        console.log('[v0] IP location data:', data)
        const city = data.city || 'Your Area'
        const state = data.region || 'USA'
        setCityState({ city, state })
      } catch (error) {
        console.log('[v0] IP location fetch failed:', error)
        setCityState({ city: 'Your Area', state: 'USA' })
      }
    }

    fetchLocation()
  }, [])

  useEffect(() => {
    console.log('[v0] Timer useEffect triggered')
    // Simulate realistic loading with random duration (3-5 seconds)
    const loadingDuration = 3000 // Fixed 3 seconds for testing
    console.log('[v0] Loading duration set to:', loadingDuration)
    
    const timer = setTimeout(() => {
      console.log('[v0] Timeout fired, navigating to congratulations')
      navigate('/congratulations', {
        state: location.state,
      })
    }, loadingDuration)

    return () => {
      console.log('[v0] Cleaning up timer')
      clearTimeout(timer)
    }
  }, [navigate, location.state])

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
