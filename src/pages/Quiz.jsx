'use client';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Quiz.module.css'

export default function Quiz() {
  const navigate = useNavigate()
  const [selectedScore, setSelectedScore] = useState(null)

  const creditScores = [
    { range: '500 - 639', label: 'Fair', color: '#dc2626' },
    { range: '640 - 699', label: 'Good', color: '#059669' },
    { range: '700+', label: 'Excellent', color: '#22c55e' },
  ]

  const handleSelectScore = (score) => {
    console.log('[v0] Selected score:', score)
    setSelectedScore(score)
    // Navigate to loading page after a brief delay
    setTimeout(() => {
      console.log('[v0] Navigating to /loading')
      navigate('/loading', {
        state: { creditScore: score },
      })
    }, 300)
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.newsBar}>
          <span className={styles.newsLabel}>2026 SPECIAL REPORT</span>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={styles.title}>What is your credit score?</h2>

          <div className={styles.optionsContainer}>
            {creditScores.map((score, idx) => (
              <button
                key={idx}
                className={`${styles.option} ${selectedScore?.range === score.range ? styles.selected : ''}`}
                onClick={() => handleSelectScore(score)}
                style={{
                  backgroundColor: score.color,
                  opacity: selectedScore && selectedScore.range !== score.range ? 0.5 : 1,
                }}
              >
                {score.range}
                <span className={styles.label}>({score.label})</span>
              </button>
            ))}
          </div>

          <p className={styles.disclaimer}>
            Select your credit score range to see how much you could potentially cash out
          </p>
        </div>
      </main>
    </div>
  )
}
