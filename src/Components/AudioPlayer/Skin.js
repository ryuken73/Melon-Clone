import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from 'Components/Common/ImageBox';
import TextBox from 'Components/Common/TextBox';
import VideoPlayer from 'Components/AudioPlayer/VideoPlayer';
import colors from 'config/colors';
import usePlayerState from 'hooks/usePlayerState';
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
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    height: 270px;
    /* background: #14181e; */
    background: ${colors.player};
`
const Image = styled(Box)`
    margin-top: 50px;
`;
const Title = styled(Box)`
    margin-top: 10px;
    align-self: center;
    max-width: 200px;
`;
const Artist = styled(Box)`
    align-self: center;
    margin-top: 5px;
    max-width: 200px;
`;

const {SRC_TYPE} = CONSTANTS;

function Skin(props, ref) {
    // const {mode, miniPlayerRef, hideRightPane} = props;
    const {mode} = props;
    const {song={}} = usePlayerState();
    const {
        albumImageSrc='',
        song_name="곡명",
        artist="아티스트",
        getFileSizeParams='',
        currentPlaying=false,
        src_type = SRC_TYPE.SONG
    } = song;
    console.log('&&&&&', src_type)
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
        // if src changed from mp4 to hls and pip opened, close pip
        if(src_type === 'hls' && document.pictureInPictureElement){
            // document.pictureInPictureElement.src = null; //this makes access violation!
            document.exitPictureInPicture();
        }
        //
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
    },[ref, src_type])

    const width = getFileSizeParams === 'archive' ? '150px':'150px';
    const objectFit = getFileSizeParams === 'archive' ? 'contain':'cover';
    return (
        <Box>
            {src_type === SRC_TYPE.BORA && (
                <VideoContainer>
                    {/* {mode === 'flat' && (<CustomVideo ref={ref}></CustomVideo>)} */}
                    {/* {mode !== 'flat' && (<CustomVideo crossOrigin="anonymous" ref={ref}></CustomVideo>)} */}
                    <VideoPlayer crossOrigin="anonymous" ref={ref}></VideoPlayer>
                    <Box>
                        <TextBox onClick={togglePIP} text={pipText}></TextBox>
                    </Box>
                </VideoContainer>
            )}
            {src_type !== SRC_TYPE.BORA && (
                <Container>
                    <Image>
                        <ImageBox src={albumImageSrc} objectFit={objectFit} width={width} height="150px"></ImageBox>
                    </Image>
                    <Title>
                        <TextBox textalign="center" fontSize="13px" text={song_name} color={currentPlaying ? 'yellow':colors.textMain}></TextBox>
                    </Title>
                    <Artist>
                        <TextBox textalign="center" text={artist}></TextBox>
                        <HiddenAudio ref={ref}></HiddenAudio>
                    </Artist>
                </Container>
            )}
        </Box>
    );
}

export default React.memo(React.forwardRef(Skin));