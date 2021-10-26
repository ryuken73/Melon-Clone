import React from 'react'
import Hls from 'hls.js';

export default function useHlsAudioPlayer(hlsSource) {
    const [hls, setHls] = React.useState(null);
    const [canPlay, setCanPlay] = React.useState(false);
    let playerRef = React.useRef(null);
    React.useEffect(()=>{
        if(Hls.isSupported()){
            const audioElement = new Audio();
            const hls = new Hls();
            hls.attachMedia(audioElement);
            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                console.log('audio is attached to hls');
                playerRef.current = audioElement;
                setHls(hls);
                hls.loadSource(hlsSource);

            })
            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                console.log('manifest loaded, found data:', data);
                setCanPlay(true)
            })
        }
    },[hlsSource]);

    return [playerRef, hls, canPlay];
}
