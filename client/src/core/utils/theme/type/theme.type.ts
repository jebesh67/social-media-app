export interface IThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  nextTheme?: () => void;
}

export type Theme = "light" | "dark";