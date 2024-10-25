"use client"

import React, {useEffect, useState} from "react";

import '../../styles/global.css';
import '../../styles/fontawesome/all.css';
import '../../styles/fontawesome/fontawesome.css';

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let currentTheme = "system";
  let currentThemeIcon = "fa-moon";

  const [currentPathname, setCurrentPathname] = useState("");

  useEffect(() => {
    setCurrentPathname(window.location.pathname);
  });

  return (
    <html lang="ch">
      <body className="bg-background">

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-0 z-20 flex justify-between items-center w-screen h-16 bg-card shadow-md">
            <div className="flex items-center pl-4 pr-4">
              <i className="fa-duotone fa-dna text-3xl text-primary pr-2"></i>
              <div className="text-2xl text-text font-bold tracking-wider">大豆基因数据库</div>
            </div>
            <div className="flex items-center pl-4 pr-4 space-x-10">
              <div
                className={currentPathname == "/" ? "text-primary font-bold tracking-wider cursor-pointer hover:text-text/80 transition-all duration-100" : "text-text font-bold tracking-wider cursor-pointer hover:text-text/80 transition-all duration-100"}
                onClick={
                () => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  window.location.href = "/"
                }
              }>
                <i className="fa-duotone fa-home text-sm"></i> 首页
              </div>
              <div
                className={currentPathname == "/gene_database" ? "text-primary font-bold tracking-wider cursor-pointer hover:text-text/80 transition-all duration-100" : "text-text font-bold tracking-wider cursor-pointer hover:text-text/80 transition-all duration-100"}
                onClick={
                () => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  window.location.href = "/gene_database"
                }
              }>
                <i className="fa-duotone fa-database text-sm"></i> 基因数据库
              </div>
              <div className="text-text font-bold tracking-wider cursor-pointer hover:text-text/80 transition-all duration-100">
                <i className="fa-duotone fa-newspaper text-sm"></i> 相关论文
              </div>
              <div className="text-text font-bold tracking-wider cursor-pointer hover:text-text/80 transition-all duration-100">
                <i className="fa-duotone fa-users text-sm"></i> 关于我们
              </div>
            </div>
          </div>
          <div className="relative top-16 z-10 w-full h-[calc(100vh-128px)] bg-none overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          <div className="relative top-16 z-20 flex justify-between items-center w-screen h-16 bg-card shadow-[0px_-2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-center pl-4 pr-4 w-full">
              <div className="text-text font-bold tracking-wider "><i className="fas fa-copyright"></i> 2024 大豆基因数据库</div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
