import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout } from '../store/authSlice'
import logo from '../assets/argentBankLogo.png'

export default function Header() {
  const { isAuthenticated, user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.userName || user?.email || 'User'}
            </Link>
            <a className="main-nav-item" href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
