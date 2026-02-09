'use client';

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Congratulations.module.css'

export default function Congratulations() {
  const navigate = useNavigate()
  const location = useLocation()
  const [displayAmount, setDisplayAmount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [cityState, setCityState] = useState({ city: 'Your Area', state: 'USA' })
  const targetAmount = 183598

  // Fetch location from zip code or use passed data from Loading
  useEffect(() => {
    console.log('[v0] Location state received:', location.state)
    
    // If cityState was passed from Loading, use it
    if (location.state?.cityState) {
      console.log('[v0] Using cityState from Loading:', location.state.cityState)
      setCityState(location.state.cityState)
    } else {
      // Fallback: Try to fetch from zip code if available
      const fetchLocationFromZip = async () => {
        try {
          const zipCode = location.state?.zipCode
          console.log('[v0] Zip code from state:', zipCode)
          
          if (zipCode) {
            const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
            const data = await response.json()
            console.log('[v0] Full API Response:', JSON.stringify(data, null, 2))
            
            if (data.places && data.places.length > 0) {
              const place = data.places[0]
              const city = place['place name'] || 'Your Area'
              const stateAbbr = data.state || 'USA'
              console.log('[v0] Extracted State Abbreviation:', stateAbbr)
              setCityState({ city, state: stateAbbr })
            } else {
              console.log('[v0] No places found in response')
              setCityState({ city: 'Your Area', state: 'USA' })
            }
          } else {
            console.log('[v0] No zip code provided')
          }
        } catch (error) {
          console.log('[v0] Zip code location fetch failed:', error)
          setCityState({ city: 'Your Area', state: 'USA' })
        }
      }

      fetchLocationFromZip()
    }
  }, [])

  // Animated counter
  useEffect(() => {
    const duration = 3000 // 3 seconds
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentAmount = Math.floor(progress * targetAmount)
      setDisplayAmount(currentAmount)

      if (progress >= 1) {
        clearInterval(interval)
      }
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [])

  // 5-minute countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleFillForm = () => {
    const creditScore = location.state?.creditScore
    console.log('[v0] Credit score from state:', creditScore)

    // Define URLs based on credit score
    const urlMap = {
      'Fair': 'https://example.com/fair-credit-offer',
      'Good': 'https://example.com/good-credit-offer',
      'Excellent': 'https://example.com/excellent-credit-offer',
    }

    const url = urlMap[creditScore] || 'https://example.com/default-offer'
    
    // Open in new tab or navigate
    window.location.href = url
  }

  // Format countdown time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Format amount with decimal places
  const formattedAmount = (displayAmount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

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
          {/* Congratulations Message */}
          <div className={styles.congratsSection}>
            <h1 className={styles.mainTitle}>Congratulations!</h1>
            <p className={styles.subtitle}>You Are Approved For A Payment Of</p>

            {/* Animated Counter with Image Background */}
            <div
              className={styles.amountBox}
              style={{
                backgroundImage: 'url(https://i.postimg.cc/j5tRbyJz/Chat-GPT-Image-Feb-6-2026-06-22-57-AM-(2).png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className={styles.amountContent}>
                <div className={styles.amountDisplay}>
                  <span className={styles.currencySymbol}>$</span><span className={styles.amount}>{formattedAmount}</span>
                </div>
                <div className={styles.approvalBadge}>✓ APPROVED</div>
              </div>
            </div>

            {/* Qualification Info Box */}
            <div className={styles.qualificationBox}>
              <p className={styles.qualificationText}>
                {cityState.state} Approved: Claim your cash-out amount now
              </p>
            </div>

            {/* Next Steps Box */}
            <div className={styles.nextStepsBox}>
              <h2 className={styles.nextStepsTitle}>Next Steps:</h2>
              <p className={styles.nextStepsText}>
                Click the button below to release your approved cash-out funds now
              </p>
            </div>

            {/* CTA Button */}
            <button className={styles.ctaButton} onClick={handleFillForm}>
              FILL OUT FORM NOW TO ACCESS YOUR CASH
              <span className={styles.arrow}>→</span>
            </button>

            {/* Urgency Message with Timer */}
            <div className={styles.timerContainer}>
              <p className={styles.timerLabel}>Offer expires in:</p>
              <div className={styles.timer}>{formatTime(timeLeft)}</div>
            </div>

            {/* Bank Check Image */}
            <div className={styles.checkWrap}>
              <img
                src="https://i.postimg.cc/j5tRbyJz/Chat-GPT-Image-Feb-6-2026-06-22-57-AM-(2).png"
                alt="Approval Check"
                className={styles.checkImage}
              />
            </div>

            {/* Key Benefits */}
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>⚡</div>
                <div className={styles.benefitTitle}>Fast Funding</div>
                <div className={styles.benefitText}>As soon as 3-5 days</div>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🔒</div>
                <div className={styles.benefitTitle}>No Hidden Fees</div>
                <div className={styles.benefitText}>Complete transparency</div>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📊</div>
                <div className={styles.benefitTitle}>Lower Payments</div>
                <div className={styles.benefitText}>Potentially reduce your mortgage</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
