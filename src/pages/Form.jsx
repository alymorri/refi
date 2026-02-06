'use client';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Form.module.css'

export default function Form() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    homeValue: '',
    mortgageBalance: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)

    // Show success message and redirect after 2 seconds
    setTimeout(() => {
      navigate('/')
    }, 3000)
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
          {!submitted ? (
            <>
              <h1 className={styles.title}>Complete Your Application</h1>
              <p className={styles.subtitle}>
                Fill out the form below to access your $185,000 cash-out approval
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className={styles.formGroup}>
                  <div className={styles.twoColumn}>
                    <div className={styles.field}>
                      <label htmlFor="firstName" className={styles.label}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="John"
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="lastName" className={styles.label}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* ZIP Code */}
                <div className={styles.field}>
                  <label htmlFor="zipCode" className={styles.label}>
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="12345"
                  />
                </div>

                {/* Home Value */}
                <div className={styles.field}>
                  <label htmlFor="homeValue" className={styles.label}>
                    Estimated Home Value *
                  </label>
                  <input
                    type="number"
                    id="homeValue"
                    name="homeValue"
                    value={formData.homeValue}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="500000"
                  />
                </div>

                {/* Mortgage Balance */}
                <div className={styles.field}>
                  <label htmlFor="mortgageBalance" className={styles.label}>
                    Current Mortgage Balance *
                  </label>
                  <input
                    type="number"
                    id="mortgageBalance"
                    name="mortgageBalance"
                    value={formData.mortgageBalance}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="350000"
                  />
                </div>

                {/* Disclaimer */}
                <div className={styles.disclaimer}>
                  <p>
                    By submitting this form, you consent to be contacted by our loan specialists at the phone number
                    and email provided. This is not a credit application and does not impact your credit score.
                  </p>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                  SUBMIT APPLICATION
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successTitle}>Application Submitted!</h2>
              <p className={styles.successText}>
                Thank you for completing your application. A loan specialist will contact you shortly to finalize your
                $185,000 cash-out approval.
              </p>
              <p className={styles.successSubtext}>Redirecting you back home...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
