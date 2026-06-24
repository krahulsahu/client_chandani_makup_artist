'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  number?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  number = '+919999999999', 
  message = 'Hello Chandani, I would like to inquire about your luxury makeup services.' 
}: WhatsAppButtonProps) {
  
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${number.replace(/\+/g, '')}?text=${encodedMsg}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-colors duration-300 group border border-white/20"
      aria-label="Contact on WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:hidden" />
      <MessageCircle className="w-6 h-6 fill-current relative z-10" />
    </motion.a>
  );
}
