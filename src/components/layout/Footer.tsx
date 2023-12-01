import React from "react";
import exus from "../../assets/exus.png";
import europe from "../../assets/flag_yellow_low.jpg";
import {footer} from "../../assets/constants"

const Footer = React.memo(() => {
    return (<footer className="is-info footer g-footer has-background-secondary py-0 pb-0">
        <div className="is-flex is-align-items-center is-justify-content-space-between">
            <div className="column is-vcentered has-text-primary-dark is-one-fifth">
                <p className="ml-2 is-size-7">Created by</p>
                <img src={exus} width={80} className="exus " alt="Exus logo" />
                <p className="ml-2 is-size-7">&copy; {new Date().getFullYear()}</p>
            </div>
            <div className="column is-centered has-text-centered has-text-primary-dark">
                {footer["mammoth"]}
            </div>
            <div className="column has-text-right is-one-fifth">
                <img src={europe} width="100" alt="EU flag" />
            </div>
        </div>
    </footer>)
})
export default Footer