'use client';

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  const navigate = useNavigate()
  const [state, setState] = useState('...')
  const [selectedScore, setSelectedScore] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setState('United States')
        },
        () => {
          setState('United States')
        }
      )
    }
  }, [])

  const handleCreditSelect = (score) => {
    setSelectedScore(score)
    setTimeout(() => {
      navigate('/congratulations', { state: { creditScore: score } })
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
            Homeowners in {state} Now Eligible for Cash-Out Up to{' '}
            <span className={styles.highlight}>$185,000</span>
          </h1>

          {/* Quick Description */}
          <p className={styles.subheadline}>
            Check your eligibility in under 2 minutes. No obligation. No credit impact.
          </p>

          {/* Quiz Section */}
          <div className={styles.quizContainer}>
            <h2 className={styles.quizTitle}>What is your credit score?</h2>
            
            <div className={styles.quizOptions}>
              <button 
                className={`${styles.creditButton} ${styles.fair} ${selectedScore === 'fair' ? styles.selected : ''}`}
                onClick={() => handleCreditSelect('fair')}
              >
                <span className={styles.scoreRange}>500 - 639</span>
                <span className={styles.scoreLabel}>Fair</span>
              </button>

              <button 
                className={`${styles.creditButton} ${styles.good} ${selectedScore === 'good' ? styles.selected : ''}`}
                onClick={() => handleCreditSelect('good')}
              >
                <span className={styles.scoreRange}>640 - 699</span>
                <span className={styles.scoreLabel}>Good</span>
              </button>

              <button 
                className={`${styles.creditButton} ${styles.excellent} ${selectedScore === 'excellent' ? styles.selected : ''}`}
                onClick={() => handleCreditSelect('excellent')}
              >
                <span className={styles.scoreRange}>700+</span>
                <span className={styles.scoreLabel}>Excellent</span>
              </button>
            </div>
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
