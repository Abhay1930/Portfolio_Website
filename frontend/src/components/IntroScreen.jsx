import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components.css';

const IntroScreen = () => {
    const [step, setStep] = useState(0);
    const name = "ABHAY SINGH";

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 800));
            setStep(1);
            await new Promise(r => setTimeout(r, 1800));
            setStep(2);
        };
        sequence();
    }, []);

    const containerVariants = {
        exit: {
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2
            }
        }
    };

    const letterVariants = {
        initial: { y: "100%" },
        animate: {
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1]
            }
        }
    };

    return (
        <motion.div
            className="intro-container"
            variants={containerVariants}
            initial="initial"
            exit="exit"
        >
            <div className="intro-bg-grid" />

            <div className="intro-content-wrapper">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="intro-sub-label"
                        >
                            SYSTEM_INITIALIZING...
                        </motion.div>
                    )}

                    {step >= 1 && (
                        <div className="flex flex-col items-center gap-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="intro-sub-label"
                            >
                                {step === 1 ? "PORTFOLIO_V1.0" : "READY_TO_EXPLORE"}
                            </motion.div>

                            <div className="intro-name-wrapper" style={{ height: '2px' }}>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="intro-overlay-line"
                                    style={{ position: 'relative', bottom: 0 }}
                                />
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default IntroScreen;
