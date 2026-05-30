export type Company = {
    id: string
    name: string
    email: string
    location: string
    website: string
    created_at: string
}

export type Worker = {
    id: string
    full_name: string
    email: string
    location: string
    years_experience: number
    skills: string[]
    resume_url: string
    created_at: string
}

export type Job = {
    id: string
    company_id: string
    title: string
    description: string
    job_type: 'full-time' | 'part-time' | 'subcontractor'
    pay_range: string
    status: 'active' | 'expired' | 'draft'
    expires_at: string
    created_at: string
}

export type Application = {
    id: string
    job_id: string
    worker_id: string
    cover_note: string
    status: 'new' | 'reviewed' | 'hired'
    applied_at: string
}

export type Payment = {
    id: string
    company_id: string
    job_id: string
    stripe_payment_id: string
    amount: number
    paid_at: string
}