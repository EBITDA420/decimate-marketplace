
import { cn } from "@/lib/utils";

// Animation classes for elements as they enter the viewport
export const fadeInAnimationVariants = {
  hidden: "opacity-0",
  visible: "animate-fade-in"
};

export const slideUpAnimationVariants = {
  hidden: "opacity-0 translate-y-8",
  visible: "animate-slide-up"
};

export const slideDownAnimationVariants = {
  hidden: "opacity-0 -translate-y-8",
  visible: "animate-slide-down"
};

export const scaleInAnimationVariants = {
  hidden: "opacity-0 scale-95",
  visible: "animate-scale-in"
};

// Function to generate staggered animation delay classes
export const staggeredDelay = (index: number, baseDelay: number = 100): string => {
  const delay = index * baseDelay;
  return `transition-all duration-500 delay-[${delay}ms]`;
};

// Combined animation with delay for lists
export const getStaggeredAnimation = (
  index: number, 
  variant: keyof typeof animationVariants = "slideUp",
  baseDelay: number = 100
): string => {
  const animation = animationVariants[variant];
  return cn(animation.visible, staggeredDelay(index, baseDelay));
};

const animationVariants = {
  fadeIn: fadeInAnimationVariants,
  slideUp: slideUpAnimationVariants,
  slideDown: slideDownAnimationVariants,
  scaleIn: scaleInAnimationVariants
};
