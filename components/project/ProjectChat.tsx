"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { postProjectChat, type ChatMessage, type ChatLanguage } from "@/lib/api"
import type { SimulationTask } from "@/lib/tasks"
import { cn } from "@/lib/utils"

interface ProjectChatProps {
  task: SimulationTask
}

const WELCOME_EN = "Hi! I'm your client for this project. Ask me anything about the requirements, the challenge, or what I expect. I'll answer as the stakeholder."
const WELCOME_AR = "مرحباً! أنا عميلك في هذا المشروع. اسألني عن المتطلبات أو المهمة أو توقعاتي. سأجيبك بصفة صاحب المصلحة."

export function ProjectChat({ task }: ProjectChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState<ChatLanguage>("en")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const welcome = language === "ar" ? WELCOME_AR : WELCOME_EN

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await postProjectChat({
        project_id: task.id,
        project_title: task.title,
        project_description: task.description,
        client_persona: task.clientPersona,
        client_mood: task.clientMood,
        messages: [...messages, userMsg],
        language,
      })
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }])
    } catch (e) {
      const err = e instanceof Error ? e.message : "Something went wrong"
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `[Error: ${err}. Make sure the backend is running and GEMINI_API_KEY is set.]` },
      ])
    } finally {
      setLoading(false)
    }
  }

  const displayMessages = messages.length === 0
    ? [{ role: "assistant" as const, content: welcome }]
    : messages

  return (
    <div className="flex h-full flex-col">
      {/* Header with language toggle */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-sm font-medium text-white/80">Customer (AI)</span>
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              language === "en" ? "bg-purple-500/30 text-purple-200" : "text-white/60 hover:text-white"
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              language === "ar" ? "bg-purple-500/30 text-purple-200" : "text-white/60 hover:text-white"
            )}
          >
            عربي
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30">
                <Bot className="h-4 w-4 text-purple-400" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-xl px-4 py-2.5 text-sm",
                msg.role === "user"
                  ? "bg-purple-500/20 text-white border border-purple-500/30"
                  : "bg-white/5 text-white/90 border border-white/10"
              )}
            >
              <p className="whitespace-pre-wrap" dir={msg.role === "assistant" && language === "ar" ? "rtl" : undefined}>
                {msg.content}
              </p>
            </div>
            {msg.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20">
                <User className="h-4 w-4 text-white/70" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30">
              <Bot className="h-4 w-4 text-purple-400 animate-pulse" />
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/50">
              ...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === "ar" ? "اكتب رسالتك..." : "Ask about the challenge or requirements..."}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30"
            dir={language === "ar" ? "rtl" : "ltr"}
          />
          <Button
            type="submit"
            size="sm"
            disabled={loading || !input.trim()}
            className="bg-purple-500 hover:bg-purple-600 text-white shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
