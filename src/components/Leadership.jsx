import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Code2, TrendingUp } from 'lucide-react';
import otacilioImg from '../assets/otacilio.PNG';
import pedroImg from '../assets/pedro.PNG';

const leaders = [
    {
        name: "Otacilio Neto",
        role: "Fundador & CTO",
        position: "Diretor de Tecnologia",
        description: "Engenheiro full-stack apaixonado por sistemas escaláveis e interfaces que convertem. Lidera a arquitetura técnica e a entrega de cada projeto com foco em qualidade e performance.",
        image: otacilioImg,
        icon: Code2,
        skills: [
            "React / Next.js", "Node.js", "TypeScript", "PostgreSQL",
            "AWS / Cloud", "Docker", "REST APIs", "UI/UX Design"
        ],
        linkedin: "https://www.linkedin.com/in/otacilio-de-oliveira-neto-a8349b205/"
    },
    {
        name: "Pedro Aleknovic",
        role: "Fundador & CSO",
        position: "Diretor de Vendas",
        description: "Especialista em estratégia comercial de sistemas empresariais com foco em transformação digital. Conduz a expansão de mercado e o relacionamento com clientes estratégicos, garantindo soluções que agregam valor real aos negócios.",
        image: pedroImg,
        icon: TrendingUp,
        skills: [
            "Estratégia Comercial", "Consultoria de Sistemas", "Transformação Digital",
            "Relacionamento B2B", "Gestão de Portfólio", "Expansão de Mercado"
        ],
        linkedin: "#"
    }
];

const CodeOrb = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 md:w-64 md:h-64">
        <motion.g
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Outer orbit ring */}
            <motion.ellipse
                cx="100" cy="100" rx="70" ry="25"
                stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="6 4"
                fill="none" opacity="0.4"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
            />
            {/* Orbiting dot */}
            <motion.circle
                cx="30" cy="100" r="5" fill="#7C3AED"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
            />

            {/* Core circle */}
            <circle cx="100" cy="100" r="40" fill="white" fillOpacity="0.06" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />

            {/* Code brackets */}
            <path d="M82 88 L72 100 L82 112" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M118 88 L128 100 L118 112" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <motion.path
                d="M95 82 L105 118"
                stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating sparks */}
            {[...Array(4)].map((_, i) => (
                <motion.circle
                    key={i}
                    cx={100 + Math.cos((i / 4) * Math.PI * 2) * 55}
                    cy={100 + Math.sin((i / 4) * Math.PI * 2) * 20}
                    r="2.5"
                    fill={i % 2 === 0 ? "#7C3AED" : "#06B6D4"}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        y: [0, -15, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}
        </motion.g>
    </svg>
);

const Leadership = () => {
    return (
        <section id="leadership" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 -right-16 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block">
                <CodeOrb />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary uppercase tracking-tighter">
                    Quem Está Por Trás
                </h2>
                <p className="text-text-primary/60 max-w-2xl mx-auto leading-relaxed">
                    Liderança técnica dedicada à engenharia de alta performance e à entrega de software que realmente funciona.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {leaders.map((leader, index) => (
                    <motion.div
                        key={leader.name}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                        className="group relative p-8 md:p-12 rounded-[2rem] glass border border-white/10 hover:border-accent-cta/30 transition-all duration-500 overflow-hidden"
                    >
                        {/* Card glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-cta/5 to-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

                        <div className="flex flex-col items-center md:items-start gap-6 relative z-10">
                            {/* Photo / Icon */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border-2 border-white/10 overflow-hidden group-hover:border-accent-cta/40 transition-colors duration-500 bg-bg-primary flex items-center justify-center"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {leader.image ? (
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-cta/20">
                                            <leader.icon className="w-20 h-20 text-accent-cta/60" />
                                        </div>
                                    )}
                                </motion.div>

                                {/* LinkedIn badge */}
                                {leader.linkedin !== "#" && (
                                    <motion.a
                                        href={leader.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.15 }}
                                        className="absolute -bottom-2 -right-2 w-11 h-11 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-lg z-10"
                                        title="LinkedIn"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </motion.a>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center w-full">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <leader.icon className="w-4 h-4 text-accent-cta" />
                                    <span className="text-accent-cta font-bold uppercase tracking-widest text-xs">{leader.role}</span>
                                </div>

                                <h3 className="text-3xl font-black mb-1 text-text-primary">
                                    {leader.name}
                                </h3>

                                <p className="text-text-primary/50 font-medium mb-5 text-sm">
                                    {leader.position}
                                </p>

                                <p className="text-text-primary/60 leading-relaxed mb-6 text-sm md:text-base">
                                    {leader.description}
                                </p>

                                {/* Skill chips */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {leader.skills.map((skill, i) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + i * 0.05 }}
                                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-text-primary/60 hover:border-accent-primary/40 hover:text-text-primary/90 transition-all cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative accent line */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-cta/20 to-transparent mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Leadership;
