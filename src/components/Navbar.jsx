import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Rocket.png';

const NAV_LINKS = [
    { href: '#services', label: 'Serviços' },
    { href: '#leadership', label: 'Equipe' },
    { href: '#orcamento', label: 'Orçamento' },
    { href: '#custom-dev', label: 'Projetos' },
];

const MENU_STARS = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 3 + 1.5,
    delay: Math.random() * 4,
    purple: Math.random() > 0.7,
}));

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleWhatsApp = () => {
        window.open(
            'https://wa.me/5566992353826?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20de%20projeto.',
            '_blank'
        );
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* ── Desktop / Mobile Navbar bar ── */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between transition-all duration-300 ${
                    scrolled
                        ? 'backdrop-blur-xl bg-[#030712]/80 border-b border-white/5 shadow-xl shadow-black/20'
                        : 'glass'
                }`}
            >
                {/* Logo */}
                <motion.a
                    href="#"
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <img
                        src={logo}
                        alt="HubRocket Logo"
                        className="w-28 sm:w-32 h-8 sm:h-10 object-contain"
                    />
                </motion.a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-text-primary/70">
                    {NAV_LINKS.map((link) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className="relative hover:text-white transition-colors duration-200 group"
                            whileHover={{ y: -1 }}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-primary group-hover:w-full transition-all duration-300" />
                        </motion.a>
                    ))}
                </div>

                {/* Desktop CTA */}
                <motion.button
                    onClick={handleWhatsApp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex bg-accent-primary hover:bg-accent-primary/90 text-white px-5 lg:px-6 py-2 rounded-full font-semibold transition-colors text-sm shadow-lg shadow-accent-primary/20"
                >
                    Solicitar Orçamento
                </motion.button>

                {/* Mobile hamburger */}
                <motion.button
                    className="md:hidden relative z-[51] w-10 h-10 flex items-center justify-center rounded-xl glass border border-white/10"
                    onClick={() => setMenuOpen((v) => !v)}
                    whileTap={{ scale: 0.92 }}
                    aria-label="Menu"
                >
                    <AnimatePresence mode="wait">
                        {menuOpen ? (
                            <motion.span key="x"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-5 h-5 text-white" />
                            </motion.span>
                        ) : (
                            <motion.span key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="w-5 h-5 text-white" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.nav>

            {/* ── Mobile menu overlay ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        className="fixed inset-0 z-40 bg-[#030712]/97 backdrop-blur-2xl flex flex-col overflow-hidden"
                        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Stars background */}
                        <div className="absolute inset-0 pointer-events-none">
                            {MENU_STARS.map((s) => (
                                <motion.div
                                    key={s.id}
                                    className="absolute rounded-full"
                                    style={{
                                        left: `${s.x}%`,
                                        top: `${s.y}%`,
                                        width: s.size,
                                        height: s.size,
                                        background: s.purple ? '#A78BFA' : 'white',
                                        boxShadow: s.purple
                                            ? '0 0 5px 1px rgba(167,139,250,0.6)'
                                            : '0 0 3px 1px rgba(255,255,255,0.5)',
                                    }}
                                    animate={{ opacity: [0.1, 0.8, 0.1] }}
                                    transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
                                />
                            ))}
                        </div>

                        {/* Nebula glow */}
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />

                        {/* Menu content */}
                        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-2 pt-20 pb-10 px-8">
                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white/80 hover:text-white transition-colors py-3"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ x: 8, color: '#A78BFA' }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.div
                                className="mt-8 w-full max-w-xs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <button
                                    onClick={() => { handleWhatsApp(); closeMenu(); }}
                                    className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white py-4 rounded-full font-bold text-base uppercase tracking-wider shadow-xl shadow-accent-primary/30 transition-all active:scale-95"
                                >
                                    Solicitar Orçamento
                                </button>
                            </motion.div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
