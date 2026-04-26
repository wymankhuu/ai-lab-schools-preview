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
      className="pointer-events-none fixed inset-y-0 left-3 z-0 hidden h-screen w-12 sm:left-5 md:block"
      viewBox="0 0 40 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d="M 20 0
           C 5 100, 35 200, 20 300
           C 5 400, 35 500, 20 600
           C 5 700, 35 760, 20 800"
        stroke="#0c0f14"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </svg>
  );
}
