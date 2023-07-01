import { createTheme } from '@mui/material/styles';
import { green, grey, red } from '@mui/material/colors';
import {responsiveFontSizes} from "@mui/material";

const rawTheme = createTheme({
    palette: {
        primary: {
            light: '#d9d9ea',
            main: '#4B5C82',
            dark: '#1c2131',
        },
        secondary: {
            light: '#F28C77',
            main: '#F6A167',
            dark: '#f6c467',
        },
        warning: {
            main: '#ff8b71',
            dark: '#ef2e2e',
        },
        error: {
            light: '#ad0f0f',
            main: '#ad0f0f',
            dark: '#ad0f0f',
        },
        success: {
            light: green[50],
            main: green[500],
            dark: green[700],
        },
    },
    typography: {
        fontFamily: "'Bahij', sans-serif",
        fontWeightLight: 300, // Work Sans
        fontWeightRegular: 400, // Work Sans
        fontWeightMedium: 700, // Roboto Condensed
        allVariants: {
            color: "white"
        },
    },
});



const fontHeader = {
    color: rawTheme.palette.text.primary,
    fontWeight: rawTheme.typography.fontWeightMedium,
    fontFamily: "'Bahij', sans-serif",
    // textTransform: 'uppercase',
};

const addBacktheme = {
    ...rawTheme,
    palette: {
        ...rawTheme.palette,
        background: {
            ...rawTheme.palette.background,
            default: rawTheme.palette.common.white,
            placeholder: "#ffffff",
        },
    },
    shadows:     ["none",
        "0px 2px 1px -1px rgba(256,256,256,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(256,256,256,0.12)",
        "0px 3px 1px -2px rgba(256,256,256,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(256,256,256,0.12)",
        "0px 3px 3px -2px rgba(256,256,256,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(256,256,256,0.12)",
        "0px 2px 4px -1px rgba(256,256,256,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(256,256,256,0.12)",
        "0px 3px 5px -1px rgba(256,256,256,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(256,256,256,0.12)",
        "0px 3px 5px -1px rgba(256,256,256,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(256,256,256,0.12)",
        "0px 4px 5px -2px rgba(256,256,256,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(256,256,256,0.12)",
        "0px 5px 5px -3px rgba(256,256,256,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(256,256,256,0.12)",
        "0px 5px 6px -3px rgba(256,256,256,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(256,256,256,0.12)",
        "0px 6px 6px -3px rgba(256,256,256,0.2),0px 10px 14px 1px…gba(0,0,0,0.14),0px 4px 18px 3px rgba(256,256,256,0.12)",
        "0px 6px 7px -4px rgba(256,256,256,0.2),0px 11px 15px 1px…gba(0,0,0,0.14),0px 4px 20px 3px rgba(256,256,256,0.12)",
        "0px 7px 8px -4px rgba(256,256,256,0.2),0px 12px 17px 2px…gba(0,0,0,0.14),0px 5px 22px 4px rgba(256,256,256,0.12)",
        "0px 7px 8px -4px rgba(256,256,256,0.2),0px 13px 19px 2px…gba(0,0,0,0.14),0px 5px 24px 4px rgba(256,256,256,0.12)",
        "0px 7px 9px -4px rgba(256,256,256,0.2),0px 14px 21px 2px…gba(0,0,0,0.14),0px 5px 26px 4px rgba(256,256,256,0.12)",
        "0px 8px 9px -5px rgba(256,256,256,0.2),0px 15px 22px 2px…gba(0,0,0,0.14),0px 6px 28px 5px rgba(256,256,256,0.12)",
        "0px 8px 10px -5px rgba(256,256,256,0.2),0px 16px 24px 2p…gba(0,0,0,0.14),0px 6px 30px 5px rgba(256,256,256,0.12)",
        "0px 8px 11px -5px rgba(256,256,256,0.2),0px 17px 26px 2p…gba(0,0,0,0.14),0px 6px 32px 5px rgba(256,256,256,0.12)",
        "0px 9px 11px -5px rgba(256,256,256,0.2),0px 18px 28px 2p…gba(0,0,0,0.14),0px 7px 34px 6px rgba(256,256,256,0.12)",
        "0px 9px 12px -6px rgba(256,256,256,0.2),0px 19px 29px 2p…gba(0,0,0,0.14),0px 7px 36px 6px rgba(256,256,256,0.12)",
        "0px 10px 13px -6px rgba(256,256,256,0.2),0px 20px 31px 3…gba(0,0,0,0.14),0px 8px 38px 7px rgba(256,256,256,0.12)",
        "0px 10px 13px -6px rgba(256,256,256,0.2),0px 21px 33px 3…gba(0,0,0,0.14),0px 8px 40px 7px rgba(256,256,256,0.12)",
        "0px 10px 14px -6px rgba(256,256,256,0.2),0px 22px 35px 3…gba(0,0,0,0.14),0px 8px 42px 7px rgba(256,256,256,0.12)",
        "0px 11px 14px -7px rgba(256,256,256,0.2),0px 23px 36px 3…gba(0,0,0,0.14),0px 9px 44px 8px rgba(256,256,256,0.12)",
        "0px 11px 15px -7px rgba(256,256,256,0.2),0px 24px 38px 3…gba(0,0,0,0.14),0px 9px 46px 8px rgba(256,256,256,0.12)"]
};

const theme = responsiveFontSizes(addBacktheme)

export default theme;