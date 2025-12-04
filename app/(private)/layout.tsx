import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MainWrapper } from "@/components/layout/main-wrapper";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col min-h-screen">
        <Header />
        <MainWrapper>{children}</MainWrapper>
      </div>
    </div>
  );
}