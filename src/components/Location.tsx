    import React from 'react';
    import { MapPin } from 'lucide-react';

    export function Location() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-[#F12E34] mr-2" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Nossa Localização
            </h3>
        </div>
        
        <div className="space-y-2 text-center">
            <p className="text-gray-600 dark:text-gray-300">
            Avenida Antonio Carlos Magalhaes, 257
            </p>
            <p className="text-gray-600 dark:text-gray-300">
            Cícero Dantas - Bahia, 48410-000
            </p>
        </div>

        <div className="mt-4">
            <iframe
            title="Localização Zé de Vicente"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.0143506829176!2d-38.37987728563979!3d-10.595580263561214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x707a537c7b91b2f%3A0x4eaaea42b46fdd47!2sAv.%20Ant%C3%B4nio%20Carlos%20Magalh%C3%A3es%2C%20257%20-%20Centro%2C%20C%C3%ADcero%20Dantas%20-%20BA%2C%2048410-000!5e0!3m2!1spt-BR!2sbr!4v1707589012345!5m2!1spt-BR!2sbr"
            className="w-full h-64 rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            />
        </div>
        </div>
    );
    }