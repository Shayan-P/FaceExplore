import React from 'react';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ErrorBoundary} from "./components/error/ErrorBoundary"
import {ErrorSnackbar} from "./components/error/ErrorSnackbar";
import theme from "./theme/theme";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import GalleryPage from "./pages/GalleryPage";
import DevPage from "./pages/DevPage";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <div style={{position: "relative"}} className="container">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <ErrorBoundary><ErrorSnackbar>
                        <Routes>
                            <Route exact path="/" element={<SearchPage />} />
                            <Route exact path="/gallery" element={<GalleryPage />} />
                            <Route exact path="/dev" element={<DevPage />} />
                            <Route path="*" element={<NotFound />} />
                            {/*todo add not found page*/}
                        </Routes>
                    </ErrorSnackbar></ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}
