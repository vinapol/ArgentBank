import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setLoading, updateProfile } from '../store/authSlice'
import { getUserProfile } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserHeader from '../components/UserHeader'
import Account from '../components/Account'

export default function Profile() {
  const { user, token, isAuthenticated } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          dispatch(setLoading(true))
          const data = await getUserProfile(token)
          dispatch(updateProfile(data.body))
        } catch (err) {
          console.error('Failed to fetch profile:', err)
        } finally {
          dispatch(setLoading(false))
        }
      }
    }
    fetchProfile()
  }, [token, dispatch])

  const accounts = user?.accounts?.map(account => ({
    title: account.title,
    amount: `$${account.amount}`,
    amountDescription: account.amountDescription || 'Available Balance'
  })) || [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      amountDescription: 'Available Balance'
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      amountDescription: 'Available Balance'
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      amountDescription: 'Current Balance'
    }
  ]


  return (
    <div className="app">
      <Header />
      <main className="main bg-dark">
        <UserHeader />
        <h2 className="sr-only">Accounts</h2>
        {accounts.map((account, index) => (
          <Account key={index} {...account} />
        ))}
      </main>
      <Footer />
    </div>
  )
}
