import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Layout, GitBranch, ArrowRight, Code2 } from 'lucide-react';

const BuilderRobot = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
        <motion.g
            animate={{ y: [0, -15, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Robot Head */}
            <rect x="75" y="50" width="50" height="40" rx="8" fill="white" />
            <rect x="85" y="60" width="30" height="15" rx="2" fill="#0EA5E9" fillOpacity="0.2" />
            <motion.rect
                x="90" y="65" width="20" height="5" rx="1" fill="#0EA5E9"
                animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ transformOrigin: "100px 67.5px" }}
            />

            {/* Antenna */}
            <line x1="100" y1="50" x2="100" y2="40" stroke="white" strokeWidth="2" />
            <motion.circle
                cx="100" cy="37" r="4" fill="#0EA5E9"
                animate={{ opacity: [0.4, 1, 0.4], r: [3, 5, 3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
            />

            {/* Robot Body */}
            <rect x="70" y="95" width="60" height="60" rx="10" fill="white" />
            <motion.circle
                cx="100" cy="125" r="15"
                stroke="#0EA5E9" strokeWidth="2" strokeDasharray="5 3"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 125px" }}
                fill="none"
            />
            <circle cx="100" cy="125" r="6" fill="#0EA5E9" fillOpacity="0.3" />

            {/* Floating Tools */}
            <motion.g
                animate={{ rotate: 360, x: [0, 4, 0], y: [0, -4, 0] }}
                transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, x: { duration: 2.5, repeat: Infinity }, y: { duration: 2, repeat: Infinity } }}
                style={{ transformOrigin: "150px 90px" }}
            >
                <path d="M143 87 L157 93 M143 93 L157 87" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
        </motion.g>
    </svg>
);

const features = [
    {
        icon: Server,
        color: "text-accent-cta",
        title: "Infra Escalável",
        desc: "Cloud e containers prontos para qualquer carga"
    },
    {
        icon: Layout,
        color: "text-accent-primary",
        title: "UI/UX Exclusiva",
        desc: "Interfaces pensadas para conversão e usabilidade"
    },
    {
        icon: Cpu,
        color: "text-accent-cta",
        title: "Automação",
        desc: "Processos automáticos que economizam horas por dia"
    },
    {
        icon: GitBranch,
        color: "text-accent-primary",
        title: "Integração de APIs",
        desc: "Conecte qualquer sistema externo ao seu produto"
    }
];

const floatVariants = [
    { y: [0, -8, 0], duration: 3 },
    { y: [0, 6, 0], duration: 4 },
    { y: [0, 7, 0], duration: 3.5 },
    { y: [0, -6, 0], duration: 4.5 },
];

const CustomDevBanner = () => {
    const handleWhatsApp = () => {
        window.open('https://wa.me/5566992353826?text=Olá!%20Gostaria%20de%20falar%20sobre%20um%20projeto%20de%20software%20customizado.', '_blank');
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Robot */}
            <div className="absolute top-1/2 -left-10 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
                <BuilderRobot />
            </div>

            <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-accent-primary/15 to-accent-cta/10 border border-white/5 p-8 md:p-20 relative overflow-hidden">
                {/* Subtle texture */}
                <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "28px 28px" }} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 text-accent-cta font-bold mb-6 text-sm uppercase tracking-widest">
                            <Code2 className="w-4 h-4" /> Engenharia Sob Medida
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Da Ideia ao{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-cta">
                                Produto Final
                            </span>
                        </h2>
                        <p className="text-text-primary/60 text-lg mb-8 leading-relaxed">
                            Construímos soluções de software do zero: CRMs, ERPs, aplicações web e ferramentas internas
                            que se integram perfeitamente ao fluxo do seu negócio.
                        </p>

                        <motion.button
                            onClick={handleWhatsApp}
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-3 text-white font-bold group"
                        >
                            Iniciar projeto customizado
                            <ArrowRight className="w-5 h-5 text-accent-cta group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* Right feature cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-2 gap-4 relative"
                    >
                        {/* Background rotating circle */}
                        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
                            <motion.div
                                className="w-72 h-72 border-2 border-dashed border-accent-cta rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {features.map((feat, i) => (
                            <motion.div
                                key={i}
                                className={`glass p-6 rounded-2xl z-10 ${i % 2 !== 0 ? 'translate-x-4' : ''}`}
                                animate={{ y: floatVariants[i].y }}
                                transition={{ duration: floatVariants[i].duration, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 300 } }}
                            >
                                <feat.icon className={`w-8 h-8 ${feat.color} mb-3`} />
                                <h4 className="font-bold text-sm mb-1">{feat.title}</h4>
                                <p className="text-text-primary/50 text-xs leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/8 blur-[160px] -z-10 pointer-events-none" />
        </section>
    );
};

export default CustomDevBanner;
