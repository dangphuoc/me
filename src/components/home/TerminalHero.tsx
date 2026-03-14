'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

function useTypingEffect(lines: string[], speed: number = 40) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const tick = useCallback(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      setDisplayedLines((prev) => {
        const updated = [...prev];
        updated[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
        return updated;
      });
      setCurrentCharIndex((c) => c + 1);
    } else {
      setCurrentLineIndex((l) => l + 1);
      setCurrentCharIndex(0);
      setDisplayedLines((prev) => [...prev, '']);
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  useEffect(() => {
    if (isComplete) return;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, speed, isComplete]);

  return { displayedLines: displayedLines.slice(0, lines.length), isComplete };
}

export default function TerminalHero() {
  const t = useTranslations('home');

  const lines = [
    `$ whoami`,
    t('terminalName'),
    ``,
    `$ cat about.txt`,
    t('terminalIntro'),
    ``,
    `$ ls ./latest-posts`,
    t('terminalLatest'),
  ];

  const { displayedLines, isComplete } = useTypingEffect(lines, 30);

  return (
    <section className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-sm sm:text-base">
        {/* Top border */}
        <div className="text-th-accent-soft select-none">
          ┌─── <span className="text-th-accent">phuoc@dev</span>:<span className="text-th-dim">~</span> ───────────────────────────────────────┐
        </div>

        {/* Content */}
        <div className="border-x border-th-accent-soft/30 px-5 sm:px-8 py-6 min-h-[220px] bg-th-card">
          {displayedLines.map((line, i) => (
            <div key={i} className="leading-loose">
              {line.startsWith('$') ? (
                <span>
                  <span className="text-th-prompt">$</span>{' '}
                  <span className="text-th-accent">{line.slice(2)}</span>
                </span>
              ) : line === '' ? (
                <div className="h-2" />
              ) : (
                <span className="text-th-secondary">{line}</span>
              )}
            </div>
          ))}
          <span
            className={`inline-block w-2.5 h-4 bg-th-accent align-middle mt-1 ${isComplete ? 'animate-cursor-blink' : ''}`}
          />
        </div>

        {/* Bottom border */}
        <div className="text-th-accent-soft select-none">
          └──────────────────────────────────────────────────────┘
        </div>
      </div>
    </section>
  );
}
