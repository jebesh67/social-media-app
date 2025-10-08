export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  nextTheme: () => void;
}

export type Theme = "light" | "dark";