import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';
import VideoPlayer from 'Components/AudioPlayer/VideoPlayer';
import LinkArtist from 'Components/Links/LinkArtist';
import colors from 'config/colors';
import usePlayerState from 'hooks/usePlayerState';
import useVideoPIP from 'hooks/useVideoPIP';
import CONSTANTS from 'config/constants';

const VideoContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 270px;
    flex-grow: 0;
`
const CustomVideo = styled.video`
    width: 90%;
    /* aspect-ratio: 4/3; */
    object-fit: cover;
    pointer-events: none;
    margin: auto;
`

const HiddenAudio = styled.audio`
    display: none;
`

const Container = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    height: 270px;
    background: ${colors.player};
`
const BlurContainer = styled(Box)`
    position: absolute;
    background-image: ${props => `url("${props.bgImage}")`};
    background-size: cover;
    background-position: center;
    filter: blur(25px);
    transform: scale(0.9);
    height: 100%;
    width: 100%;
    /* z-index: -1; */
`

const Image = styled(Box)`
    margin-top: 50px;
`;
const Title = styled(Box)`
    margin-top: 10px;
    align-self: center;
    max-width: 200px;
    z-index: 1;
`;
const Artist = styled(Box)`
    align-self: center;
    margin-top: 5px;
    max-width: 200px;
    z-index: 1;
`;

const {SRC_TYPE} = CONSTANTS;

function Skin(props, ref) {
    // const {mode, miniPlayerRef, hideRightPane} = props;
    const {hide} = props;
    const {song={}} = usePlayerState();
    const {showPIP} = useVideoPIP();
    const {
        albumImageSrc='',
        eval_imagePath='',
        song_name="곡명",
        artist="아티스트",
        getFileSizeParams='',
        currentPlaying=false,
        src_type = SRC_TYPE.SONG
    } = song;
    console.log('&&&&&', src_type)
    React.useEffect(() => {
        if(ref === null){
            return;
        }
        // console.log('&&&&', ref.current.readyState)
        // prevent error when adding new bora mp4 in flat mode
        // ref.current.readyState !== 0 && showPIP(ref);
    },[showPIP, ref])
    // React.useEffect(() => {
    //     if(mode !== 'flat') {
    //         return;
    //     }
    //     const origStream = miniPlayerRef.current.captureStream();
    //     const videoOnlyStream = new MediaStream(origStream.getVideoTracks());
    //     ref.current.srcObject = null;
    //     ref.current.srcObject = videoOnlyStream;
    //     if(hideRightPane){
    //         ref.current.play();
    //         return;
    //     } else {
    //         ref.current.pause();
    //     }
    // },[hideRightPane, miniPlayerRef, ref, mode, song])
    const [pipText, setPIPText] = React.useState('PIP(크게보기)');
    React.useEffect(() => {
        console.log('&&&&& src_type changed', src_type, ref.current);
        if(document.pictureInPictureElement){
            setPIPText('PIP(돌아가기)')
        } else {
            setPIPText('PIP(크게보기)')
        }
    },[src_type, ref])

    const togglePIP = React.useCallback(() => {
        if(document.pictureInPictureElement){
            document.exitPictureInPicture();
            setPIPText('PIP(크게보기)')
        } else {
            if (document.pictureInPictureEnabled) {
                ref.current.requestPictureInPicture();
                setPIPText('PIP(돌아가기)')
            }
        }
    },[ref])

    const width = React.useMemo(() => getFileSizeParams === 'archive' ? '150px':'150px', [getFileSizeParams]);
    const objectFit = React.useMemo(() => getFileSizeParams === 'archive' ? 'contain':'cover', [getFileSizeParams]);
    return (
        <Box>
            {src_type === SRC_TYPE.BORA && (
                <VideoContainer>
                    {/* {mode === 'flat' && (<CustomVideo ref={ref}></CustomVideo>)} */}
                    {/* {mode !== 'flat' && (<CustomVideo crossOrigin="anonymous" ref={ref}></CustomVideo>)} */}
                    <VideoPlayer crossOrigin="anonymous" ref={ref}></VideoPlayer>
                    {!hide && (
                    <Box>
                        <TextBox clickable onClick={togglePIP} text={pipText}></TextBox>
                    </Box>
                    )}
                </VideoContainer>
            )}
            {src_type !== SRC_TYPE.BORA && (
                <Container>
                    {!hide && (
                    <BlurContainer
                        bgImage={albumImageSrc || eval_imagePath} 
                    ></BlurContainer>
                    )}
                    {!hide && (
                    <Image>
                        <ImageBox 
                            src={albumImageSrc || eval_imagePath} 
                            objectFit={objectFit} 
                            width={width} 
                            height="150px"
                        ></ImageBox>
                    </Image>
                    )}
                    {!hide && (
                    <Title>
                        <TextBox textalign="center" fontSize="13px" text={song_name} color={currentPlaying ? 'yellow':colors.textMain}></TextBox>
                    </Title>
                    )}
                    <Artist>
                    {!hide && (
                        <LinkArtist textalign="center" artist={artist}></LinkArtist>
                    )}
                        <HiddenAudio ref={ref}></HiddenAudio>
                    </Artist>
                </Container>
            )}
        </Box>
    );
}

export default React.memo(React.forwardRef(Skin));