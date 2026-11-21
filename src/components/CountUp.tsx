import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
};

export default function CountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 200,
  prefix = "",
  suffix = "",
  separator = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Trigger immediately if already visible in viewport
    const rect = element.getBoundingClientRect();
    const inView =
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 50 &&
      rect.bottom >= -50;

    if (inView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let frameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth deceleration: 1 - (1 - progress)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);

      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible, start, end, duration, delay]);

  const formatted = separator
    ? count.toLocaleString("en-IN")
    : count.toString();

  return (
    <span ref={elementRef} className={`count-up-number ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
