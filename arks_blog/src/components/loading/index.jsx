import Stroage from '@/utils/localStorage'

export default function Loading() {
  const bgc = JSON.parse(Stroage('get', 'theme')).colorbg
  return (
    <div style={{
      backgroundColor: bgc,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{fontSize: '30px'}}>Loading...</h1>
    </div>
  )
}
