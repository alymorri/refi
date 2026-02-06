'use client';

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('United States')
  const [zipCode, setZipCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            const data = await response.json()
            const city = data.address?.city || data.address?.town || data.address?.village || ''
            const state = data.address?.state || 'United States'
            const displayLocation = city && city !== state ? `${city}, ${state}` : state
            setLocation(displayLocation)
          } catch (error) {
            console.log('[v0] Geolocation reverse lookup failed:', error)
            setLocation('United States')
          }
        },
        () => {
          setLocation('United States')
        }
      )
    }
  }, [])

  const handleZipCodeSubmit = (e) => {
    e.preventDefault()
    
    // Validate zip code (5 digits)
    const zipRegex = /^\d{5}(-\d{4})?$/
    if (!zipRegex.test(zipCode)) {
      setError('Please enter a valid 5-digit zip code')
      return
    }
    
    console.log('[v0] Zip code submitted:', zipCode)
    setError('')
    setTimeout(() => {
      navigate('/loading', { state: { zipCode: zipCode } })
    }, 300)
  }

  return (
    <div className={styles.container}>
      {/* Government Header */}
      <div className={styles.govHeader}>
        <div className={styles.govBar}>
          <div className={styles.govSeal}>★</div>
          <div>
            <div className={styles.govAgency}>FEDERAL HOUSING ADMINISTRATION</div>
            <div className={styles.govProgram}>HOME EQUITY ACCESS PROGRAM</div>
          </div>
          <div className={styles.govSeal}>★</div>
        </div>
      </div>

      {/* News Banner */}
      <div className={styles.newsBanner}>
        <span className={styles.newsLabel}>2026 OFFICIAL NOTICE</span>
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Headline */}
          <h1 className={styles.headline}>
            Homeowners in {location} Now Eligible for Cash-Out Up to{' '}
            <span className={styles.highlight}>$185,000</span>
          </h1>

          {/* Quick Description */}
          <p className={styles.subheadline}>
            Check your eligibility in under 2 minutes. No obligation. No credit impact.
          </p>

          {/* Zip Code Section */}
          <div className={styles.quizContainer}>
            <h2 className={styles.quizTitle}>What is your zip code?</h2>
            
            <form onSubmit={handleZipCodeSubmit} className={styles.zipForm}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="Enter 5-digit zip code"
                  className={styles.zipInput}
                  maxLength="5"
                />
              </div>
              {error && <p className={styles.errorMessage}>{error}</p>}
              <button 
                type="submit"
                className={styles.submitButton}
              >
                Check Eligibility
              </button>
            </form>
          </div>

          {/* Requirements */}
          <div className={styles.requirements}>
            <h3 className={styles.reqTitle}>Eligibility Requirements:</h3>
            <div className={styles.reqList}>
              <div className={styles.reqItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Must be a U.S. Citizen</span>
              </div>
              <div className={styles.reqItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Must own your home</span>
              </div>
              <div className={styles.reqItem}>
                <span className={styles.checkmark}>✓</span>
                <span>Credit score 500+</span>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <p className={styles.footerNotice}>
            This is not an offer to enter into an agreement. Not all customers will qualify. Information, rates and programs are subject to change without notice.
          </p>
        </div>
      </main>
    </div>
  )
}
