'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Certificates.module.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CertificateCardProps {
    fileName: string;
    title: string;
    index: number;
    onCardClick: () => void;
}

function CertificateCard({ fileName, title, index, onCardClick }: CertificateCardProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(800);
    const [error, setError] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            if (window.innerWidth < 640) {
                setPageWidth(window.innerWidth - 100);
            } else if (window.innerWidth < 1024) {
                setPageWidth(600);
            } else {
                setPageWidth(800);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setError('');
    }

    function onDocumentLoadError(error: Error) {
        console.error('Error loading PDF:', error);
        setError('Failed to load certificate.');
    }

    const gradients = [
        'linear-gradient(135deg, #7C3AED, #EC4899)',
        'linear-gradient(135deg, #EC4899, #F59E0B)',
        'linear-gradient(135deg, #F59E0B, #7C3AED)',
    ];

    return (
        <>
            <div className={styles.certificateCard}>
                {/* Certificate Header */}
                <div 
                    className={styles.cardHeader}
                    style={{ background: gradients[index % 3] }}
                >
                    <div className={styles.cardHeaderContent}>
                        <div className={styles.cardTitle}>
                            <div className={styles.cardIcon}>C{index + 1}</div>
                            <h3 className={styles.cardTitleText}>{title}</h3>
                        </div>
                        <div className={styles.cardActions}>
                            <button
                                onClick={() => {
                                    onCardClick();
                                    setIsOpen(true);
                                }}
                                className={styles.viewButton}
                            >
                                View
                            </button>
                            <a
                                href={`/${fileName}`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className={styles.downloadButton}
                            >
                                <svg className={styles.downloadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.modalOverlay}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className={styles.closeButton}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className={styles.closeIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Header */}
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>{title}</h3>
                            </div>

                            {/* PDF Content */}
                            <div className={styles.modalBody}>
                                {error ? (
                                    <div className={styles.errorMessage}>
                                        <p className={styles.errorText}>{error}</p>
                                    </div>
                                ) : (
                                    <Document
                                        file={`/${fileName}`}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        onLoadError={onDocumentLoadError}
                                        className={styles.pdfDocument}
                                        loading={
                                            <div className={styles.loadingMessage}>
                                                <p>Loading Certificate...</p>
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
                                                    renderAnnotationLayer={false}
                                                />
                                            </div>
                                        ))}
                                    </Document>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function Certificates({ openSection, onToggle }: { openSection: 'about' | 'resume' | 'certificates' | null; onToggle: (section: 'certificates') => void }) {
    const certificates = [
        { fileName: 'certificate_1.pdf', title: 'Data Analytics Job Simulation (Forage – Deloitte)' },
        { fileName: 'certificate_2.pdf', title: 'QUEST Internship (EduAce Services)' },
        { fileName: 'certificate_3.pdf', title: 'DeepNeural Technologies – Management Internship' },
    ];

    return (
        <section className={styles.certificatesSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.logoIcon}>C</div>
                    <h2 className={styles.sectionTitle}>My Certificates</h2>
                </div>

                <div className={styles.certificatesGrid}>
                    {certificates.map((cert, index) => (
                        <CertificateCard
                            key={cert.fileName}
                            fileName={cert.fileName}
                            title={cert.title}
                            index={index}
                            onCardClick={() => onToggle('certificates')}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
