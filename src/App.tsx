import React from 'react';
import { Building } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { ResumeForm } from './components/ResumeForm';
import { Location } from './components/Location';
import { SocialLinks } from './components/SocialLinks';
import { Footer } from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F8F8F8] dark:bg-[#1E1E1E] transition-colors">
        <ThemeToggle />
        
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 px-4">
              <div className="flex justify-center items-center mb-4 sm:mb-6">
              </div>
              <div className="flex justify-center items-center mb-4 sm:mb-6">
                <Building className="w-10 h-10 sm:w-12 sm:h-12 text-[#F12E34]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                ZÉ DE VICENTE
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2">
                Construindo Sonhos há mais de 10 Anos
              </p>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4 mb-6">
                Junte-se à nossa equipe e faça parte de uma empresa que é referência 
                no mercado de materiais de construção.
              </p>
              
              <SocialLinks />
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mx-4 sm:mx-auto">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                  Envie sua Candidatura
                </h2>
                <ResumeForm />
              </div>

              <Location />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App