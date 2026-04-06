import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppFAB = () => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="fixed bottom-8 right-8 z-[100]"
        >
            <motion.button
                animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        "0 0 0 0px rgba(34, 197, 94, 0)",
                        "0 0 0 15px rgba(34, 197, 94, 0.2)",
                        "0 0 0 0px rgba(34, 197, 94, 0)"
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                onClick={() => window.open('https://wa.me/5566992353826?text=Olá!%20Gostaria%20de%20conversar%20sobre%20um%20projeto%20de%20software.', '_blank')}
                className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform group"
            >
                <MessageCircle className="w-7 h-7 fill-white" />
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#0B0F19] px-4 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                    Falar com um Especialista
                </span>
            </motion.button>
        </motion.div>
    );
};

export default WhatsAppFAB;
