import React, { createContext, useContext, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

type Theme = "light" | "dark";
type ThemeColor = "blue" | "red" | "green" | "purple" | "orange" | "pink" | "teal" | "indigo";

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  toggleTheme?: () => void;
  setThemeColor?: (color: ThemeColor) => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

// Mapeamento de cores para variáveis CSS (expandido para mais elementos)
const COLOR_MAPPINGS: Record<ThemeColor, {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
}> = {
  blue: {
    primary: "221.2 83.2% 53.3%",
    primaryForeground: "210 40% 98%",
    accent: "221.2 83.2% 93.3%",
    accentForeground: "221.2 83.2% 23.3%",
  },
  red: {
    primary: "0 84.2% 60.2%",
    primaryForeground: "0 0% 100%",
    accent: "0 84.2% 95%",
    accentForeground: "0 84.2% 30%",
  },
  green: {
    primary: "142.1 76.2% 36.3%",
    primaryForeground: "355.7 100% 97.3%",
    accent: "142.1 76.2% 90%",
    accentForeground: "142.1 76.2% 20%",
  },
  purple: {
    primary: "262.1 83.3% 57.8%",
    primaryForeground: "210 40% 98%",
    accent: "262.1 83.3% 93%",
    accentForeground: "262.1 83.3% 27%",
  },
  orange: {
    primary: "24.6 95% 53.1%",
    primaryForeground: "60 9.1% 97.8%",
    accent: "24.6 95% 93%",
    accentForeground: "24.6 95% 23%",
  },
  pink: {
    primary: "330.4 81.2% 60.4%",
    primaryForeground: "0 0% 100%",
    accent: "330.4 81.2% 93%",
    accentForeground: "330.4 81.2% 30%",
  },
  teal: {
    primary: "173.4 80.4% 40%",
    primaryForeground: "0 0% 100%",
    accent: "173.4 80.4% 90%",
    accentForeground: "173.4 80.4% 20%",
  },
  indigo: {
    primary: "239 84% 67%",
    primaryForeground: "0 0% 100%",
    accent: "239 84% 93%",
    accentForeground: "239 84% 37%",
  },
};

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = true,
}: ThemeProviderProps) {
  const { data: user } = trpc.auth.me.useQuery();
  
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [themeColor, setThemeColorState] = useState<ThemeColor>("blue");

  // Sincronizar tema com preferências do usuário
  useEffect(() => {
    if (user) {
      if (user.darkMode !== undefined) {
        const newTheme = user.darkMode ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      }
      if (user.themeColor) {
        setThemeColorState(user.themeColor as ThemeColor);
      }
    }
  }, [user?.darkMode, user?.themeColor]);

  // Aplicar tema dark/light
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  // Aplicar cor do tema dinamicamente (expandido para mais variáveis)
  useEffect(() => {
    const root = document.documentElement;
    const colors = COLOR_MAPPINGS[themeColor];
    
    // Aplicar cores primárias
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    
    // Aplicar cores de accent (botões, badges, links)
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    
    // Aplicar cor no header gradiente (primeira cor do gradiente)
    root.style.setProperty("--header-gradient-start", colors.primary);
  }, [themeColor]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColor, toggleTheme, setThemeColor, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
