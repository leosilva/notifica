"use client"

import type React from "react"

import { useState } from "react"
import { useAuth, type UserType } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Loader2, GraduationCap, Shield, ExternalLink, BookOpen, Users, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LoginPage() {
  const { login, loginWithSuap, isLoading } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent, userType: UserType) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha.",
        variant: "destructive",
      })
      return
    }

    // TODO: BACKEND INTEGRATION - Substituir por chamada real à API do SUAP
    // const response = await fetch('/api/auth/suap', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: formData.email, password: formData.password, userType })
    // })

    const success = await login(formData.email, formData.password, userType)

    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a) ao sistema ${userType === "student" ? "do aluno" : "administrativo"}.`,
      })
    } else {
      toast({
        title: "Erro no login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleSuapLogin = async (userType: UserType) => {
    // TODO: BACKEND INTEGRATION - Redirecionar para OAuth do SUAP
    // window.location.href = `/api/auth/suap/redirect?userType=${userType}`

    const success = await loginWithSuap(userType)

    if (success) {
      toast({
        title: "Login SUAP realizado com sucesso!",
        description: `Bem-vindo(a) ao sistema ${userType === "student" ? "do aluno" : "administrativo"}.`,
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "48px",
    background: "linear-gradient(135deg, #00b4a6, #008b7a)",
    backgroundColor: "#00b4a6",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.7 : 1,
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 180, 166, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    outline: "none",
  }

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #008b7a, #006b5d)",
    backgroundColor: "#008b7a",
    transform: "scale(1.02)",
    boxShadow: "0 6px 16px rgba(0, 139, 122, 0.4)",
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="absolute top-20 left-20 float">
        <BookOpen className="h-8 w-8 text-primary/20" />
      </div>
      <div className="absolute top-40 right-32 float" style={{ animationDelay: "1s" }}>
        <Users className="h-6 w-6 text-secondary/20" />
      </div>
      <div className="absolute bottom-32 left-32 float" style={{ animationDelay: "2s" }}>
        <Award className="h-7 w-7 text-accent/20" />
      </div>

      <div className="absolute top-6 right-6" style={{ zIndex: 9999 }}>
        <ThemeToggle />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-card/95 backdrop-blur-xl pulse-glow">
          <CardHeader className="text-center space-y-4 pb-8">
            <div
              className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #00b4a6, #008b7a)",
              }}
            >
              <GraduationCap className="h-10 w-10" style={{ color: "#ffffff" }} />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Comunica IF
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Sistema integrado de comunicação acadêmica
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="student"
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <GraduationCap className="h-4 w-4" />
                  Estudante
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Shield className="h-4 w-4" />
                  Administrador
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-6 mt-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(e, "student")
                  }}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <Label htmlFor="student-email" className="text-sm font-semibold text-foreground">
                      Email Institucional
                    </Label>
                    <Input
                      id="student-email"
                      name="email"
                      type="email"
                      placeholder="seu.email@estudante.edu.br"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-12 border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="student-password" className="text-sm font-semibold text-foreground">
                      Senha
                    </Label>
                    <Input
                      id="student-password"
                      name="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-12 border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={buttonStyle}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          Object.assign(e.currentTarget.style, buttonHoverStyle)
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading) {
                          Object.assign(e.currentTarget.style, buttonStyle)
                        }
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 style={{ width: "20px", height: "20px", animation: "spin 1s linear infinite" }} />
                          Entrando...
                        </>
                      ) : (
                        <>
                          <ExternalLink style={{ width: "20px", height: "20px" }} />
                          Logar com SUAP
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="space-y-6 mt-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(e, "admin")
                  }}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <Label htmlFor="admin-email" className="text-sm font-semibold text-foreground">
                      Email Administrativo
                    </Label>
                    <Input
                      id="admin-email"
                      name="email"
                      type="email"
                      placeholder="admin@instituicao.edu.br"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-12 border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="admin-password" className="text-sm font-semibold text-foreground">
                      Senha
                    </Label>
                    <Input
                      id="admin-password"
                      name="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-12 border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={buttonStyle}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          Object.assign(e.currentTarget.style, buttonHoverStyle)
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading) {
                          Object.assign(e.currentTarget.style, buttonStyle)
                        }
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 style={{ width: "20px", height: "20px", animation: "spin 1s linear infinite" }} />
                          Entrando...
                        </>
                      ) : (
                        <>
                          <ExternalLink style={{ width: "20px", height: "20px" }} />
                          Logar com SUAP
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
