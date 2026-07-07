import Header from '../components/Header'
import Footer from '../components/Footer'
import SignInForm from '../components/SignInForm'

export default function SignIn() {
  return (
    <div className="app">
      <Header />
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </div>
  )
}
