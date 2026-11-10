import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = true, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch {
      return null;
    }
  }, [math, block]);

  if (!html) {
    return (
      <span className={`font-mono text-emerald-300 font-semibold ${className}`}>
        {math}
      </span>
    );
  }

  return (
    <span
      className={`inline-block font-sans ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
