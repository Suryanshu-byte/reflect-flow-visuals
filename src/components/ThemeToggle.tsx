
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-300 transition-all duration-300 ease-in-out" />
      )}
    </Button>
  );
};

export default ThemeToggle;
