import { DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: "#000",
        primary: "#0C79F3",
        secondary: "#414757",
        error: "#f13a59",
        success: "#00c851",
        accent: '#3498db',
        background: "#252C4A"
    },
    fonts: {
        fontFamily: "Montserrat"
    },
}