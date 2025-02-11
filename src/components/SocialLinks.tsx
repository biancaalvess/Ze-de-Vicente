import React from 'react';
import { Instagram, Phone } from 'lucide-react';

export function SocialLinks() {
    return (
    <div className="flex justify-center gap-4 sm:gap-6">
    <a
        href="https://api.whatsapp.com/send/?phone=5575999244416&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-2 bg-[#F12E34] text-white rounded-full hover:bg-opacity-90 transition-colors"
    >
        <Phone className="w-5 h-5 mr-2" />
        <span className="text-sm sm:text-base">WhatsApp</span>
    </a>
    
    <a
        href="https://www.instagram.com/zvmaterialdeconstrucaoltda/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-2 bg-[#F12E34] text-white rounded-full hover:bg-opacity-90 transition-colors"
    >
        <Instagram className="w-5 h-5 mr-2" />
        <span className="text-sm sm:text-base">Instagram</span>
    </a>
    </div>
    );
}