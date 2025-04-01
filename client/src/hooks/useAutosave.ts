import { useCallback, useEffect, useRef } from 'react'

interface UseAutosaveOptions {
  content: string
  onSave: (content: string) => void | Promise<void>
  debounceMs?: number
  enabled?: boolean
}

export const useAutosave = ({
  content,
  onSave,
  debounceMs = 1000,
  enabled = true
}: UseAutosaveOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const contentRef = useRef(content)

  // Update the ref when content changes
  useEffect(() => {
    contentRef.current = content
  }, [content])

  const save = useCallback(async () => {
    if (!enabled) return
    try {
      await onSave(contentRef.current)
    } catch (error) {
      console.error('Failed to autosave:', error)
    }
  }, [enabled, onSave])

  // Set up debounced autosave
  useEffect(() => {
    if (!enabled) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(save, debounceMs)

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [content, debounceMs, enabled, save])

  // Force save function that bypasses debouncing
  const forceSave = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    await save()
  }, [save])

  return {
    forceSave,
    isEnabled: enabled
  }
} 