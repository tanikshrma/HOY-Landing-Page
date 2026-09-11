import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Fades content up the first time it enters the viewport.
 *
 * The animation itself lives in CSS (`[data-reveal]`), which means it respects
 * prefers-reduced-motion without any JS branching, and content is visible even
 * if this component never mounts.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support: show it rather than leaving it invisible forever.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Anything already at or above the fold on mount (a deep link, a restored
    // scroll position) should just be visible — never wait for a scroll that
    // may not come.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // The second test catches an element the user scrolled clean past
        // between two observer frames, which would otherwise stay invisible.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={visible ? 'true' : 'false'}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
