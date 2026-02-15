"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Play, Loader2, CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { postCodeReview, type ChatLanguage } from "@/lib/api"
import type { SimulationTask } from "@/lib/tasks"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface ProjectIDEProps {
  task: SimulationTask
}

const DEFAULT_CODE = `// Implement your solution here.
// This code will be reviewed by the AI (customer).

`

export function ProjectIDE({ task }: ProjectIDEProps) {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [approved, setApproved] = useState<boolean | null>(null)
  const [language] = useState<ChatLanguage>("en")

  const handleReview = useCallback(async () => {
    setReviewLoading(true)
    setFeedback(null)
    setApproved(null)
    try {
      const res = await postCodeReview({
        project_id: task.id,
        project_title: task.title,
        project_description: task.description,
        code,
        language: "javascript",
        language_hint: language,
      })
      setFeedback(res.feedback)
      setApproved(res.approved)
    } catch (e) {
      const err = e instanceof Error ? e.message : "Request failed"
      setFeedback(`Error: ${err}. Is the backend running with GEMINI_API_KEY?`)
      setApproved(false)
    } finally {
      setReviewLoading(false)
    }
  }, [task, code, language])

  return (
    <div className="flex h-full flex-col">
      {/* IDE header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-sm font-medium text-white/80">Code sandbox</span>
        <Button
          size="sm"
          onClick={handleReview}
          disabled={reviewLoading}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {reviewLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          Request AI review
        </Button>
      </div>

      {/* Monaco editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            padding: { top: 12 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Review feedback panel */}
      {feedback !== null && (
        <div
          className={`shrink-0 border-t p-4 max-h-48 overflow-y-auto ${
            approved === true
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-amber-500/30 bg-amber-500/10"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {approved === true ? (
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            ) : (
              <XCircle className="h-4 w-4 text-amber-400" />
            )}
            <span className="text-sm font-medium text-white/90">
              {approved === true ? "Review passed" : "Review feedback"}
            </span>
          </div>
          <p className="text-sm text-white/80 whitespace-pre-wrap">{feedback}</p>
        </div>
      )}
    </div>
  )
}
