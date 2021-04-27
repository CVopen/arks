import './index.scss'
export default function NoFound() {
  return (
    <div className="no-found">
      <img src={require('./../../assets/images/error-404.svg').default} alt="404"/>
    </div>
  )
}