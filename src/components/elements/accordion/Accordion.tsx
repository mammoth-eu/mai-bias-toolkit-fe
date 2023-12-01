import { ReactFCWithChildren } from "../../../react";

const Accordion: ReactFCWithChildren = ({children}) => {
    return (<>
        <section className="accordions">
            {children}
        </section>
    </>)
}
export default Accordion