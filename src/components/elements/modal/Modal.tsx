import React, { ReactElement } from "react";
import useKeyHandler from '../key-handler/key-handler';

interface Props {
    modal: any,
    title?: string,
    isLarge?: boolean,
    onClose?: () => void,
    closeButtonName?: string,
    actions?: ReactElement,
    children: any
}

const Modal: React.FunctionComponent<Props> = ({
                                                    modal,
                                                    title,
                                                    isLarge = false,
                                                    onClose,
                                                    closeButtonName = 'Close',
                                                    actions = null,
                                                    children,
                                                    ...rest
                                               }) => {

    const close = () => {
        if (!!onClose) onClose()
        modal.close()
    }

    useKeyHandler(document, 'Escape', 'keydown', close);

    return (
        <div className={'modal'
            + (modal.isOpen ? ' is-active' : '')
            + (isLarge ? ' is-large' : '')
        }>
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button type="button" className="delete" aria-label="close" onClick={close}/>
                </header>

                <React.Fragment>
                    <section className="modal-card-body">
                        {children}
                    </section>
                    <footer className="modal-card-foot">
                        <div className='buttons'>
                            <button className={"button"} type="button" onClick={close}>{closeButtonName}</button>
                            {actions}
                        </div>
                    </footer>
                </React.Fragment>

            </div>
        </div>
    )
};

export default Modal;