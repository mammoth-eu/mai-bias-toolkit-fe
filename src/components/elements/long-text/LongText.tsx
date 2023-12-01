import React from "react";

interface Props {
    text: string
    maxSize?: number
    className?: string
}

const LongText: React.FC<Props> = ({text, maxSize = 15, className = ""}) => {
    const len = text.length

    const displayed = () => {
        if (len + 3 < maxSize) {
            return text
        }
        return text.substring(0, maxSize) + "..."
    }
    return (<>
        <span className={"has-tooltip-arrow has-tooltip" + className}
              data-tooltip={text}>{displayed()}</span>
    </>)
}
export default LongText