import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Board from "./components/board/Board";
import Container from "./components/Container";
import { ChessboardProvider } from "./contexts/ChessboardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chessify",
  description: "The best online chess platform",
};

const font = Nunito ({
  subsets: ["latin"]
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="flex flex-col max-h-[100vh]">
          <Navbar />
          {/*Body*/}

          <ChessboardProvider>
            <div className="w-full h-full bg-gray-500 flex justify-center items-center">
              <Board />
            </div>
            {children}
          </ChessboardProvider>
          
        </div>
        {children}
      </body>
    </html>
  
  );
}

