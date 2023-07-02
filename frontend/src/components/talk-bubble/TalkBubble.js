import './style.css';
import Typography from "@mui/material/Typography";

export default function TalkBubble({text}) {
    if(!text)
        return null
    return (
        <div className="talk-bubble tri-right border btm-right-in">
            <div className="talktext">
                <Typography variant={'h6'} color={'primary.main'}
                            align="center"
                >
                    {text}
                </Typography>
            </div>
        </div>
    )
}