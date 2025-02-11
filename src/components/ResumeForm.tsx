import type React from "react"
import { useState } from "react"
import { Upload } from "lucide-react"
import emailjs from "@emailjs/browser"
import type { FormData } from "../types"

export function ResumeForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileAttached, setFileAttached] = useState(false)
  // adiciona um novo estado para a mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // modifica a função handleSubmit para definir a mensagem de sucesso

  // Substitua a função handleSubmit existente pela seguinte:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage(null) // Limpa qualquer mensagem anterior

    try {
      const file = formData.resume
      const reader = new FileReader()

      reader.onload = async () => {
        const base64File = reader.result?.toString().split(",")[1]

        const templateParams = {
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          resume_name: file?.name,
          resume_content: base64File,
        }

        await emailjs.send("service_1r2k5uh", "template_7k2zwrv", templateParams, "2X30L4ABzDnc_059e")

        setSuccessMessage("Currículo enviado com sucesso! Agradecemos sua candidatura.")
        // Limpa o formulário após o envio bem-sucedido
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          resume: null,
        })
        setFileAttached(false)
      }

      if (file) {
        reader.readAsDataURL(file)
      }
    } catch (error) {
      alert("Erro ao enviar o currículo. Por favor, tente novamente.")
      console.error("Erro:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileType = file.type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]

      if (validTypes.includes(fileType)) {
        setFormData((prev) => ({ ...prev, resume: file }))
        setFileAttached(true)
      } else {
        alert("Por favor, envie um documento PDF ou Word")
        setFileAttached(false)
      }
    } else {
      setFileAttached(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
          Obrigado pela sua candidatura!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
          Analisaremos seu currículo e entraremos em contato em breve.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#F12E34] text-white rounded-full 
                    hover:bg-opacity-90 transition-colors text-sm sm:text-base"
        >
          Enviar Outra Candidatura
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full max-w-2xl mx-auto">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome Completo
        </label>
        <input
          type="text"
          id="fullName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                    shadow-sm focus:border-[#F12E34] focus:ring-[#F12E34] 
                    dark:bg-gray-700 dark:text-white text-sm sm:text-base px-3 py-2"
          value={formData.fullName}
          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                      shadow-sm focus:border-[#F12E34] focus:ring-[#F12E34] 
                      dark:bg-gray-700 dark:text-white text-sm sm:text-base px-3 py-2"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                      shadow-sm focus:border-[#F12E34] focus:ring-[#F12E34] 
                      dark:bg-gray-700 dark:text-white text-sm sm:text-base px-3 py-2"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                    shadow-sm focus:border-[#F12E34] focus:ring-[#F12E34] 
                    dark:bg-gray-700 dark:text-white text-sm sm:text-base px-3 py-2"
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Currículo (PDF ou Word)
        </label>
        <div
          className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 
                      dark:border-gray-600 border-dashed rounded-md"
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            <div className="flex flex-col sm:flex-row items-center text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="resume"
                className="relative cursor-pointer rounded-md font-medium text-[#F12E34] 
                        hover:text-opacity-90 focus-within:outline-none"
              >
                <span>Escolher arquivo</span>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </label>
              <p className="mt-2 sm:mt-0 sm:pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF ou Word até 10MB</p>
          </div>
        </div>
        {fileAttached && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">Currículo anexado com sucesso!</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-[#F12E34] text-white rounded-full 
                  hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50
                  text-sm sm:text-base"
      >
        {loading ? "Enviando..." : "Enviar Candidatura"}
      </button>
      {/*a exibição da mensagem de sucesso no JSX */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">{successMessage}</div>
      )}
    </form>
  )
}

