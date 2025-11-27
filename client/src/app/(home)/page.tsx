"use client";

import { useTheme } from "@/core/hooks/theme/useTheme";

const HomePage = () => {
  const [theme] = useTheme();
  
  
  return (
    <div>home{ theme }
    </div>
  );
};

export default HomePage;
