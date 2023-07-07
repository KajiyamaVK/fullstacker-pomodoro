import { HeaderContainer } from './style'
import logo from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />

      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
