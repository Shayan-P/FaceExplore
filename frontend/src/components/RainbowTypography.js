import Typography from "@mui/material/Typography";

export default function RainbowTypography(props) {
    return <Typography
        {...props}
        sx={{
            ...(props.sx || {}),
            background: "-webkit-linear-gradient(164deg, rgba(14,201,240,1) 0%, rgba(67,166,58,1) 83%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        }} />
}