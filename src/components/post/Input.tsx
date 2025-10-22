import { useRef, useEffect } from "react";
import styles from "./input.module.css";

type InputVariants = "title" | "plain" | "mini";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariants;
}

function Input({ variant = "plain", className = "", style, ...props }: InputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleInput = () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    };

    el.addEventListener("input", handleInput);
    handleInput();

    return () => el.removeEventListener("input", handleInput);
  }, []);

  return (
    <textarea
      ref={ref}
      className={`${styles[variant]} ${className}`}
      style={style}
      {...props}
    />
  );
}

export { Input };