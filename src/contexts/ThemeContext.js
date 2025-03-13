import { createContext } from "react";
import Colors from '../styles/palette';

export const ThemeContext = createContext({
    theme: { mode: "dark", system: false, primaryColor: Colors.lightSeaGreenColor },
    updateTheme: () => { },
});