import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Bot, Settings2, TrendingUp } from 'lucide-react';

/* ─── Stars ──────────────────────────────────────────────────────────────────── */
const starData = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
    purple: Math.random() > 0.75,
}));

const StarsBg = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {starData.map((s) => (
            <motion.div
                key={s.id}
                className="absolute rounded-full"
                style={{
                    width: s.size,
                    height: s.size,
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    background: s.purple ? '#A78BFA' : 'white',
                    boxShadow: s.purple
                        ? '0 0 5px 1px rgba(167,139,250,0.6)'
                        : '0 0 4px 1px rgba(255,255,255,0.5)',
                }}
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            />
        ))}
    </div>
);

/* ─── Workstation Illustration ───────────────────────────────────────────────── */
const WorkstationSVG = () => (
    <svg viewBox="0 0 480 370" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg drop-shadow-[0_0_60px_rgba(124,58,237,0.2)]">
        <defs>
            <linearGradient id="wsDeskTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22065a" />
                <stop offset="100%" stopColor="#130228" />
            </linearGradient>
            <linearGradient id="wsScreenBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a0545" />
                <stop offset="100%" stopColor="#0a0118" />
            </linearGradient>
            <filter id="wsGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* ── Ambient glow blobs ── */}
        <ellipse cx="280" cy="300" rx="200" ry="70" fill="#7C3AED" fillOpacity="0.10" />
        <ellipse cx="320" cy="200" rx="120" ry="80" fill="#06B6D4" fillOpacity="0.05" />

        {/* ── Platform base — isometric ── */}
        {/* Top face */}
        <path d="M150 248 L285 187 L398 250 L263 311 Z" fill="url(#wsDeskTop)" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Left face */}
        <path d="M150 248 L150 272 L263 335 L263 311 Z" fill="#0d0118" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.3" />
        {/* Right face */}
        <path d="M398 250 L398 274 L263 335 L263 311 Z" fill="#110220" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.3" />

        {/* ── Raised console on desk ── */}
        {/* Top */}
        <path d="M183 231 L283 179 L348 224 L248 276 Z" fill="#2a0856" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.7" />
        {/* Left */}
        <path d="M183 231 L183 251 L248 296 L248 276 Z" fill="#170436" />
        {/* Right */}
        <path d="M348 224 L348 244 L248 296 L248 276 Z" fill="#1c0540" />

        {/* ── Main central screen (isometric panel floating up) ── */}
        <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
            {/* Screen frame */}
            <path d="M205 152 L290 103 L362 151 L277 200 Z"
                fill="url(#wsScreenBg)" stroke="#7C3AED" strokeWidth="1.8" strokeOpacity="0.9" />
            {/* Animated chart line */}
            <motion.polyline
                points="218,182 232,168 246,175 260,158 274,163 288,148 302,154 316,143"
                stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
                filter="url(#wsGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            />
            {/* Area fill */}
            <motion.path
                d="M218 182 L232 168 L246 175 L260 158 L274 163 L288 148 L302 154 L316 143 L316 195 L218 195 Z"
                fill="#06B6D4" fillOpacity="0.06"
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            />
            {/* Data dots */}
            {[{ x: 260, y: 158 }, { x: 288, y: 148 }, { x: 316, y: 143 }].map((d, i) => (
                <motion.circle key={i} cx={d.x} cy={d.y} r="3" fill="#06B6D4"
                    filter="url(#wsGlow)"
                    animate={{ opacity: [0, 1, 0], r: [2, 4, 2] }}
                    transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.45 }} />
            ))}
            {/* Screen header bar */}
            <line x1="215" y1="115" x2="345" y2="115" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.4" />
            {/* Status dots on screen */}
            <circle cx="222" cy="111" r="2.5" fill="#7C3AED" fillOpacity="0.7" />
            <circle cx="230" cy="111" r="2.5" fill="#06B6D4" fillOpacity="0.7" />
        </motion.g>

        {/* ── Left floating panel ── */}
        <motion.g
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
            <rect x="52" y="128" width="115" height="92" rx="7"
                fill="#0e0122" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.6" />
            <rect x="58" y="134" width="103" height="80" rx="5" fill="#0a0118" />
            {/* "Consultant" label bar */}
            <rect x="63" y="139" width="55" height="7" rx="2" fill="#7C3AED" fillOpacity="0.55" />
            <rect x="63" y="139" width="55" height="7" rx="2" fill="#7C3AED" fillOpacity="0.2"
                style={{ filter: 'blur(3px)' }} />
            {/* Bar chart */}
            <rect x="64" y="157" width="14" height="32" rx="2" fill="#7C3AED" fillOpacity="0.75" />
            <rect x="82" y="164" width="14" height="25" rx="2" fill="#7C3AED" fillOpacity="0.55" />
            <rect x="100" y="150" width="14" height="39" rx="2" fill="#06B6D4" fillOpacity="0.75" />
            <rect x="118" y="159" width="14" height="30" rx="2" fill="#7C3AED" fillOpacity="0.6" />
            {/* Blinking dot */}
            <motion.circle cx="152" cy="142" r="4" fill="#06B6D4"
                filter="url(#wsGlow)"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }} />
            {/* Text label */}
            <text x="63" y="208" fill="#7C3AED" fontSize="6.5" fontFamily="monospace" fillOpacity="0.7">PERFORMANCE</text>
        </motion.g>

        {/* ── Right floating panel (Consultant) ── */}
        <motion.g
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
            <rect x="378" y="98" width="90" height="80" rx="7"
                fill="#0e0122" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.5" />
            <rect x="384" y="104" width="78" height="68" rx="5" fill="#050e1f" />
            <text x="389" y="118" fill="#06B6D4" fontSize="6.5" fontFamily="monospace" fillOpacity="0.9">CONSULTANT</text>
            <line x1="384" y1="122" x2="462" y2="122" stroke="#06B6D4" strokeWidth="0.5" strokeOpacity="0.3" />
            {/* Mini line graph */}
            <polyline points="389,148 399,138 409,143 419,130 429,134 439,124 449,128"
                stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <polyline points="389,158 399,153 409,156 419,148 429,151 439,143 449,147"
                stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" fill="none" fillOpacity="0.7" />
            {/* Metric value */}
            <text x="389" y="173" fill="#06B6D4" fontSize="12" fontWeight="bold" fontFamily="monospace">+47%</text>
        </motion.g>

        {/* ── Person silhouette ── */}
        <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
            {/* Head */}
            <circle cx="340" cy="196" r="11" fill="white" fillOpacity="0.93" />
            <circle cx="340" cy="196" r="11" fill="#7C3AED" fillOpacity="0.1" />
            {/* Body */}
            <rect x="329" y="208" width="23" height="30" rx="5" fill="white" fillOpacity="0.88" />
            {/* Collar accent */}
            <path d="M332 210 L340 216 L348 210" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
            {/* Arms */}
            <path d="M329 215 L316 224" stroke="white" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.8" />
            <path d="M352 215 L362 224" stroke="white" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.8" />
        </motion.g>

        {/* ── Holographic orbit ring ── */}
        <motion.ellipse
            cx="270" cy="288" rx="110" ry="28"
            stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.25" fill="none"
            strokeDasharray="10 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '270px 288px' }}
        />

        {/* ── Grid lines on desk top ── */}
        <line x1="190" y1="270" x2="262" y2="310" stroke="#7C3AED" strokeWidth="0.4" strokeOpacity="0.18" />
        <line x1="225" y1="255" x2="297" y2="295" stroke="#7C3AED" strokeWidth="0.4" strokeOpacity="0.18" />
        <line x1="262" y1="240" x2="334" y2="280" stroke="#7C3AED" strokeWidth="0.4" strokeOpacity="0.18" />
        <line x1="300" y1="225" x2="372" y2="265" stroke="#7C3AED" strokeWidth="0.4" strokeOpacity="0.18" />

        {/* ── Floating data particles ── */}
        {[
            { x: 178, y: 175, delay: 0, color: '#7C3AED' },
            { x: 380, y: 205, delay: 0.9, color: '#06B6D4' },
            { x: 142, y: 235, delay: 1.8, color: '#A78BFA' },
            { x: 440, y: 160, delay: 0.5, color: '#7C3AED' },
        ].map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r="3" fill={p.color}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.8, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: p.delay }} />
        ))}
    </svg>
);

/* ─── Floating icon card ─────────────────────────────────────────────────────── */
const FloatingIconCard = ({ icon: Icon, color, style, delay, duration = 3.5 }) => (
    <motion.div
        className="absolute glass border border-white/10 rounded-2xl p-3.5 pointer-events-none hidden lg:flex flex-col items-center justify-center"
        style={style}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        animate={{ y: [0, -8, 0] }}
    >
        <Icon className={`w-6 h-6 ${color}`} />
    </motion.div>
);

/* ─── OrcamentoBanner ────────────────────────────────────────────────────────── */
const OrcamentoBanner = () => {
    const handleWhatsApp = () => {
        window.open(
            'https://wa.me/5566992353826?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20para%20solicitar%20um%20orçamento%20personalizado.',
            '_blank'
        );
    };

    return (
        <section id="orcamento" className="relative py-24 px-6 overflow-hidden bg-[#06030f]">
            {/* Stars */}
            <StarsBg />

            {/* Nebula glows */}
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-accent-primary/8 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[300px] bg-accent-cta/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[480px]">

                    {/* ── Left: Text content ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.span
                            className="block text-accent-cta text-xs font-bold uppercase tracking-[0.22em] mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Solicitar Orçamento Personalizado
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black uppercase leading-[1.05] tracking-tighter mb-6">
                            Seu Projeto Merece
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-[#A855F7] to-accent-cta">
                                Atenção Exclusiva
                            </span>
                        </h2>

                        <p className="text-text-primary/60 text-lg leading-relaxed mb-10 max-w-md">
                            Cada negócio tem suas particularidades. Vamos conversar para entender suas necessidades e criar uma proposta sob medida, focada em resultados reais.
                        </p>

                        <motion.button
                            onClick={handleWhatsApp}
                            className="inline-flex items-center gap-3 bg-accent-primary hover:bg-accent-primary/90 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent-primary/30 hover:shadow-accent-primary/50 group"
                            whileTap={{ scale: 0.97 }}
                        >
                            Falar com um Especialista Agora
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* ── Right: Illustration ── */}
                    <motion.div
                        className="relative flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    >
                        {/* Floating icon cards */}
                        <FloatingIconCard icon={Users} color="text-accent-primary" style={{ top: '8%', left: '-2%' }} delay={0.4} />
                        <FloatingIconCard icon={Bot} color="text-accent-cta" style={{ top: '42%', left: '-6%' }} delay={0.7} duration={4} />
                        <FloatingIconCard icon={Settings2} color="text-accent-primary/80" style={{ bottom: '8%', left: '6%' }} delay={0.9} duration={3.8} />
                        <FloatingIconCard icon={TrendingUp} color="text-accent-cta" style={{ top: '6%', right: '2%' }} delay={1.1} duration={3.2} />

                        <WorkstationSVG />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OrcamentoBanner;
