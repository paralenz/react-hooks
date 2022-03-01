import { useRef, useState, useEffect, RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export type Dimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type UseDimensions<T> = Dimensions & {
  ref: RefObject<T>
  observer: ResizeObserver | null
}

const initialDimensions: Dimensions = {
  width: 0,
  height: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  x: 0,
  y: 0
}

export const useDimensions = <T extends Element>(ref: RefObject<T>): UseDimensions<T> => {
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const [dimensions, setdDimensions] = useState<Dimensions>(initialDimensions)

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries: ReadonlyArray<ResizeObserverEntry>) => {
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

  return {
    ...dimensions,
    ref,
    observer: resizeObserverRef.current
  }
}
