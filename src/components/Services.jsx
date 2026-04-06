import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, ArrowUpRight } from 'lucide-react';

const services = [
    {
        icon: Code,
        title: "Desenvolvimento Web",
        description: "Aplicações React e Next.js de última geração com foco em performance extrema, SEO técnico e conversão máxima.",
        color: "from-accent-primary to-[#9333EA]",
        glow: "rgba(124, 58, 237, 0.3)",
        tags: ["React", "Next.js", "TypeScript"]
    },
    {
        icon: Database,
        title: "Sistemas & Automação",
        description: "CRMs, ERPs e ferramentas internas sob medida. Automatize processos e integre seus sistemas via APIs REST.",
        color: "from-accent-cta to-[#0EA5E9]",
        glow: "rgba(6, 182, 212, 0.3)",
        tags: ["Node.js", "PostgreSQL", "REST API"]
    },
    {
        icon: Server,
        title: "Infra & Cloud",
        description: "Arquitetura cloud escalável, pipelines CI/CD e infraestrutura robusta para seu produto crescer sem gargalos.",
        color: "from-[#10B981] to-[#059669]",
        glow: "rgba(16, 185, 129, 0.3)",
        tags: ["AWS", "Docker", "CI/CD"]
    }
];

const Satellite = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
        <motion.g
            animate={{
                y: [0, 20, 0],
                x: [0, 10, 0],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Satellite Body */}
            <rect x="80" y="80" width="40" height="40" rx="4" fill="white" />
            <rect x="85" y="85" width="30" height="30" rx="2" fill="#0EA5E9" fillOpacity="0.2" stroke="#0EA5E9" strokeWidth="1" />

            {/* Solar Panels */}
            <rect x="40" y="90" width="40" height="20" rx="2" fill="white" fillOpacity="0.8" />
            <rect x="120" y="90" width="40" height="20" rx="2" fill="white" fillOpacity="0.8" />
            <path d="M40 100H80M120 100H160" stroke="#0EA5E9" strokeWidth="1" opacity="0.3" />

            {/* Antenna / Beam */}
            <line x1="100" y1="120" x2="100" y2="140" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <motion.circle
                cx="100"
                cy="150"
                r="4"
                fill="#0EA5E9"
                animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.2, 0.9, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Outer ping ring */}
            <motion.circle
                cx="100"
                cy="150"
                r="4"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="1"
                animate={{
                    scale: [1, 5, 1],
                    opacity: [0.4, 0, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.g>
    </svg>
);

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

const Services = () => {
    return (
        <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background Illustration */}
            <div className="absolute top-0 -left-10 opacity-20 pointer-events-none hidden lg:block">
                <Satellite />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">
                    O que Construímos
                </h2>
                <p className="text-text-primary/60 max-w-2xl mx-auto">
                    Tecnologia de ponta, entregue com precisão de engenharia — do front-end ao servidor.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ y: -12, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                        className="group relative p-8 rounded-3xl glass border border-white/5 overflow-hidden cursor-pointer"
                        style={{ '--glow': service.glow }}
                    >
                        {/* Hover border glow */}
                        <motion.div
                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background: `linear-gradient(135deg, ${service.glow.replace('0.3', '0.08')}, transparent)`,
                                boxShadow: `inset 0 0 0 1px ${service.glow.replace('0.3', '0.4')}`
                            }}
                        />

                        {/* Icon */}
                        <motion.div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-3 mb-6 shadow-lg shadow-black/20`}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
                        >
                            <service.icon className="w-full h-full text-white" />
                        </motion.div>

                        <h3 className="text-2xl font-bold mb-3 text-text-primary">{service.title}</h3>
                        <p className="text-text-primary/60 leading-relaxed mb-6">
                            {service.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {service.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-text-primary/50 group-hover:border-white/20 group-hover:text-text-primary/70 transition-all"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center text-sm font-bold text-accent-primary gap-1.5 group-hover:gap-3 transition-all">
                            Saiba Mais <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
