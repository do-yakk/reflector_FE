import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "add" | "back" | "hashtag" | "save" ;

function Button({
  variant = "add",
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    />
  );
}

export { Button };
