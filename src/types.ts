export interface FormData {
  fullName: string
  email: string
  phone: string
  message: string
  resume: File | null
}

export type Theme = 'light' | 'dark';