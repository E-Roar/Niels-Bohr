import { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from '@/lib/translations';

interface TTSOptions {
    language: Language;
    autoPlay?: boolean;
}

export const useTextToSpeech = ({ language }: TTSOptions) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [supported, setSupported] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const synth = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setSupported(true);
            synth.current = window.speechSynthesis;

            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);
            };

            loadVoices();

            // Chrome requires this event to load voices
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        }
    }, []);

    const getVoice = useCallback(() => {
        if (!voices.length) return null;

        // Filter for the correct language code
        const langCode = language === 'fr' ? 'fr' : 'ar';
        const langVoices = voices.filter(v => v.lang.startsWith(langCode));

        if (!langVoices.length) return null; // No voice for this language

        // Priority 1: "Google Français" (very good female voice usually)
        const googleFr = langVoices.find(v => v.name === 'Google français');
        if (googleFr) return googleFr;

        // Priority 2: Voices with "Female" or specific female names in label
        const femaleVoice = langVoices.find(v =>
            v.name.includes('Female') ||
            v.name.includes('Amelie') ||
            v.name.includes('Hortense') ||
            v.name.includes('Julie')
        );
        if (femaleVoice) return femaleVoice;

        // Priority 3: Any voice for the language
        return langVoices[0];
    }, [voices, language]);

    const speak = useCallback((text: string) => {
        if (!synth.current || isMuted || !supported) return;

        // Cancel any current speech
        synth.current.cancel();

        // Clean text (remove emojis, excessive whitespace)
        const cleanText = text
            .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // Emoticons
            .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voice = getVoice();

        // CRITICAL: If no French/Arabic voice is found, DO NOT speak (avoid English fallback)
        if (!voice) {
            console.warn('TTS: No suitable voice found for language:', language);
            return;
        }

        utterance.voice = voice;
        utterance.lang = voice.lang;
        utterance.pitch = 1;
        utterance.rate = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            // Silently handle 'interrupted' errors which occur during cancel()
            if ((e as any).error !== 'interrupted') {
                console.error('TTS Error:', e);
            }
            setIsSpeaking(false);
        };

        // Small delay to ensure any previous cancel() has fully propagated
        setTimeout(() => {
            if (!isMuted && synth.current) {
                synth.current.speak(utterance);
            }
        }, 50);
    }, [supported, isMuted, getVoice, language]);

    const cancel = useCallback(() => {
        if (synth.current) {
            synth.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const newState = !prev;
            if (newState && synth.current) {
                synth.current.cancel();
                setIsSpeaking(false);
            }
            return newState;
        });
    }, []);

    return {
        speak,
        cancel,
        toggleMute,
        isSpeaking,
        isMuted,
        supported
    };
};
