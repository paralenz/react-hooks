import { useRef, useState, useEffect, RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type DOMRectReadOnly = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export const useDimensions = <T extends Element>(ref: RefObject<T>): Partial<DOMRectReadOnly> => {
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const [dimensions, setdDimensions] = useState<Partial<DOMRectReadOnly>>({
    width: 0,
    height: 0
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
