import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAppSelector(state => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}
