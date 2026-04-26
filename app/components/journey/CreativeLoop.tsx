import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function CreativeLoop() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });
  const pathLength = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-1.5 z-0 hidden h-screen w-5 sm:left-2 sm:w-6 md:block"
      viewBox="0 0 24 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d="M 12 0
           C 4 100, 20 200, 12 300
           C 4 400, 20 500, 12 600
           C 4 700, 20 760, 12 800"
        stroke="#0c0f14"
        strokeOpacity="0.3"
        strokeWidth="1.25"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </svg>
  );
}
