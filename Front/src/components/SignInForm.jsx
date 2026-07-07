import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginStart, loginSuccess, loginFailure, clearError } from '../store/authSlice'
import { loginUser } from '../services/api'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(loginStart())
    
    try {
      const data = await loginUser(email, password)
      dispatch(loginSuccess({
        token: data.body.token,
        user: {}
      }))
    } catch (err) {
      dispatch(loginFailure(err.message))
    }
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="sign-in-button" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </section>
  )
}
