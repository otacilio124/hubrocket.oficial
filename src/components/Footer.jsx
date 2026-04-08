import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import logo from '../assets/Rocket.png';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16 sm:mb-20">
                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                    <motion.div
                        className="flex items-center gap-2 mb-6 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.img
                            src={logo}
                            alt="HubRocket Logo"
                            className="w-8 h-8"
                            animate={{
                                filter: [
                                    "drop-shadow(0 0 0px #7C3AED)",
                                    "drop-shadow(0 0 12px #7C3AED)",
                                    "drop-shadow(0 0 0px #7C3AED)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                    <p className="text-text-primary/40 text-sm leading-relaxed mb-6">
                        Engenharia de software sob medida — sistemas web, automação e infraestrutura escalável para negócios que querem crescer.
                    </p>
                    <div className="flex gap-3">
                        <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-primary transition-colors border border-white/5 hover:border-accent-primary/30">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://www.linkedin.com/in/otacilio-de-oliveira-neto-a8349b205/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-primary transition-colors border border-white/5 hover:border-accent-primary/30">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-primary transition-colors border border-white/5 hover:border-accent-primary/30">
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Serviços */}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-text-primary/80">Serviços</h4>
                    <ul className="space-y-4 text-sm text-text-primary/60">
                        <li><a href="#services" className="hover:text-white transition-colors">Desenvolvimento Web</a></li>
                        <li><a href="#services" className="hover:text-white transition-colors">Sistemas & Automação</a></li>
                        <li><a href="#services" className="hover:text-white transition-colors">Infra & Cloud</a></li>
                        <li><a href="#custom-dev" className="hover:text-white transition-colors">CRM / ERP Sob Medida</a></li>
                    </ul>
                </div>

                {/* Empresa */}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-text-primary/80">Empresa</h4>
                    <ul className="space-y-4 text-sm text-text-primary/60">
                        <li><a href="#leadership" className="hover:text-white transition-colors">Quem Somos</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Portfólio</a></li>
                        <li><a href="#orcamento" className="hover:text-white transition-colors">Orçamento</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-text-primary/80">Newsletter</h4>
                    <p className="text-sm text-text-primary/60 mb-4">Receba conteúdos técnicos e novidades sobre engenharia de software.</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-primary transition-colors"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-primary p-2 rounded-lg hover:bg-accent-primary/80 transition-colors">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-text-primary/30 border-t border-white/5 pt-10 gap-4">
                <p>© 2026 HubRocket Dev. Todos os direitos reservados.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                    <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                </div>
            </div>
        </footer>
    );
};

const ArrowRight = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export default Footer;
