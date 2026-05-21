import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/lib/ThemeProvider";

export const metadata = {
  title: "IdeaVault",
  description: "Startup Idea Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <ThemeProvider>

          <Toaster position="top-right" />

          <Navbar />

          {children}

          <Footer />

        </ThemeProvider>

      </body>
    </html>
  );
}