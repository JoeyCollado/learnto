import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { ThemeProvider } from "@/app/components/theme-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="z-50">
        <Navbar />
        <main>{children}</main>
        <Sidebar />
      </div>
    </ThemeProvider>
  );
}
