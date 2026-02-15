"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Check, ChevronRight, Code2, Database, Layout, Smartphone, PieChart, PenTool, Sparkles, X } from "lucide-react"
import { updateOnboardingProfile } from "@/app/(dashboard)/actions"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface LiquidGlassBubbleProps {
    userName: string
    showOnboarding: boolean
    onComplete?: () => void
}

type OnboardingData = {
    field: string
    experience_level: string
    interests: string[]
}

const FIELDS = [
    { id: "frontend", label: "Frontend", icon: Layout },
    { id: "backend", label: "Backend", icon: Database },
    { id: "fullstack", label: "Fullstack", icon: Code2 },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "data", label: "Data", icon: PieChart },
    { id: "design", label: "Design", icon: PenTool },
]

const EXPERIENCE_LEVELS = [
    { id: "student", label: "Student" },
    { id: "fresh_grad", label: "Fresh Grad" },
    { id: "junior", label: "Junior" },
]

const INTERESTS = [
    "React", "Next.js", "Node.js", "Python", "AI/ML",
    "UI/UX", "DevOps", "Cybersecurity", "Blockchain",
    "Game Dev", "Cloud", "Mobile Apps"
]

export function LiquidGlassBubble({ userName, showOnboarding, onComplete }: LiquidGlassBubbleProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [step, setStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState<OnboardingData>({
        field: "",
        experience_level: "",
        interests: []
    })

    // Auto-open if onboarding is needed
    useEffect(() => {
        if (showOnboarding) {
            const timer = setTimeout(() => setIsOpen(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [showOnboarding])

    const handleNext = () => {
        if (step < 2) setStep(step + 1)
        else handleSubmit()
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            const result = await updateOnboardingProfile(data)
            if (result.error) {
                toast.error("Failed to update profile", { description: result.error })
                setIsSubmitting(false)
                return
            }

            toast.success("Welcome aboard!", {
                description: "Your profile has been updated.",
                icon: <Sparkles className="h-5 w-5 text-yellow-400" />
            })

            setIsOpen(false)
            if (onComplete) onComplete()

            // Allow exit animation to complete before potentially unmounting
            setTimeout(() => {
                // window.location.reload() // Or rely on revalidatePath
            }, 1000)
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
            setIsSubmitting(false)
        }
    }

    const toggleInterest = (interest: string) => {
        setData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }))
    }

    if (!showOnboarding && !isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
                        onClick={() => {
                            // Prevent accidental closing during onboarding
                            // if (!showOnboarding) setIsOpen(false) 
                        }}
                    />

                    {/* Liquid Glass Modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-8 right-8 z-50 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-1 shadow-2xl backdrop-blur-xl md:bottom-12 md:right-12"
                    >
                        {/* Glass Shine Effect */}
                        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                        <div className="relative flex flex-col items-center p-6 text-center">

                            {/* Header */}
                            <div className="mb-6 flex w-full items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-white/90">Interna Assistant</span>
                                </div>
                                {/* Close button strictly strictly strictly hidden for mandatory onboarding? Maybe keep it for later */}
                                {/* <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button> */}
                            </div>

                            {/* Step 0: Welcome & Field */}
                            {step === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full"
                                >
                                    <h3 className="mb-2 text-xl font-bold text-white">Hi {userName?.split(' ')[0]}! 👋</h3>
                                    <p className="mb-6 text-sm text-white/60">Let's personalize your experience. What's your main focus?</p>

                                    <div className="grid grid-cols-2 gap-3">
                                        {FIELDS.map((field) => (
                                            <button
                                                key={field.id}
                                                onClick={() => setData({ ...data, field: field.id })}
                                                className={cn(
                                                    "group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-300",
                                                    data.field === field.id
                                                        ? "border-blue-500/50 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                                        : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
                                                )}
                                            >
                                                <field.icon className={cn("h-6 w-6 transition-colors", data.field === field.id ? "text-blue-400" : "text-white/70 group-hover:text-white")} />
                                                <span className={cn("text-xs font-medium", data.field === field.id ? "text-blue-100" : "text-white/70 group-hover:text-white")}>
                                                    {field.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 1: Experience */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full"
                                >
                                    <h3 className="mb-2 text-xl font-bold text-white">Experience Level</h3>
                                    <p className="mb-6 text-sm text-white/60">How would you describe your current expertise?</p>

                                    <div className="flex flex-col gap-3">
                                        {EXPERIENCE_LEVELS.map((level) => (
                                            <button
                                                key={level.id}
                                                onClick={() => setData({ ...data, experience_level: level.id })}
                                                className={cn(
                                                    "flex items-center justify-between rounded-xl border p-4 transition-all duration-300",
                                                    data.experience_level === level.id
                                                        ? "border-purple-500/50 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                                                        : "border-white/5 bg-white/5 hover:bg-white/10"
                                                )}
                                            >
                                                <span className="font-medium text-white">{level.label}</span>
                                                {data.experience_level === level.id && <Check className="h-4 w-4 text-purple-400" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Interests */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full"
                                >
                                    <h3 className="mb-2 text-xl font-bold text-white">Interests</h3>
                                    <p className="mb-6 text-sm text-white/60">Pick a few topics you're excited about.</p>

                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {INTERESTS.map((interest) => (
                                            <button
                                                key={interest}
                                                onClick={() => toggleInterest(interest)}
                                                className={cn(
                                                    "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
                                                    data.interests.includes(interest)
                                                        ? "border-pink-500/50 bg-pink-500/20 text-pink-100 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                                                        : "border-white/5 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                                )}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Footer / Navigation */}
                            <div className="mt-8 flex w-full justify-between items-center">
                                {/* Step indicators */}
                                <div className="flex gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-1.5 rounded-full transition-all duration-300",
                                                i === step ? "w-6 bg-white" : "w-1.5 bg-white/20"
                                            )}
                                        />
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={handleNext}
                                    disabled={
                                        (step === 0 && !data.field) ||
                                        (step === 1 && !data.experience_level) ||
                                        (step === 2 && data.interests.length === 0) ||
                                        isSubmitting
                                    }
                                    className={cn(
                                        "group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300",
                                        (step === 0 && !data.field) || (step === 1 && !data.experience_level) || (step === 2 && data.interests.length === 0)
                                            ? "cursor-not-allowed bg-white/20 text-white/40"
                                            : "bg-white hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                                    ) : (
                                        <>
                                            {step === 2 ? "Finish" : "Next"}
                                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
