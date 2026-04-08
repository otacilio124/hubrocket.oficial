import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import OrcamentoBanner from './components/OrcamentoBanner';
import CustomDevBanner from './components/CustomDevBanner';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import Leadership from './components/Leadership';
import LoadingScreen from './components/LoadingScreen';
import ScrollMeteor from './components/ScrollMeteor';

/* ─── App ────────────────────────────────────────────────────────────────────── */
function App() {
    const [isLoading, setIsLoading] = useState(true);
    const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-primary/30">
            <AnimatePresence>
                {isLoading && (
                    <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Meteoro scroll-driven + lua */}
                <ScrollMeteor />

                <Navbar />

                <main>
                    <Hero />

                    <section id="services">
                        <Services />
                    </section>

                    <section id="leadership">
                        <Leadership />
                    </section>

                    <OrcamentoBanner />

                    <section id="custom-dev">
                        <CustomDevBanner />
                    </section>
                </main>

                <Footer />
                <WhatsAppFAB />
            </motion.div>
        </div>
    );
}

export default App;
