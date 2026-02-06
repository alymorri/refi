'use client';

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Congratulations.module.css'

export default function Congratulations() {
  const navigate = useNavigate()
  const location = useLocation()
  const [displayAmount, setDisplayAmount] = useState(0)
  const targetAmount = 183598

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

  const handleFillForm = () => {
    navigate('/form')
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
                Based on your credit profile and home equity, you qualify for this cash-out amount!
              </p>
            </div>

            {/* Bank Check Image */}
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

            {/* Next Steps Box */}
            <div className={styles.nextStepsBox}>
              <h2 className={styles.nextStepsTitle}>Next Steps:</h2>
              <p className={styles.nextStepsText}>
                Fill out the form below to access your cash-out funds. Your dedicated loan specialist will verify your
                information and guide you through the entire process.
              </p>
            </div>

            {/* CTA Button */}
            <button className={styles.ctaButton} onClick={handleFillForm}>
              FILL OUT FORM NOW TO ACCESS YOUR CASH
              <span className={styles.arrow}>→</span>
            </button>

            {/* Urgency Message */}
            <p className={styles.urgencyText}>
              This offer is limited. Secure your approval now before funding runs out!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
