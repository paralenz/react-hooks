import { useRef, useState, useEffect, RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type Dimensions = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export const useDimensions = <T extends Element>(ref: RefObject<T>): Dimensions => {
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const [dimensions, setdDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    x: 0,
    y: 0
  })

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries: Array<ResizeObserverEntry> = []) => {
      entries.forEach(({ contentRect }) => {
        setdDimensions(contentRect)
      })
    })

    if (ref.current) {
      resizeObserverRef.current.observe(ref.current)
    }

    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
    }
  }, [ref])

  return dimensions
}
