import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', minHeight: '90vh', textAlign: 'center' }}>

      <img src="/penguin-happy.png" alt="" style={{ width: 140, marginBottom: 20,
        animation: 'bob 2.5s ease-in-out infinite' }} />

      <h1 className="h1" style={{ marginBottom: 14 }}>hey you 🐧</h1>
      <p className="lead" style={{ margin: '0 auto 36px' }}>
        I made something small for you. wanna see?
      </p>

      <Link to="/meter" className="btn">let's go →</Link>
    </div>
  )
}
