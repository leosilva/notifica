"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Send, Palette, Sparkles, Eye, MessageSquare, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const BACKGROUND_TEMPLATES = [
  {
    id: "suap-turquoise",
    name: "SUAP Oficial",
    class: "bg-gradient-to-br from-[#00b4a6] to-[#008b7a]",
    preview: "linear-gradient(135deg, #00b4a6, #008b7a)",
  },
  {
    id: "ocean-blue",
    name: "Azul Oceano",
    class: "bg-gradient-to-br from-blue-500 to-blue-700",
    preview: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  {
    id: "forest-green",
    name: "Verde Floresta",
    class: "bg-gradient-to-br from-green-500 to-green-700",
    preview: "linear-gradient(135deg, #22c55e, #15803d)",
  },
  {
    id: "sunset-orange",
    name: "Laranja Pôr do Sol",
    class: "bg-gradient-to-br from-orange-400 to-red-500",
    preview: "linear-gradient(135deg, #fb923c, #ef4444)",
  },
  {
    id: "purple-galaxy",
    name: "Galáxia Roxa",
    class: "bg-gradient-to-br from-purple-500 to-purple-700",
    preview: "linear-gradient(135deg, #a855f7, #7c3aed)",
  },
  {
    id: "pink-rose",
    name: "Rosa Suave",
    class: "bg-gradient-to-br from-pink-400 to-rose-500",
    preview: "linear-gradient(135deg, #f472b6, #f43f5e)",
  },
  {
    id: "golden-yellow",
    name: "Dourado",
    class: "bg-gradient-to-br from-yellow-400 to-orange-500",
    preview: "linear-gradient(135deg, #facc15, #f97316)",
  },
  {
    id: "midnight-blue",
    name: "Azul Meia-Noite",
    class: "bg-gradient-to-br from-slate-700 to-slate-900",
    preview: "linear-gradient(135deg, #334155, #0f172a)",
  },
]

export function StudentDashboard() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState(BACKGROUND_TEMPLATES[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= 80) {
      setMessage(value)
    }
  }

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Mensagem vazia",
        description: "Por favor, digite uma mensagem antes de enviar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: BACKEND INTEGRATION - Substituir por chamada real à API
      // const response = await fetch('/api/communications', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      //   },
      //   body: JSON.stringify({
      //     message: message.trim(),
      //     template: selectedTemplate.id,
      //     userId: user?.id
      //   })
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Erro ao enviar comunicado')
      // }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Comunicado enviado!",
        description: "Sua mensagem foi enviada com sucesso.",
      })

      setMessage("")
    } catch (error) {
      console.error("Erro ao enviar comunicado:", error)
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar o comunicado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-900/20 dark:via-emerald-900/10 dark:to-teal-900/5 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/5 dark:bg-green-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <header className="relative z-10 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback
                    className="font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #00b4a6, #008b7a)" }}
                  >
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Olá, {user?.name}
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Portal do Estudante</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <Card className="xl:col-span-1 bg-card/80 backdrop-blur-xl border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, #00b4a6, #008b7a)" }}>
                  <Palette className="h-5 w-5 text-white" />
                </div>
                Templates
              </CardTitle>
              <CardDescription className="text-base">Escolha o fundo perfeito para seu comunicado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {BACKGROUND_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`relative h-16 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${
                      selectedTemplate.id === template.id
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                    style={{ background: template.preview }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold text-xs text-center px-1 group-hover:scale-110 transition-transform duration-300">
                        {template.name}
                      </span>
                    </div>
                    {selectedTemplate.id === template.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="xl:col-span-2 bg-card/80 backdrop-blur-xl border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, #00b4a6, #008b7a)" }}>
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                Criar Comunicado
              </CardTitle>
              <CardDescription className="text-base">
                Compartilhe sua mensagem com a comunidade acadêmica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="message" className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sua Mensagem
                </Label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem aqui... Seja criativo e inspire outros estudantes!"
                  value={message}
                  onChange={handleMessageChange}
                  className="min-h-[140px] resize-none border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl text-base"
                  maxLength={80}
                />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Caracteres restantes:</span>
                  <span
                    className={`font-bold ${
                      message.length > 70 ? "text-orange-500" : message.length > 60 ? "text-yellow-500" : "text-primary"
                    }`}
                  >
                    {80 - message.length}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !message.trim()}
                className="w-full h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 outline-none"
                style={{
                  background:
                    isSubmitting || !message.trim()
                      ? "linear-gradient(135deg, #4db8b0, #3a9691)"
                      : "linear-gradient(135deg, #00b4a6, #008b7a)",
                  color: "#ffffff",
                  opacity: isSubmitting || !message.trim() ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && message.trim()) {
                    e.currentTarget.style.background = "linear-gradient(135deg, #008b7a, #006b5d)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && message.trim()) {
                    e.currentTarget.style.background = "linear-gradient(135deg, #00b4a6, #008b7a)"
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent inline-block" />
                    Publicando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 inline" />
                    Publicar Comunicado
                  </>
                )}
              </button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-card/80 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, #00b4a6, #008b7a)" }}>
                <Eye className="h-5 w-5 text-white" />
              </div>
              Pré-visualização
            </CardTitle>
            <CardDescription className="text-base">Veja como seu comunicado será exibido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 rounded-2xl overflow-hidden border-2 border-border shadow-inner">
              <div className={`absolute inset-0 ${selectedTemplate.class}`} />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="text-center max-w-lg w-full">
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #00b4a6, #008b7a)" }}
                      >
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">Comunicado Estudantil</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 break-words hyphens-auto overflow-wrap-anywhere max-w-full">
                      {message || "Sua mensagem aparecerá aqui... Digite algo inspirador!"}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="text-xs">{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Por: {user?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
