import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ResizeImage from "./ResizeImage";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResizeImage />
    </ThemeProvider>
  );
}
