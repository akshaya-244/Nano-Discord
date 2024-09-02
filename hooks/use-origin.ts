//Read our current url so it copies whatever is the current url

import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [mounted, setMounted] =useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const origin= typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

    if(!mounted)
    {
        return ""
    }
    return origin;
}