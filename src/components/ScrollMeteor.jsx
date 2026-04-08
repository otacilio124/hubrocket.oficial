import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

/* ─── Impact particles (fixed data so it's deterministic) ─────────────────────── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
    const angle = (360 / 14) * i + (i % 2 === 0 ? 8 : -5);
    return {
        id: i,
        angle,
        distance: 30 + (i % 3) * 20,
        size: 2 + (i % 4),
        duration: 0.3 + (i % 5) * 0.06,
        color: i % 3 === 0 ? '#A78BFA' : i % 3 === 1 ? '#06B6D4' : '#ffffff',
    };
});

/* ─── Moon SVG ────────────────────────────────────────────────────────────────── */
const Moon = ({ collided, impactKey }) => (
    <div className="fixed right-[8vw] bottom-[12vh] z-[4] pointer-events-none select-none">
        {/* Outer glow halo */}
        <div
            className="absolute -inset-4 rounded-full -z-10"
            style={{
                boxShadow: '0 0 50px 16px rgba(200,215,255,0.06), 0 0 100px 32px rgba(167,139,250,0.04)',
            }}
        />

        {/* Moon body — shakes on collision */}
        <motion.div
            animate={
                collided
                    ? { x: [0, -10, 8, -6, 3, -1, 0], y: [0, 5, -8, 4, -2, 1, 0] }
                    : { x: 0, y: 0 }
            }
            transition={{ duration: 0.55, ease: 'easeOut' }}
        >
            <svg
                width="90"
                height="90"
                viewBox="0 0 90 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient id="moonSurf" cx="33%" cy="26%" r="68%" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(228,233,248,0.95)" />
                        <stop offset="48%" stopColor="rgba(188,198,218,0.78)" />
                        <stop offset="100%" stopColor="rgba(118,130,155,0.58)" />
                    </radialGradient>
                    <radialGradient id="moonEdge" cx="50%" cy="50%" r="50%">
                        <stop offset="62%" stopColor="transparent" />
                        <stop offset="100%" stopColor="rgba(30,20,60,0.55)" />
                    </radialGradient>
                    <filter id="moonGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Base dark disc */}
                <circle cx="45" cy="45" r="43" fill="#0c0e18" />
                {/* Surface texture */}
                <circle cx="45" cy="45" r="43" fill="url(#moonSurf)" />
                {/* Dark edge limb */}
                <circle cx="45" cy="45" r="43" fill="url(#moonEdge)" />
                {/* Rim light */}
                <circle cx="45" cy="45" r="43" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />

                {/* Craters */}
                <circle cx="28" cy="32" r="7.5" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
                <circle cx="58" cy="26" r="5" fill="rgba(0,0,0,0.24)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <circle cx="40" cy="62" r="6" fill="rgba(0,0,0,0.26)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <circle cx="68" cy="56" r="3.5" fill="rgba(0,0,0,0.2)" />
                <circle cx="20" cy="57" r="3" fill="rgba(0,0,0,0.17)" />
                <circle cx="50" cy="42" r="2" fill="rgba(0,0,0,0.12)" />

                {/* Impact crater — appears on collision */}
                <AnimatePresence>
                    {collided && (
                        <motion.g key={`crater-${impactKey}`}>
                            <motion.circle
                                cx="16"
                                cy="18"
                                r="10"
                                fill="rgba(0,0,0,0.5)"
                                stroke="rgba(167,139,250,0.75)"
                                strokeWidth="1.4"
                                filter="url(#moonGlow)"
                                initial={{ r: 0, opacity: 0 }}
                                animate={{ r: 10, opacity: 1 }}
                                transition={{ duration: 0.28, delay: 0.1, ease: 'easeOut' }}
                            />
                            <motion.circle
                                cx="16"
                                cy="18"
                                r="5"
                                fill="rgba(167,139,250,0.25)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.22, delay: 0.22 }}
                            />
                            {/* Ejecta rays */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                                <motion.line
                                    key={i}
                                    x1="16"
                                    y1="18"
                                    x2={16 + Math.cos((deg * Math.PI) / 180) * 18}
                                    y2={18 + Math.sin((deg * Math.PI) / 180) * 18}
                                    stroke="rgba(167,139,250,0.35)"
                                    strokeWidth="0.8"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
                                    transition={{ duration: 0.4, delay: 0.1 + i * 0.02 }}
                                />
                            ))}
                        </motion.g>
                    )}
                </AnimatePresence>
            </svg>
        </motion.div>

        {/* Impact burst particles */}
        <AnimatePresence>
            {collided && (
                <div
                    key={`burst-${impactKey}`}
                    className="absolute pointer-events-none"
                    style={{ top: '50%', left: '50%' }}
                >
                    {PARTICLES.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                background: p.color,
                                boxShadow: `0 0 6px 2px ${p.color}99`,
                                translateX: '-50%',
                                translateY: '-50%',
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{
                                x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                                y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                                opacity: 0,
                                scale: 0.1,
                            }}
                            transition={{ duration: p.duration, ease: [0.2, 0, 1, 1] }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>

        {/* Flash on impact */}
        <AnimatePresence>
            {collided && (
                <motion.div
                    key={`flash-${impactKey}`}
                    className="absolute -inset-6 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 70%)' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.8, 2.5] }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                />
            )}
        </AnimatePresence>
    </div>
);

/* ─── ScrollMeteor ────────────────────────────────────────────────────────────── */
const ScrollMeteor = () => {
    const { scrollYProgress } = useScroll();
    const [collided, setCollided] = useState(false);
    const collidedRef = useRef(false);
    const impactKeyRef = useRef(0);

    // Meteor path: upper-left → lower-right (toward the moon fixed at right-bottom)
    const meteorX = useTransform(scrollYProgress, [0, 0.88], ['4vw', '84vw']);
    const meteorY = useTransform(scrollYProgress, [0, 0.88], ['10vh', '76vh']);

    // Fade in at start of scroll, fade out just before collision
    const meteorOpacity = useTransform(
        scrollYProgress,
        [0, 0.06, 0.82, 0.88],
        [0,   1,    1,   0]
    );

    // Tail length grows as meteor accelerates (gets longer mid-journey)
    const tailWidth = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.88], [40, 120, 160, 180]);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (v >= 0.88 && !collidedRef.current) {
            collidedRef.current = true;
            impactKeyRef.current += 1;
            setCollided(true);
        }
        if (v < 0.80 && collidedRef.current) {
            collidedRef.current = false;
            setCollided(false);
        }
    });

    return (
        <>
            {/* Moon — always visible in lower-right corner */}
            <Moon collided={collided} impactKey={impactKeyRef.current} />

            {/* Meteor — position driven by scroll */}
            <motion.div
                className="fixed z-[5] pointer-events-none"
                style={{ x: meteorX, y: meteorY, opacity: meteorOpacity }}
            >
                {/*
                  Tail: extends backward (upper-left) from the head.
                  With transformOrigin: 'left center' and rotate(135deg):
                    - left end = pivot = HEAD position (0,0)
                    - right end moves to upper-left (the trailing tail)
                  Gradient: bright at left (head) → transparent at right (tail tip)
                */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: 2,
                        width: tailWidth,
                        transformOrigin: 'left center',
                        transform: 'translateY(-50%) rotate(135deg)',
                        background:
                            'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(167,139,250,0.65) 50%, transparent 100%)',
                        borderRadius: 999,
                        filter: 'blur(0.4px)',
                    }}
                />

                {/* Head: glowing orb */}
                <div
                    style={{
                        position: 'absolute',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, #fff 20%, rgba(255,210,90,0.9) 55%, rgba(167,139,250,0.35) 100%)',
                        boxShadow:
                            '0 0 14px 5px rgba(255,255,255,0.85), 0 0 34px 14px rgba(167,139,250,0.5)',
                        transform: 'translate(-7px, -7px)',
                    }}
                />
            </motion.div>
        </>
    );
};

export default ScrollMeteor;
