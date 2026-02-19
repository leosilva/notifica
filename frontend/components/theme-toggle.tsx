"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: "#1a5f56", // verde escuro do SUAP
          border: "2px solid rgba(0, 180, 166, 0.3)",
          boxShadow: "0 4px 12px rgba(0, 180, 166, 0.2)",
        }}
        disabled
      >
        <Sun className="h-5 w-5 text-white" />
      </button>
    )
  }

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    // TODO: BACKEND INTEGRATION - Salvar preferência do usuário
    // if (user) {
    //   fetch('/api/user/preferences', {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ theme: newTheme })
    //   })
    // }
  }

  return (
    <button
      onClick={handleToggle}
      className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: theme === "light" ? "#1a5f56" : "#0f3d36", // verde escuro variando com o tema
        border: "2px solid rgba(0, 180, 166, 0.3)",
        boxShadow: "0 4px 12px rgba(0, 180, 166, 0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme === "light" ? "#0f3d36" : "#1a5f56"
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 180, 166, 0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme === "light" ? "#1a5f56" : "#0f3d36"
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 180, 166, 0.2)"
      }}
      aria-label="Alternar tema"
    >
      {theme === "light" ? <Moon className="h-5 w-5 text-white" /> : <Sun className="h-5 w-5 text-white" />}
    </button>
  )
}
