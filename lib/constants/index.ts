// App metadata
export const APP_NAME = 'GDG Hackathon 2026'
export const APP_DESCRIPTION = 'Built for Egypt Hackathon 2026'

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
} as const

// Demo mode
export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
