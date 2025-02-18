import { Building } from "lucide-react";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { ResumeForm } from "./components/ResumeForm";
import { Location } from "./components/Location";
import { SocialLinks } from "./components/SocialLinks";
import { Footer } from "./components/Footer";
import React from "react";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F8F8F8] dark:bg-[#1E1E1E] transition-colors">
        {/* Botão de alternância de tema */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Cabeçalho */}
            <header className="text-center mb-8 sm:mb-12 px-4">
              <div className="flex justify-center items-center mb-4 sm:mb-6">
                <Building className="w-12 h-12 sm:w-14 sm:h-14 text-[#F12E34]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                ZÉ DE VICENTE
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2">
                Construindo Sonhos há mais de 40 Anos
              </p>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4 mb-6">
                Junte-se à nossa equipe e faça parte de uma empresa que é referência 
                no mercado de materiais de construção.
              </p>

              <SocialLinks />
            </header>

            {/* Conteúdo principal */}
            <main className="space-y-8">
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 mx-4 sm:mx-auto">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                  Envie sua Candidatura
                </h2>
                <ResumeForm />
              </section>

              {/* Localização */}
              <Location />
            </main>
          </div>
        </div>

        {/* Rodapé */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
