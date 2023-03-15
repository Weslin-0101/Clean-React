import React, { memo, useContext } from 'react'
import Styles from './header-styles.scss'
import { Logo } from '@/presentation/components'
import { ApiContext } from "@/presentation/contexts"
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
    const logout = useLogout();
    const { getCurrentAccount } = useContext(ApiContext)
    const buttonLogoutClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault();
        logout()
    }

    return (
        <header className={Styles.headerWrap}>
            <div className={Styles.headerContent}>
                <Logo />
                <div className={Styles.logoutWrap}>
                    <span>Wesley</span>
                    <a data-testid="logout" href="#" onClick={buttonLogoutClick}>Sair</a>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);