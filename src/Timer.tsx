import { useEffect, useState } from "react";

export default function Timer() {
    const [count, setCount] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setCount(prev => prev + 1)
            }, 1000)
        }
    }, [isRunning])

    return (

        <>
        
        </>
    )



}