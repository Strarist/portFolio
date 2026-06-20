'use client';

import { useEffect, useState } from 'react';

const ROLES = [
  'AI Application Engineer',
  'Building AI-Powered Products',
  'AWS Certified Cloud Practitioner',
  'Production-First Engineering',
  'Problem Solver & Builder',
];

type Phase = 'typing' | 'pause' | 'deleting';

export function RoleTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 1800);
      return () => clearTimeout(timeout);
    }

    const delay = phase === 'deleting' ? 26 : 48;
    timeout = setTimeout(() => {
      if (phase === 'typing') {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setPhase('pause');
        }
      } else if (text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        setPhase('typing');
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, phase, roleIndex]);

  return (
    <span aria-live="polite" aria-atomic="true" className="inline-block max-w-full">
      <span className="break-words">{text}</span>
      <span
        className="inline-block w-[2px] h-[0.85em] ml-1 bg-[#e8390d]/80 animate-pulse align-middle rounded-full"
        aria-hidden="true"
      />
    </span>
  );
}
