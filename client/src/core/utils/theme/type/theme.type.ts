export interface IThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export type Theme = "light" | "dark";