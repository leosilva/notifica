"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Send, Palette, Upload, X, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const BACKGROUND_TEMPLATES = [
  {
    id: "gradient-blue",
    name: "Azul Gradiente",
    class: "bg-gradient-to-br from-blue-400 to-blue-600",
    preview: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  },
  {
    id: "gradient-green",
    name: "Verde Gradiente",
    class: "bg-gradient-to-br from-green-400 to-green-600",
    preview: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
  },
  {
    id: "gradient-purple",
    name: "Roxo Gradiente",
    class: "bg-gradient-to-br from-purple-400 to-purple-600",
    preview: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
  },
  {
    id: "gradient-orange",
    name: "Laranja Gradiente",
    class: "bg-gradient-to-br from-orange-400 to-orange-600",
    preview: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
  },
  {
    id: "gradient-red",
    name: "Vermelho Gradiente",
    class: "bg-gradient-to-br from-red-400 to-red-600",
    preview: "linear-gradient(135deg, #f87171 0%, #dc2626 100%)",
  },
  {
    id: "solid-indigo",
    name: "Índigo Sólido",
    class: "bg-indigo-500",
    preview: "#6366f1",
  },
  {
    id: "solid-teal",
    name: "Verde-azulado",
    class: "bg-teal-500",
    preview: "#14b8a6",
  },
  {
    id: "solid-amber",
    name: "Âmbar Sólido",
    class: "bg-amber-500",
    preview: "#f59e0b",
  },
]

const SECTORS = [
  { value: "biblioteca", label: "Biblioteca" },
  { value: "ginasio", label: "Ginásio" },
  { value: "vivencia", label: "Vivência" },
  { value: "refeitorio", label: "Refeitório" },
  { value: "laboratorio", label: "Laboratório" },
  { value: "auditorio", label: "Auditório" },
  { value: "secretaria", label: "Secretaria" },
  { value: "coordenacao", label: "Coordenação" },
  { value: "direcao", label: "Direção" },
  { value: "manutencao", label: "Manutenção" },
]

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState(BACKGROUND_TEMPLATES[0])
  const [selectedSector, setSelectedSector] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= 150) {
      setMessage(value)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
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

    if (!selectedSector) {
      toast({
        title: "Setor não selecionado",
        description: "Por favor, selecione um setor para o comunicado.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Comunicado administrativo enviado!",
      description: `Mensagem enviada para o setor: ${SECTORS.find((s) => s.value === selectedSector)?.label}`,
    })

    setMessage("")
    setSelectedSector("")
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setIsSubmitting(false)
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-900/20 dark:via-emerald-900/10 dark:to-teal-900/5">
      {/* Header */}
      <header className="bg-white/80 dark:bg-green-900/30 backdrop-blur-xl shadow-sm border-b border-green-200/50 dark:border-green-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold">Olá, {user?.name}</h1>
                <p className="text-sm text-muted-foreground">Painel Administrativo</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Templates de Fundo
              </CardTitle>
              <CardDescription>Escolha o fundo do comunicado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {BACKGROUND_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`relative h-16 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedTemplate.id === template.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                    style={{ background: template.preview }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center px-1">{template.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message and Sector */}
          <Card>
            <CardHeader>
              <CardTitle>Comunicado</CardTitle>
              <CardDescription>Mensagem e setor de destino</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Setor</Label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {sector.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-message">Mensagem</Label>
                <Textarea
                  id="admin-message"
                  placeholder="Digite o comunicado administrativo..."
                  value={message}
                  onChange={handleMessageChange}
                  className="min-h-[120px] resize-none"
                  maxLength={150}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Caracteres restantes:</span>
                  <span className={message.length > 130 ? "text-orange-500" : ""}>{150 - message.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Imagem (Opcional)
              </CardTitle>
              <CardDescription>Adicione uma imagem ao comunicado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!uploadedImage ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Selecionar Imagem
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">PNG, JPG até 5MB</p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Imagem do comunicado"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !message.trim() || !selectedSector}
            className="w-full lg:w-auto"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Enviando Comunicado...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Comunicado Administrativo
              </>
            )}
          </Button>
        </div>

        {/* Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
            <CardDescription>Veja como o comunicado administrativo ficará</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 rounded-lg overflow-hidden border">
              <div className={`absolute inset-0 ${selectedTemplate.class}`} />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative h-full flex items-center justify-center p-6">
                <div className="text-center max-w-lg">
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">
                        {selectedSector ? SECTORS.find((s) => s.value === selectedSector)?.label : "Setor"}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100">
                      Comunicado Administrativo
                    </h3>

                    {uploadedImage && (
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Imagem do comunicado"
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}

                    <p className="text-gray-700 dark:text-gray-300 text-balance mb-4">
                      {message || "Sua mensagem aparecerá aqui..."}
                    </p>

                    <div className="text-sm text-gray-500 dark:text-gray-400 border-t pt-3">
                      <div>Administração: {user?.name}</div>
                      <div className="text-xs mt-1">{new Date().toLocaleDateString("pt-BR")}</div>
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
