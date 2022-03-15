import React from 'react'

const useDebounce = <T>(value: T, delay: number): T => {
    // Состояние и сеттер для отложенного значения
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}

export default useDebounce
