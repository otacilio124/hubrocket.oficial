import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Rocket.png';

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const MESSAGES = [
    "Calibrando motores principais...",
    "Verificando sistemas de navegação...",
    "Pressurização dos tanques de combustível...",
    "Preparando para o lançamento...",
    "3... 2... 1... Ignição! 🚀",
];

const STARS = Array.from({ length: 160 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 3 + 1.5,
    delay: Math.random() * 5,
    purple: Math.random() > 0.72,
}));

const SMOKE = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    delay: i * 0.14,
    xOff: ((i % 5) - 2) * 6,
    size: 10 + (i % 4) * 6,
}));

/* ─── Rocket SVG ─────────────────────────────────────────────────────────────── */
const LaunchRocket = ({ launching }) => (
    <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 80 180" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-16 sm:w-20 h-auto relative z-10">
            <defs>
                <linearGradient id="lsFlameOuter" x1="40" y1="130" x2="40" y2="178" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF9500" />
                    <stop offset="50%" stopColor="#FF4500" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FF1500" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Body */}
            <path d="M40 5 C25 5 17 28 17 50 L17 110 C17 118 28 123 40 123 C52 123 63 118 63 110 L63 50 C63 28 55 5 40 5Z"
                fill="white" fillOpacity="0.96" />
            {/* Accent band */}
            <path d="M17 80 L63 80 L63 92 L17 92 Z" fill="#7C3AED" fillOpacity="0.3" />
            {/* Window */}
            <circle cx="40" cy="58" r="12" fill="#030712" />
            <circle cx="40" cy="58" r="10" fill="#0EA5E9" fillOpacity="0.15" stroke="#06B6D4" strokeWidth="1.2" />
            <ellipse cx="35" cy="53" rx="3" ry="4.5" fill="white" fillOpacity="0.22"
                transform="rotate(-20 35 53)" />
            {/* Fins */}
            <path d="M17 92 L5 128 L17 113 Z" fill="white" fillOpacity="0.82" />
            <path d="M63 92 L75 128 L63 113 Z" fill="white" fillOpacity="0.82" />
            {/* Engine bell */}
            <path d="M28 123 L23 136 L57 136 L52 123 Z" fill="white" fillOpacity="0.5" />
            {/* Outer flame */}
            <motion.path
                fill="url(#lsFlameOuter)"
                animate={{
                    d: [
                        'M30 136 Q24 152 28 165 Q34 176 40 173 Q46 176 52 165 Q56 152 50 136 Z',
                        'M29 136 Q21 156 27 170 Q34 181 40 178 Q46 181 53 170 Q59 155 51 136 Z',
                        'M30 136 Q24 152 28 165 Q34 176 40 173 Q46 176 52 165 Q56 152 50 136 Z',
                    ],
                }}
                transition={{ duration: 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Inner flame */}
            <motion.path
                fill="white"
                animate={{
                    d: [
                        'M35 136 Q32 146 34 155 Q37 163 40 160 Q43 163 46 155 Q48 146 45 136 Z',
                        'M35 136 Q31 148 34 158 Q37 167 40 164 Q43 167 46 158 Q49 148 45 136 Z',
                        'M35 136 Q32 146 34 155 Q37 163 40 160 Q43 163 46 155 Q48 146 45 136 Z',
                    ],
                    opacity: [0.95, 0.8, 0.95],
                }}
                transition={{ duration: 0.17, repeat: Infinity, ease: 'easeInOut' }}
            />
        </svg>

        {/* Smoke/exhaust particles */}
        <AnimatePresence>
            {!launching && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
                    {SMOKE.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                                bottom: -10,
                                left: `calc(50% + ${p.xOff}px)`,
                                translateX: '-50%',
                                width: p.size,
                                height: p.size,
                                background:
                                    'radial-gradient(circle, rgba(210,220,240,0.55) 0%, rgba(180,195,225,0.15) 60%, transparent 100%)',
                                filter: 'blur(6px)',
                            }}
                            animate={{ y: [0, 70], x: [0, p.xOff * 1.5], opacity: [0.7, 0.3, 0], scale: [0.5, 1.5, 2.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
                            exit={{ opacity: 0 }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    </div>
);

/* ─── LoadingScreen ──────────────────────────────────────────────────────────── */
const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [launching, setLaunching] = useState(false);
    const [visible, setVisible] = useState(true);
    const completedRef = useRef(false);

    useEffect(() => {
        const TOTAL_MS = 2800;
        const INTERVAL = 45;
        const INCREMENT = 100 / (TOTAL_MS / INTERVAL);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + INCREMENT;
                if (next >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return next;
            });
        }, INTERVAL);

        // Cycle messages
        const msgDelay = TOTAL_MS / MESSAGES.length;
        const msgTimers = MESSAGES.slice(1).map((_, i) =>
            setTimeout(() => setMsgIdx(i + 1), msgDelay * (i + 1))
        );

        // Trigger launch
        const launchTimer = setTimeout(() => {
            setLaunching(true);
            setTimeout(() => {
                setVisible(false);
                setTimeout(() => {
                    if (!completedRef.current) {
                        completedRef.current = true;
                        onComplete();
                    }
                }, 700);
            }, 900);
        }, TOTAL_MS + 100);

        return () => {
            clearInterval(progressTimer);
            msgTimers.forEach(clearTimeout);
            clearTimeout(launchTimer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loading-screen"
                    className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden select-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* ── Stars ── */}
                    <div className="absolute inset-0 pointer-events-none">
                        {STARS.map((s) => (
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
                                        ? '0 0 6px 2px rgba(167,139,250,0.7)'
                                        : '0 0 4px 1px rgba(255,255,255,0.6)',
                                }}
                                animate={{ opacity: [0.15, 1, 0.15] }}
                                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                            />
                        ))}
                    </div>

                    {/* ── Nebula glows ── */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/8 blur-[130px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-[#06B6D4]/6 blur-[110px] rounded-full pointer-events-none" />

                    {/* ── Grid lines (subtle space grid) ── */}
                    <div
                        className="absolute inset-0 opacity-[0.025] pointer-events-none"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* ── Logo ── */}
                    <motion.div
                        className="flex flex-col items-center mb-12 sm:mb-16"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.img
                            src={logo}
                            alt="HubRocket"
                            className="w-36 sm:w-44 h-auto object-contain"
                            animate={{
                                filter: [
                                    'drop-shadow(0 0 0px rgba(124,58,237,0))',
                                    'drop-shadow(0 0 16px rgba(124,58,237,0.8))',
                                    'drop-shadow(0 0 0px rgba(124,58,237,0))',
                                ],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>

                    {/* ── Rocket ── */}
                    <motion.div
                        animate={
                            launching
                                ? { y: [0, -20, -900], scale: [1, 1.1, 0.5], opacity: [1, 1, 0] }
                                : { y: [0, -10, 0] }
                        }
                        transition={
                            launching
                                ? { duration: 0.85, ease: [0.4, 0, 1, 1] }
                                : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                        }
                        className="relative mb-10 sm:mb-12"
                    >
                        <LaunchRocket launching={launching} />
                    </motion.div>

                    {/* ── Progress bar ── */}
                    <motion.div
                        className="w-56 sm:w-72 md:w-80 mb-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="w-full h-[3px] bg-white/8 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#06B6D4]"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ ease: 'linear', duration: 0.05 }}
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Sistema</span>
                            <span className="text-[10px] font-mono text-white/40 tabular-nums">
                                {Math.floor(Math.min(progress, 100))}%
                            </span>
                        </div>
                    </motion.div>

                    {/* ── Cycling message ── */}
                    <div className="h-7 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={msgIdx}
                                className="text-[11px] sm:text-sm font-mono text-white/45 tracking-wider text-center px-4"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                {MESSAGES[msgIdx]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* ── Orbit rings decoration ── */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                        <motion.div
                            className="w-32 h-32 rounded-full border border-[#7C3AED]"
                            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
