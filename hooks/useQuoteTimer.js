'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { quotes, getRandomQuote } from '@/data/quotes';

const QUOTE_INTERVAL = 5 * 60 * 1000; // 5 minutes

/**
 * useQuoteTimer — Shows a random motivational quote every 5 minutes
 */
export function useQuoteTimer() {
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(-1);
  const [currentQuote, setCurrentQuote] = useState(null);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const { quote, index } = getRandomQuote(currentQuoteIndex);
      setCurrentQuote(quote);
      setCurrentQuoteIndex(index);
      setShowQuote(true);
    }, QUOTE_INTERVAL);
  }, [currentQuoteIndex]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const dismissQuote = useCallback(() => {
    setShowQuote(false);
    // Reset timer when user manually closes
    startTimer();
  }, [startTimer]);

  const nextQuote = useCallback(() => {
    const { quote, index } = getRandomQuote(currentQuoteIndex);
    setCurrentQuote(quote);
    setCurrentQuoteIndex(index);
  }, [currentQuoteIndex]);

  return { showQuote, currentQuote, dismissQuote, nextQuote };
}
