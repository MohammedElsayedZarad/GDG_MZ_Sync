"use client"

import { useState, useTransition, useEffect } from "react"
import Link from "next/link"
import {
    Terminal,
    Loader2,
    Mail,
    Lock,
    User,
    ArrowRight,
    ArrowLeft,
    Check,
    Code,
    Server,
    Layers,
    Smartphone,
    BarChart3,
    Palette,
    GraduationCap,
    Briefcase,
    Rocket,
    MapPin,
    Shield,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signup, verifyEmailOtp, resendEmailOtp, completeOnboarding } from "../actions"

const FIELDS = [
    { value: "frontend", label: "Frontend", icon: Code, color: "text-blue-400" },
    { value: "backend", label: "Backend", icon: Server, color: "text-green-400" },
    { value: "fullstack", label: "Full Stack", icon: Layers, color: "text-purple-400" },
    { value: "mobile", label: "Mobile", icon: Smartphone, color: "text-orange-400" },
    { value: "data", label: "Data / AI", icon: BarChart3, color: "text-cyan-400" },
    { value: "design", label: "Design", icon: Palette, color: "text-pink-400" },
] as const

const LEVELS = [
    {
        value: "student",
        label: "Student",
        desc: "Currently studying CS or related field",
        icon: GraduationCap,
    },
    {
        value: "fresh_grad",
        label: "Fresh Graduate",
        desc: "Graduated within the last year",
        icon: Briefcase,
    },
    {
        value: "junior",
        label: "Junior Developer",
        desc: "Less than 2 years of experience",
        icon: Rocket,
    },
] as const

const INTERESTS = [
    "React", "Next.js", "Vue", "Angular", "Node.js", "Python",
    "Django", "FastAPI", "Flutter", "React Native", "Swift", "Kotlin",
    "PostgreSQL", "MongoDB", "Docker", "AWS", "Figma", "UI/UX",
    "Machine Learning", "Data Analysis", "GraphQL", "REST APIs",
    "TypeScript", "Go", "Rust", "System Design",
]

const REGIONS = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Asia",
    "Oceania",
    "Middle East",
]

type Step = 1 | 1.5 | 2 | 3 | 4

export default function SignupPage() {
    const [step, setStep] = useState<Step>(1)
    const [isPending, startTransition] = useTransition()

    // Step 1 data
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [region, setRegion] = useState("")

    // Step 1.5 data (OTP verification)
    const [otpCode, setOtpCode] = useState("")
    const [resendCountdown, setResendCountdown] = useState(0)

    // Step 2-4 data
    const [field, setField] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("")
    const [interests, setInterests] = useState<string[]>([])

    function handleStep1() {
        if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !region.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords don't match")
            return
        }

        startTransition(async () => {
            const result = await signup({
                email,
                password,
                confirmPassword,
                fullName,
                region,
            })

            if (result?.error) {
                toast.error(result.error)
                return
            }

            if (result?.success) {
                toast.success(result.success)
                setStep(1.5)
                setResendCountdown(60)
            }
        })
    }

    function handleStep1_5() {
        if (otpCode.length !== 6) {
            toast.error("Please enter the 6-digit code")
            return
        }

        startTransition(async () => {
            const result = await verifyEmailOtp({
                email,
                token: otpCode,
                fullName,
                region,
            })

            if (result?.error) {
                toast.error(result.error)
                return
            }

            if (result?.success) {
                toast.success(result.success)
                setStep(2)
            }
        })
    }

    async function handleResendCode() {
        if (resendCountdown > 0) return

        const result = await resendEmailOtp(email)
        if (result?.error) {
            toast.error(result.error)
        } else if (result?.success) {
            toast.success(result.success)
            setResendCountdown(60)
        }
    }

    // Countdown timer for resend
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setInterval(() => {
                setResendCountdown((prev) => Math.max(0, prev - 1))
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [resendCountdown])


    function handleStep2() {
        if (!field) {
            toast.error("Please select your field")
            return
        }
        setStep(3)
    }

    function handleStep3() {
        if (!experienceLevel) {
            toast.error("Please select your experience level")
            return
        }
        setStep(4)
    }

    function handleStep4() {
        if (interests.length === 0) {
            toast.error("Select at least one interest")
            return
        }

        startTransition(async () => {
            const result = await completeOnboarding({
                field,
                experienceLevel,
                interests,
            })

            if (result?.error) {
                toast.error(result.error)
            }
            // redirect happens in the action on success
        })
    }

    function toggleInterest(interest: string) {
        setInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        )
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="relative w-full max-w-lg">
                {/* Logo */}
                <Link
                    href="/"
                    className="mb-6 flex items-center justify-center gap-2"
                >
                    <Terminal className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">
                        INTERNA<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Progress Bar */}
                <div className="mb-6 flex items-center gap-2">
                    {[1, 1.5, 2, 3, 4].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step
                                ? "bg-primary"
                                : "bg-muted"
                                }`}
                        />
                    ))}
                </div>
                <p className="mb-4 text-center text-xs text-muted-foreground">
                    Step {step === 1.5 ? 2 : step > 1.5 ? step + 1 : step} of 5
                </p>

                <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    {/* Step 1: Account */}
                    {step === 1 && (
                        <>
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold">
                                    Create your account
                                </CardTitle>
                                <CardDescription>
                                    Start your virtual internship journey
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="fullName"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="John Doe"
                                            disabled={isPending}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            disabled={isPending}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="region">Region</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <select
                                            id="region"
                                            value={region}
                                            onChange={(e) => setRegion(e.target.value)}
                                            disabled={isPending}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Select your region</option>
                                            {REGIONS.map((r) => (
                                                <option key={r} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Min. 6 characters"
                                            disabled={isPending}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your password"
                                            disabled={isPending}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="w-full"
                                    disabled={isPending}
                                    onClick={handleStep1}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending code...
                                        </>
                                    ) : (
                                        <>
                                            Continue
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                                <p className="text-center text-xs text-muted-foreground">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="text-primary underline-offset-4 hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </CardContent>
                        </>
                    )}

                    {/* Step 1.5: Email Verification */}
                    {step === 1.5 && (
                        <>
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold">
                                    Verify your email
                                </CardTitle>
                                <CardDescription>
                                    We sent a 6-digit code to {email}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="otpCode">Verification Code</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="otpCode"
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="Enter 6-digit code"
                                            disabled={isPending}
                                            className="pl-10 text-center text-2xl tracking-widest"
                                            maxLength={6}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center">
                                        {resendCountdown > 0 ? (
                                            <>Resend code in {resendCountdown}s</>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleResendCode}
                                                className="text-primary hover:underline"
                                            >
                                                Resend code
                                            </button>
                                        )}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setStep(1)}
                                        disabled={isPending}
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={handleStep1_5}
                                        disabled={isPending || otpCode.length !== 6}
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                Verify
                                                <Check className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </>
                    )}


                    {/* Step 2: Field */}
                    {
                        step === 2 && (
                            <>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold">
                                        What&apos;s your field?
                                    </CardTitle>
                                    <CardDescription>
                                        We&apos;ll match you with relevant simulations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        {FIELDS.map((f) => (
                                            <button
                                                key={f.value}
                                                type="button"
                                                onClick={() => setField(f.value)}
                                                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${field === f.value
                                                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                                                    : "border-border/50 bg-muted/20 hover:border-border hover:bg-muted/40"
                                                    }`}
                                            >
                                                <f.icon className={`h-6 w-6 ${field === f.value ? "text-primary" : f.color}`} />
                                                <span className="text-sm font-medium">
                                                    {f.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setStep(1)}
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            onClick={handleStep2}
                                            disabled={!field}
                                        >
                                            Continue
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </>
                        )
                    }

                    {/* Step 3: Experience */}
                    {
                        step === 3 && (
                            <>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold">
                                        Experience level
                                    </CardTitle>
                                    <CardDescription>
                                        This helps us calibrate task difficulty
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        {LEVELS.map((l) => (
                                            <button
                                                key={l.value}
                                                type="button"
                                                onClick={() =>
                                                    setExperienceLevel(l.value)
                                                }
                                                className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all ${experienceLevel === l.value
                                                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                                                    : "border-border/50 bg-muted/20 hover:border-border hover:bg-muted/40"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${experienceLevel === l.value
                                                        ? "bg-primary/20"
                                                        : "bg-muted/40"
                                                        }`}
                                                >
                                                    <l.icon
                                                        className={`h-5 w-5 ${experienceLevel === l.value
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {l.label}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {l.desc}
                                                    </p>
                                                </div>
                                                {experienceLevel === l.value && (
                                                    <Check className="ml-auto h-5 w-5 text-primary" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setStep(2)}
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            onClick={handleStep3}
                                            disabled={!experienceLevel}
                                        >
                                            Continue
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </>
                        )
                    }

                    {/* Step 4: Interests */}
                    {
                        step === 4 && (
                            <>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold">
                                        Pick your interests
                                    </CardTitle>
                                    <CardDescription>
                                        Select technologies you want to work with
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {INTERESTS.map((interest) => (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() =>
                                                    toggleInterest(interest)
                                                }
                                                disabled={isPending}
                                                className={`rounded-full border px-3 py-1.5 text-sm transition-all ${interests.includes(interest)
                                                    ? "border-primary bg-primary/20 text-primary"
                                                    : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                                                    }`}
                                            >
                                                {interests.includes(interest) && (
                                                    <Check className="mr-1 inline-block h-3 w-3" />
                                                )}
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-center text-xs text-muted-foreground">
                                        {interests.length} selected
                                    </p>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => setStep(3)}
                                            disabled={isPending}
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            onClick={handleStep4}
                                            disabled={
                                                isPending ||
                                                interests.length === 0
                                            }
                                        >
                                            {isPending ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Finishing...
                                                </>
                                            ) : (
                                                <>
                                                    Complete Setup
                                                    <Check className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </>
                        )
                    }
                </Card >

                <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                    Built for GDG Hackathon 2026
                </p>
            </div >
        </div >
    )
}
