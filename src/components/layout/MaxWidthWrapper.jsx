import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({ children, className }) => {
  return (
    <div className={cn("h-full mx-auto max-w-screen-xl px-3.5", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
