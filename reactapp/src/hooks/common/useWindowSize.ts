import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth as number,
    height: window.innerHeight as number,
  })

  const handler = () => {
    setWindowSize({
      width: window.innerWidth as number,
      height: window.innerHeight as number,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return windowSize
}

export default useWindowSize;