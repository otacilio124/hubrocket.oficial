import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/Rocket.png';

const Navbar = () => {
    const handleWhatsApp = () => {
        window.open('https://wa.me/5566992353826?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20de%20projeto.', '_blank');
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between"
        >
            <div className="flex items-center gap-2">
                <motion.img
                    src={logo}
                    alt="HubRocket Logo"
                    className="w-32 h-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                />
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-primary/70">
                <a href="#services" className="hover:text-accent-primary transition-colors hover:text-white">Serviços</a>
                <a href="#leadership" className="hover:text-accent-primary transition-colors hover:text-white">Equipe</a>
                <a href="#pricing" className="hover:text-accent-primary transition-colors hover:text-white">Planos</a>
                <a href="#custom-dev" className="hover:text-accent-primary transition-colors hover:text-white">Projetos</a>
            </div>

            <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-primary hover:bg-accent-primary/90 text-white px-6 py-2 rounded-full font-semibold transition-colors text-sm shadow-lg shadow-accent-primary/20"
            >
                Solicitar Orçamento
            </motion.button>
        </motion.nav>
    );
};

export default Navbar;
