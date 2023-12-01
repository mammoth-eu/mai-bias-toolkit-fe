import React from "react";
import { header } from "../../assets/constants"

const Header = React.memo(() => {

    return (<header>
        <nav className="navbar has-background-secondary is-flex is-align-items-center is-justify-content-center"
             role="navigation"
             aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={header["mammoth"]}
                         alt="logo" width="150"
                         height="28"/>
                </a>
            </div>
        </nav>
    </header>)
})
export default Header