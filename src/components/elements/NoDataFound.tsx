import React from "react";

interface Props {
    label: string
    data?: any[]
    colspan?: number
    isSimple?: boolean
}

const NoDataFound: React.FC<Props> = ({label, data, colspan, isSimple = false}) => {
    const renderMessage = () => {
        return <div className="notification is-warning is-light">
            <p>There are no {label} to display</p>
        </div>
    }
    return (
        <>
            {(!data || !data.map || data.length == 0) && <>
                {isSimple && renderMessage()}
                {!isSimple && <tr>
                    <td colSpan={colspan}>
                        {renderMessage()}
                    </td>
                </tr>}
            </>}
        </>
    )
}
export default NoDataFound