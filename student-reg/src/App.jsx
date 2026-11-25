import { useState } from 'react'
import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    course: '',
    password: '',
    confirmPassword: ''
  })

  // GET TODAY'S DATE
  const today = new Date()

  const todayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-')

  // HANDLE INPUT
  function handleChange(e) {
    const { name, value } = e.target

    if (name === 'name') {
      const cleanName = value
        .replace(/[^\p{L} ]/gu, '')
        .slice(0, 30)

      setForm(prev => ({ ...prev, name: cleanName }))
    }

    else if (name === 'phone') {
      const cleanPhone = value
        .replace(/[^0-9]/g, '')
        .slice(0, 10)

      setForm(prev => ({ ...prev, phone: cleanPhone }))
    }

    else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  // CALCULATE AGE
  function calculateAge(dob) {
    if (!dob) return ''

    const birthDate = new Date(dob + 'T00:00:00')
    const currentDate = new Date()

    let age =
      currentDate.getFullYear() - birthDate.getFullYear()

    const month =
      currentDate.getMonth() - birthDate.getMonth()

    if (
      month < 0 ||
      (month === 0 &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  // FORM VALIDATION
  function handleSubmit(e) {
    e.preventDefault()

    // NAME VALIDATION
    const name = form.name.trim()

    if (!name) {
      alert('Please enter your name!')
      return
    }

    if (!/^[\p{L} ]+$/u.test(name)) {
      alert('Name must contain letters only!')
      return
    }

    if (name.length < 3 || name.length > 30) {
      alert('Name must contain 3 to 30 characters!')
      return
    }

    // EMAIL VALIDATION
    const email = form.email.trim()

    const emailPattern =
      /^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

    if (!email) {
      alert('Please enter your email!')
      return
    }

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address!')
      return
    }

    // PHONE VALIDATION
    if (!/^[6-9][0-9]{9}$/.test(form.phone)) {
      alert('Enter a valid 10-digit Indian mobile number!')
      return
    }

    // DOB VALIDATION
    if (!form.dob) {
      alert('Please select your Date of Birth!')
      return
    }

    if (form.dob >= todayDate) {
      alert('Date of Birth cannot be today or future date!')
      return
    }

    // AGE VALIDATION
    const age = calculateAge(form.dob)

    if (age < 16 || age > 100) {
      alert('Age must be between 16 and 100 years!')
      return
    }

    // GENDER VALIDATION
    const validGenders = ['Female', 'Male', 'Other']

    if (!validGenders.includes(form.gender)) {
      alert('Please select a valid Gender!')
      return
    }

    // COURSE VALIDATION
    const validCourses = [
      'BCA',
      'B.Tech',
      'B.Com',
      'B.Voc Software Development',
      'MCA'
    ]

    if (!validCourses.includes(form.course)) {
      alert('Please select a valid Course!')
      return
    }

    // PASSWORD VALIDATION
    if (form.password.length < 8) {
      alert('Password must contain at least 8 characters!')
      return
    }

    if (!/[A-Z]/.test(form.password)) {
      alert('Password must contain one uppercase letter!')
      return
    }

    if (!/[a-z]/.test(form.password)) {
      alert('Password must contain one lowercase letter!')
      return
    }

    if (!/[0-9]/.test(form.password)) {
      alert('Password must contain at least one number!')
      return
    }

    if (!/[^A-Za-z0-9]/.test(form.password)) {
      alert('Password must contain one special character!')
      return
    }

    // CONFIRM PASSWORD
    if (!form.confirmPassword) {
      alert('Please confirm your password!')
      return
    }

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    // SUCCESS
    setForm(prev => ({
      ...prev,
      name,
      email
    }))

    setSuccess(true)
  }

  // RESET FORM
  function resetForm() {
    setForm({
      name: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      course: '',
      password: '',
      confirmPassword: ''
    })

    setSuccess(false)
    setShowPassword(false)
  }

  return (
    <div className="page">

      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="main-container">

        {/* LEFT SECTION */}
        <div className="left-section">

          <div className="brand">
            <span className="brand-icon">✦</span>
            EduRegister
          </div>

          <div className="welcome">

            <span className="tag">✦ STUDENT PORTAL</span>

            <h1>
              Start Your
              <span> Journey </span>
              With Us.
            </h1>

            <p>
              Join our learning community and take the
              first step towards building your future.
            </p>

            <div className="features">
              <div>✓ Easy Registration</div>
              <div>✓ Quality Education</div>
              <div>✓ Build Your Future</div>
            </div>

          </div>

          <p className="left-footer">
            © 2026 EduRegister. All rights reserved.
          </p>

        </div>

        {/* RIGHT SECTION */}
        <div className="right-section">

          {!success ? (

            <>

              <div className="form-heading">

                <div className="form-icon">🎓</div>

                <h2>Create Account</h2>

                <p>Fill in your details to register</p>

              </div>

              <form onSubmit={handleSubmit}>

                {/* NAME */}
                <div className="input-group">

                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    minLength="3"
                    maxLength="30"
                    required
                  />

                </div>

                {/* EMAIL */}
                <div className="input-group">

                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="row">

                  {/* PHONE NUMBER */}
                  <div className="input-group">

                    <label>Phone Number</label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="10 digit number"
                      value={form.phone}
                      onChange={handleChange}
                      maxLength="10"
                      required
                    />

                  </div>

                  {/* DATE OF BIRTH */}
                  <div className="input-group">

                    <label>Date of Birth</label>

                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      max={todayDate}
                      required
                    />

                  </div>

                </div>

                {/* AGE DISPLAY */}
                {form.dob && form.dob < todayDate && (

                  <p>
                    Age: {calculateAge(form.dob)} years
                  </p>

                )}

                <div className="row">

                  {/* GENDER */}
                  <div className="input-group">

                    <label>Gender</label>

                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      required
                    >

                      <option value="">Select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>

                    </select>

                  </div>

                  {/* COURSE */}
                  <div className="input-group">

                    <label>Course</label>

                    <select
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      required
                    >

                      <option value="">Select Course</option>
                      <option value="BCA">BCA</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.Com">B.Com</option>

                      <option value="B.Voc Software Development">
                        B.Voc Software Development
                      </option>

                      <option value="MCA">MCA</option>

                    </select>

                  </div>

                </div>

                {/* PASSWORD */}
                <div className="input-group">

                  <label>Password</label>

                  <div className="password-field">

                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Create password"
                      value={form.password}
                      onChange={handleChange}
                      minLength="8"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>

                  </div>

                  <small>
                    Minimum 8 characters, uppercase, lowercase,
                    number and special character.
                  </small>

                </div>

                {/* CONFIRM PASSWORD */}
                <div className="input-group">

                  <label>Confirm Password</label>

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* SUBMIT BUTTON */}
                <button type="submit" className="register-btn">
                  Create Account <span>→</span>
                </button>

                {/* RESET BUTTON */}
                <button
                  type="button"
                  className="reset-btn"
                  onClick={resetForm}
                >
                  Reset Form
                </button>

              </form>

            </>

          ) : (

            /* SUCCESS MESSAGE */
            <div className="success-box">

              <div className="success-icon">✓</div>

              <h2>Registration Successful!</h2>

              <p>
                Welcome, <strong>{form.name}</strong>!
                Your registration form has been submitted successfully.
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="register-btn"
              >
                Register Another Student →
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default App