/**
 * PageLoader.tsx — Loader cinematográfico de primera visita
 * 
 * Contexto:
 * Replica el comportamiento de LABANDA: aparece primero, tapa todo,
 * espera carga de imágenes, fade-out suave y habilita contenido.
 * 
 * Notas de mantenimiento:
 * - Control global mediante window.pageLoaderActive
 * - Emite evento 'pageLoaderComplete' al terminar
 * - Timing: 1.3s espera + 0.8s fade = 2.1s total
 * 
 * @author Boost A Project Team
 * @since v2.0.0
 */

'use client';
import { useState, useEffect } from 'react';

if (typeof window !== 'undefined') {
    (window as any).pageLoaderActive = true;
}

export default function PageLoader() {
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';

        const waitForImages = async () => {
            const images = Array.from(document.images);
            if (images.length === 0) return;
            await Promise.allSettled(
                images.map(img => new Promise<void>((resolve) => {
                    if (img.complete) return resolve();
                    img.addEventListener('load', () => resolve(), { once: true });
                    img.addEventListener('error', () => resolve(), { once: true });
                }))
            );
        };

        waitForImages().then(() => {
            setTimeout(() => {
                setVisible(false);
                document.body.style.overflow = '';
                if (typeof window !== 'undefined') {
                    (window as any).pageLoaderActive = false;
                    window.dispatchEvent(new Event('pageLoaderComplete'));
                }
            }, 1300);
        });

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!mounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#1A1341] to-[#6290C3] transition-opacity duration-700 ${
                visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
                transition: 'opacity 0.8s ease'
            }}
        >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 sm:border-[6px] border-white border-t-transparent rounded-full animate-spin drop-shadow-lg" />
        </div>
    );
}