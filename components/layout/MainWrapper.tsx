export function MainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 px-6 py-4 md:py-6">
      <div className="">{children}</div>
    </main>
  );
}