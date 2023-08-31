import React, { createContext, useState } from 'react'

export const ctx = createContext()

export default function CtxData(props) {
    const [lsDataTracking, setLsDataTracking] = useState([])
    return (
        <ctx.Provider value={{
            lsDataTracking,
            setLsDataTracking
        }}>
            {
                props.children
            }
        </ctx.Provider>
    )
}
