'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Resume.module.css';

// Import react-pdf styles for annotations
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeScrollProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function ResumeScroll({ isOpen, onToggle }: ResumeScrollProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(800);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const updateWidth = () => {
            if (window.innerWidth < 640) {
                setPageWidth(window.innerWidth - 80);
            } else if (window.innerWidth < 1024) {
                setPageWidth(700);
            } else {
                setPageWidth(900);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setError('');
    }

    function onDocumentLoadError(error: Error) {
        console.error('Error loading PDF:', error);
        setError('Failed to load PDF. Please try again later.');
    }

    return (
        <section className={styles.resumeSection}>
            <div className={styles.container}>
                {/* Resume Header */}
                <div 
                    onClick={onToggle}
                    className={styles.header}
                >
                    <div className={styles.headerContent}>
                        <div className={styles.headerTitle}>
                            <div className={styles.logoIcon}>S</div>
                            <h2 className={styles.title}>
                                My Resume
                            </h2>
                        </div>
                        <p className={styles.subtitle}>Click to {isOpen ? 'hide' : 'view'}</p>
                    </div>
                </div>

                {/* Resume Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className={styles.contentWrapper}
                        >
                            <div className={styles.pdfContainer}>
                                <div className={styles.pdfContent}>
                                    {error ? (
                                        <div className={styles.errorMessage}>
                                            <p className={styles.errorText}>{error}</p>
                                            <p className={styles.errorSubtext}>Please check the console for details</p>
                                        </div>
                                    ) : (
                                        <Document
                                            file="/resume.pdf"
                                            onLoadSuccess={onDocumentLoadSuccess}
                                            onLoadError={onDocumentLoadError}
                                            className={styles.pdfDocument}
                                            loading={
                                                <div className={styles.loadingMessage}>
                                                    <p>Loading PDF...</p>
                                                </div>
                                            }
                                        >
                                            {Array.from(new Array(numPages), (el, index) => (
                                                <div
                                                    key={`page_${index + 1}`}
                                                    className={styles.pageWrapper}
                                                >
                                                    <Page
                                                        pageNumber={index + 1}
                                                        width={pageWidth}
                                                        renderTextLayer={false}
                                                        renderAnnotationLayer={true}
                                                    />
                                                </div>
                                            ))}
                                        </Document>
                                    )}
                                </div>

                                {/* Download Button */}
                                <div className={styles.downloadButton}>
                                    <a
                                        href="/resume.pdf"
                                        download
                                        className={styles.downloadLink}
                                    >
                                        <svg className={styles.downloadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download Resume
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
