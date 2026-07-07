import iconChat from '../assets/icon-chat.png'
import iconMoney from '../assets/icon-money.png'
import iconSecurity from '../assets/icon-security.png'

const iconMap = {
  chat: iconChat,
  money: iconMoney,
  security: iconSecurity
}

export default function FeatureItem({ icon, title, description }) {
  const iconSrc = iconMap[icon] || iconChat
  
  return (
    <div className="feature-item">
      <img className="feature-icon" src={iconSrc} alt="Icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
