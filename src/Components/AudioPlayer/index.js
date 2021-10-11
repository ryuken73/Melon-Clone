import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ImageBox from '../Common/ImageBox';
import TextBox from '../Common/TextBox';
import ProgressBar from '../Common/ProgressBar';
import SliderBar from '../Common/SliderBar';
import PlayerControls from './PlayerControls';
import colors from '../../config/colors';
import { ColorizeSharp } from '@mui/icons-material';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    height: 350px;
    /* background: #14181e; */
    background: ${colors.player};
`
const Image = styled(Box)`
    margin-top: 20px;
`;
const Title = styled(Box)`
    margin-top: 10px;
`;
const Artist = styled(Box)`
    margin-top: 5px;
`;
const Progress = styled(Box)`
    margin-left: 20px;
    margin-right: 20px;
`;
const Duration = styled(Box)`
    margin-left: 20px;
    display: flex;
`;
const Controls = styled(Box)`
    margin-top: auto;
`;

const AudioPlayer = () => {
    return (
        <Container>
            <Image>
                <ImageBox></ImageBox>
            </Image>
            <Title>
                <TextBox fontSize="13px" text="곡명" color={colors.textMain}></TextBox>
            </Title>
            <Artist>
                <TextBox text="아티스트"></TextBox>
            </Artist>
            <Progress>
                <SliderBar />
            </Progress>
            <Duration>
                <TextBox fontSize="11px" text="00:01" color={colors.textMain}></TextBox>
                <TextBox fontSize="11px" text="03:01" marginLeft="5px" color={colors.textSub}></TextBox>
            </Duration>
            <Controls>
                <PlayerControls></PlayerControls>
            </Controls>
        </Container>
    )
}

export default React.memo(AudioPlayer);
