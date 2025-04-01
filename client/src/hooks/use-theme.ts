import { useEffect, useState } from "react"

type Theme = "dark" | "light"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme") as Theme
    return storedTheme || "light"
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return { theme, setTheme }
} 