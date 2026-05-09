import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import createGlobe from 'cobe';

/* ─── StarField ─────────────────────────────────────────────────────────── */
const starData = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    purple: Math.random() > 0.8,
}));

const StarField = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {starData.map((star) => (
            <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                    width: star.size,
                    height: star.size,
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    background: star.purple ? '#A78BFA' : 'white',
                    boxShadow: star.purple
                        ? '0 0 8px 2px rgba(167,139,250,0.7)'
                        : '0 0 6px 1px rgba(255,255,255,0.6)',
                }}
                animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.3, 1] }}
                transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
            />
        ))}
    </div>
);

/* ─── Earth (cobe WebGL globe) ───────────────────────────────────────────── */
const Earth = () => {
    const canvasRef = useRef(null);
    const phiRef = useRef(0);

    useEffect(() => {
        let globe;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const size = canvas.offsetWidth * (window.devicePixelRatio || 1);

        globe = createGlobe(canvas, {
            devicePixelRatio: window.devicePixelRatio || 1,
            width: size,
            height: size,
            phi: 0,
            theta: 0.25,
            dark: 1,
            diffuse: 1.8,
            mapSamples: 20000,
            mapBrightness: 5,
            baseColor: [0.08, 0.18, 0.52],
            markerColor: [0.4, 0.9, 1],
            glowColor: [0.15, 0.45, 1.0],
            markers: [],
            onRender: (state) => {
                phiRef.current += 0.003;
                state.phi = phiRef.current;
            },
        });

        return () => globe.destroy();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-[380px] h-[380px] md:w-[580px] md:h-[580px] lg:w-[700px] lg:h-[700px]"
            style={{ aspectRatio: '1' }}
        />
    );
};

/* ─── Rocket SVG ─────────────────────────────────────────────────────────── */
const RocketSVG = () => (
    <svg viewBox="0 0 100 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 md:w-20 h-auto">
        <defs>
            <linearGradient id="flameOuter" x1="50" y1="170" x2="50" y2="225" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF9500" />
                <stop offset="45%" stopColor="#FF4500" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FF1500" stopOpacity="0" />
            </linearGradient>
        </defs>

        {/* Body */}
        <path d="M50 6 C31 6 21 36 21 64 L21 138 C21 148 34 154 50 154 C66 154 79 148 79 138 L79 64 C79 36 69 6 50 6Z" fill="white" fillOpacity="0.96" />

        {/* Accent band */}
        <path d="M21 102 L79 102 L79 113 L21 113 Z" fill="#7C3AED" fillOpacity="0.28" />

        {/* Window */}
        <circle cx="50" cy="73" r="14" fill="#030712" />
        <circle cx="50" cy="73" r="12" fill="#0EA5E9" fillOpacity="0.18" />
        <circle cx="50" cy="73" r="12" stroke="#06B6D4" strokeWidth="1.5" />
        <ellipse cx="44" cy="68" rx="3.5" ry="5" fill="white" fillOpacity="0.22" transform="rotate(-20 44 68)" />

        {/* Fins */}
        <path d="M21 117 L4 158 L21 143 Z" fill="white" fillOpacity="0.82" />
        <path d="M79 117 L96 158 L79 143 Z" fill="white" fillOpacity="0.82" />

        {/* Engine bell */}
        <path d="M35 154 L29 170 L71 170 L65 154 Z" fill="white" fillOpacity="0.5" />

        {/* Flame — outer */}
        <motion.path
            fill="url(#flameOuter)"
            animate={{
                d: [
                    'M37 170 Q28 190 34 206 Q42 218 50 214 Q58 218 66 206 Q72 190 63 170 Z',
                    'M35 170 Q24 194 32 212 Q41 225 50 220 Q59 225 68 212 Q76 194 65 170 Z',
                    'M38 170 Q30 188 35 204 Q43 215 50 211 Q57 215 65 204 Q70 188 62 170 Z',
                    'M37 170 Q28 190 34 206 Q42 218 50 214 Q58 218 66 206 Q72 190 63 170 Z',
                ],
            }}
            transition={{ duration: 0.22, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Flame — inner */}
        <motion.path
            fill="white"
            animate={{
                d: [
                    'M44 170 Q40 180 42 190 Q46 197 50 194 Q54 197 58 190 Q60 180 56 170 Z',
                    'M43 170 Q38 182 41 193 Q45 201 50 198 Q55 201 59 193 Q62 182 57 170 Z',
                    'M44 170 Q40 180 42 190 Q46 197 50 194 Q54 197 58 190 Q60 180 56 170 Z',
                ],
                opacity: [1, 0.8, 1],
            }}
            transition={{ duration: 0.18, repeat: Infinity, ease: 'easeInOut' }}
        />
    </svg>
);

/* ─── Smoke particles ────────────────────────────────────────────────────── */
// Rocket moves up-right at ~38° → smoke trails down-left
const smokeData = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    delay: i * 0.12,
    offsetX: ((i % 5) - 2) * 5,
    size: 14 + (i % 4) * 8,
    driftX: -(18 + (i % 3) * 10),   // leftward (opposite x travel)
    driftY: 55 + (i % 4) * 18,      // downward (opposite y travel)
}));

const SmokeTrail = () => (
    <>
        {smokeData.map((p) => (
            <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: p.size,
                    height: p.size,
                    bottom: 55,
                    left: `calc(50% + ${p.offsetX}px)`,
                    translateX: '-50%',
                    background: 'radial-gradient(circle, rgba(210,220,240,0.5) 0%, rgba(180,195,225,0.15) 60%, transparent 100%)',
                    filter: 'blur(7px)',
                }}
                animate={{
                    y: [0, p.driftY],
                    x: [0, p.driftX],
                    opacity: [0.6, 0.25, 0],
                    scale: [0.5, 1.8, 3.0],
                }}
                transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'easeOut',
                }}
            />
        ))}
    </>
);

/* ─── Floating Terminal ──────────────────────────────────────────────────── */
const terminalLines = [
    { text: '$ git clone hubrocket/projeto-cliente', color: 'text-text-primary/50' },
    { text: '✓ Repositório clonado com sucesso', color: 'text-green-400' },
    { text: '$ npm run dev', color: 'text-text-primary/50' },
    { text: '▲ Next.js 15 — Pronto em 847ms', color: 'text-accent-cta' },
    { text: '🚀 Deploy em produção...', color: 'text-accent-primary' },
    { text: '✓ Online! Conversão +47%', color: 'text-green-400' },
];

const FloatingTerminal = () => (
    <motion.div
        className="absolute top-[22%] right-[3%] md:right-[6%] hidden lg:block z-10"
        initial={{ opacity: 0, x: 60, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 1, delay: 1.8, ease: 'easeOut' }}
    >
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass border border-white/10 rounded-2xl p-4 w-72 font-mono text-xs shadow-2xl shadow-black/40"
        >
            <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span className="text-text-primary/30 ml-2 text-[10px] tracking-wider">terminal — zsh</span>
            </div>
            <div className="space-y-1.5">
                {terminalLines.map((line, i) => (
                    <motion.p
                        key={i}
                        className={`${line.color} leading-relaxed`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.2 + i * 0.45, ease: 'easeOut' }}
                    >
                        {line.text}
                    </motion.p>
                ))}
                <motion.span
                    className="inline-block w-2 h-3 bg-accent-cta/80"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    initial={{ opacity: 0 }}
                />
            </div>
        </motion.div>
    </motion.div>
);

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const Hero = () => {
    const handleWhatsApp = () => {
        window.open('https://wa.me/5566992353826?text=Olá!%20Gostaria%20de%20discutir%20um%20projeto%20de%20software.', '_blank');
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 bg-[#030712]">
            {/* Stars */}
            <div className="absolute inset-0 z-0">
                <StarField />
            </div>

            {/* ── Earth (background) ── */}
            <div className="absolute bottom-[-18%] right-[-12%] md:bottom-[-22%] md:right-[-8%] z-0 opacity-30 pointer-events-none select-none">
                <Earth />
            </div>

            {/* Nebula glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/7 blur-[160px] rounded-full z-0 pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-accent-cta/7 blur-[140px] rounded-full z-0 pointer-events-none" />

            {/* Mid layer */}
            <div className="absolute inset-0 pointer-events-none z-10">

                {/* Rocket — diagonal bottom-left → top-right */}
                <motion.div
                    className="absolute"
                    style={{ bottom: '-10%', left: '4%' }}
                    initial={{ x: 0, y: 0, opacity: 0, rotate: 52 }}
                    animate={{
                        x: [0, 900],
                        y: [0, -700],
                        opacity: [0, 1, 1, 1, 0],
                        rotate: 52,
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: [0.1, 0.4, 0.8, 1],
                        repeatDelay: 3,
                    }}
                >
                    <div className="relative">
                        <RocketSVG />
                        <SmokeTrail />
                    </div>
                </motion.div>

                {/* Floating Terminal */}
                <FloatingTerminal />
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.2, 0.8, 0.3, 1] }}
                className="z-20 max-w-5xl text-center relative"
            >

                <h1 className="text-[2.1rem] sm:text-5xl md:text-7xl lg:text-[100px] font-black mb-6 sm:mb-8 leading-[0.92] tracking-tighter font-montserrat uppercase">
                    Construímos{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-[#A855F7] to-accent-cta drop-shadow-sm">
                        Software
                    </span>
                    <br />
                    <span className="text-white/95">de Elite</span>
                </h1>

                <motion.p
                    className="text-base sm:text-xl md:text-2xl text-text-primary/70 mb-10 sm:mb-14 max-w-3xl mx-auto leading-snug font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Sistemas web sob medida, automação inteligente e infraestrutura escalável
                    para o seu negócio decolar.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <button
                        onClick={handleWhatsApp}
                        className="bg-accent-primary hover:bg-accent-primary/90 text-white px-7 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-full font-black text-base sm:text-xl md:text-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 sm:gap-4 group shadow-2xl shadow-accent-primary/40 uppercase tracking-tight"
                    >
                        Iniciar Projeto
                        <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button className="px-7 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-full font-bold text-base sm:text-xl md:text-2xl border-2 border-white/20 hover:bg-white/5 transition-all text-white/90 hover:text-white backdrop-blur-sm uppercase tracking-tight hover:border-white/40">
                        Ver Portfólio
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
