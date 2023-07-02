import './style.scss'
import TalkBubble from "../talk-bubble/TalkBubble";

export default function Beaver({talkBubbleElement}) {
    return (
        <div className='beaver-container'>
            {talkBubbleElement
                ?   <div className={'beaver-talk-bubble'}>
                        {talkBubbleElement}
                    </div>
                : null
            }
            <div className='canvas'>
                <div className='shadow'></div>
                <div className='tail'>
                    <div className='checkers'></div>
                </div>
                <div className='body'>
                    <div className='log'>
                        <div className='lines'></div>
                        <div className='rim'></div>
                    </div>
                    <div className='arm'></div>
                    <div className='ear right'></div>
                    <div className='head'>
                        <div className='ear left'></div>
                        <div className='eye left'>
                            <div className='eyelid'></div>
                        </div>
                        <div className='eye right'>
                            <div className='eyelid'></div>
                        </div>
                        <div className='nose'></div>
                        <div className='mouth'>
                            <span></span>
                        </div>
                    </div>
                    <div className='foot'></div>
                </div>
            </div>
        </div>
    )
}