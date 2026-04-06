import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import CustomDevBanner from './components/CustomDevBanner';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import Leadership from './components/Leadership';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-primary/30">
      <Navbar />

      <main>
        <Hero />

        {/* Section Wrappers for Scroll Reveal */}
        <section id="services">
          <Services />
        </section>

        <section id="leadership">
          <Leadership />
        </section>

        <section id="pricing">
          <Pricing />
        </section>

        <section id="custom-dev">
          <CustomDevBanner />
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

export default App;
