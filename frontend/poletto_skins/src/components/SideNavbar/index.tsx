import { FaBoxOpen, FaExchangeAlt } from "react-icons/fa"
import { FaArrowTurnDown } from "react-icons/fa6"
import { HiShoppingCart } from "react-icons/hi2"
import { MdOutlineHistory } from "react-icons/md"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { NavLink } from 'react-router-dom'

import './styles.css'

const SideNavbar = () => {

    return (

        <nav className='side-navbar'>

            <ul>

                <li>
                    <NavLink to="/trade">
                        <FaExchangeAlt />
                        <span>Trocar</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/buy">
                        <HiShoppingCart />
                        <span>Comprar</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/sell">
                        <RiMoneyDollarCircleFill />
                        <span>Vender</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/cashout">
                        <FaArrowTurnDown />
                        <span>Retirar</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/history">
                        <MdOutlineHistory />
                        <span>Histórico</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/inventory">
                        <FaBoxOpen />
                        <span>Meus Itens</span>
                    </NavLink>
                </li>

            </ul>

        </nav>

    )

}

export default SideNavbar