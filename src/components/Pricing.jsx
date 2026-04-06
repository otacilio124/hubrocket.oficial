import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, ShieldCheck } from 'lucide-react';

const plans = [
    {
        name: "Site Profissional",
        price: "1.500",
        period: "por projeto",
        description: "Presença digital impecável com landing page ou site institucional de alto impacto.",
        features: [
            "Landing page ou site institucional",
            "Design exclusivo UI/UX",
            "Otimização de performance (Lighthouse 90+)",
            "Responsivo para todos os dispositivos",
            "Deploy e hospedagem inclusos"
        ],
        highlight: false,
        cta: "Solicitar Site"
    },
    {
        name: "Sistema Web",
        price: "4.500",
        period: "por projeto",
        description: "Aplicação web completa com painel administrativo, autenticação e banco de dados.",
        features: [
            "Aplicação React / Next.js completa",
            "API REST com autenticação JWT",
            "Banco de dados e painel admin",
            "Dashboard com relatórios e gráficos",
            "Integrações com serviços externos",
            "Suporte pós-lançamento 30 dias"
        ],
        highlight: true,
        cta: "Iniciar Projeto"
    },
    {
        name: "Projeto Enterprise",
        price: "consulta",
        period: "",
        description: "CRM/ERP sob medida com automações, integrações avançadas e infraestrutura escalável.",
        features: [
            "CRM ou ERP totalmente customizado",
            "Automação de processos de negócio",
            "Integrações com múltiplas APIs",
            "Infraestrutura cloud escalável (AWS)",
            "CI/CD e monitoramento contínuo",
            "SLA e suporte dedicado"
        ],
        highlight: false,
        cta: "Falar com Especialista"
    }
];

const MissionMonitor = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(124,58,237,0.2)]">
        <motion.g
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Monitor Stand */}
            <path d="M70 140H130L120 120H80L70 140Z" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="1.5" />

            {/* Screen Frame */}
            <rect x="50" y="50" width="100" height="70" rx="5" fill="white" />
            <rect x="56" y="56" width="88" height="58" rx="3" fill="#0B0F19" />

            {/* Animated chart line */}
            <motion.path
                d="M65 95 L80 78 L95 98 L112 68 L135 88"
                stroke="#7C3AED"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />

            {/* Area fill under chart */}
            <motion.path
                d="M65 95 L80 78 L95 98 L112 68 L135 88 L135 113 L65 113Z"
                fill="#7C3AED"
                fillOpacity="0.08"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />

            {/* Blinking data dots */}
            {[
                { cx: 80, cy: 78 },
                { cx: 112, cy: 68 },
                { cx: 135, cy: 88 }
            ].map((dot, i) => (
                <motion.circle
                    key={i}
                    cx={dot.cx} cy={dot.cy} r="3"
                    fill="#7C3AED"
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
                />
            ))}
        </motion.g>
    </svg>
);

const Pricing = () => {
    const handlePlanSelection = (planName) => {
        const text = encodeURIComponent(`Olá! Gostaria de saber mais sobre o plano ${planName}.`);
        window.open(`https://wa.me/5566992353826?text=${text}`, '_blank');
    };

    return (
        <section id="pricing" className="py-24 px-6 bg-black/40 relative overflow-hidden">
            {/* Background Illustration */}
            <div className="absolute bottom-10 -right-10 opacity-20 pointer-events-none hidden lg:block">
                <MissionMonitor />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">Planos de Projeto</h2>
                    <p className="text-text-primary/60 max-w-2xl mx-auto">
                        Transparência total no investimento. Escolha o escopo certo para o seu projeto — sem surpresas.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: plan.highlight ? 1.03 : 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 ${plan.highlight
                                ? 'bg-accent-primary/5 border-[#7C3AED] z-10 shadow-2xl shadow-accent-primary/20'
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                        >
                            {plan.highlight && (
                                <motion.div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#7C3AED] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 border-4 border-[#0B0F19]"
                                    animate={{
                                        boxShadow: [
                                            "0 0 0 0px rgba(124, 58, 237, 0)",
                                            "0 0 0 10px rgba(124, 58, 237, 0.35)",
                                            "0 0 0 0px rgba(124, 58, 237, 0)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Zap className="w-3 h-3" /> Mais Popular
                                </motion.div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-text-primary/80 mb-4">{plan.name}</h3>

                                {plan.price === "consulta" ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-text-primary/80">Sob</span>
                                        <span className="text-4xl font-black text-text-primary/80">Consulta</span>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-xs text-text-primary/40 uppercase tracking-widest mb-1.5">A partir de:</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black">R$</span>
                                            <span className="text-6xl font-black">{plan.price}</span>
                                        </div>
                                        <span className="text-text-primary/40 font-medium text-sm">{plan.period}</span>
                                    </>
                                )}

                                <p className="mt-4 text-text-primary/60 text-sm leading-relaxed min-h-[40px]">{plan.description}</p>
                            </div>

                            <div className="flex-grow space-y-3.5 mb-10">
                                {plan.features.map((feature, fIndex) => (
                                    <motion.div
                                        key={fIndex}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + fIndex * 0.07 }}
                                    >
                                        <div className="mt-1 bg-accent-primary/20 rounded-full p-0.5 flex-shrink-0">
                                            <Check className="w-3 h-3 text-accent-primary" />
                                        </div>
                                        <span className="text-sm text-text-primary/80">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePlanSelection(plan.name)}
                                className={`w-full py-4 rounded-2xl font-bold transition-all text-lg active:scale-95 ${plan.highlight
                                    ? 'bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white shadow-lg shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/50 hover:scale-[1.02]'
                                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20'
                                    }`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
