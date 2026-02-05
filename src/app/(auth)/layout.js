export default function AuthLayout({ children }) {
  return (
    <div className="h-full flex flex-col gap-y-5 px-3 items-center justify-center bg-zinc-200 dark:bg-black">
      <div className="h-auto">{children}</div>
    </div>
  );
}
