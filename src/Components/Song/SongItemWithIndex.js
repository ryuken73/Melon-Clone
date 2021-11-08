import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import TextBox from '../Common/TextBox';
import colors from '../../config/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import HoverButton from '../Common/ButtonHover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {secondsToTime} from 'lib/util'
import LinkArtist from 'Components/Links/LinkArtist';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 55px;
        width: 100%;
        background: ${props => props.checked && !props.header ? colors.lightCenterPane : 'transparent'};
        ${props => props.header || `&:hover {
                background: ${colors.highCenterPane}
            }`
        }
    }
`

const SongItemWithIndex = props => {
    const {cellValues=[], header=false, ...rest} = props;
    const [checked, setChecked] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    const onHovered = React.useCallback(()=>{
        setHovered(true);
    },[setHovered])
    const onHoverOut = React.useCallback(()=>{
        setHovered(false);
    },[setHovered])
    // console.log('###', cellValues)
    const durationInSeconds = cellValues[4];
    const duration = isNaN(parseInt(durationInSeconds)) ? durationInSeconds:secondsToTime(durationInSeconds)
    return (
            <Container header={header} checked={checked} onMouseEnter={onHovered} onMouseLeave={onHoverOut}>
                <SmallCheckBox checked={checked} setChecked={setChecked} />
                <Box flex="1">
                    {/* 순번 */}
                    <TextBox text={cellValues[0]} {...rest} cursor="auto"></TextBox>
                </Box>
                <Box flex="5" display="flex" flexDirection="row" alignItems="center">
                    {/* 곡명 */}
                    <TextBox containerProps={{marginRight:"15px"}} text={cellValues[1]} {...rest}></TextBox>
                    {!header && hovered && (
                        <Box flexShrink="0" width="150px" ml="auto" mr="20px">
                            <HoverButton><PlayArrowIcon fontSize="small"></PlayArrowIcon></HoverButton>
                            <HoverButton><FileDownloadIcon fontSize="small"></FileDownloadIcon></HoverButton>
                            <HoverButton><AddIcon fontSize="small"></AddIcon></HoverButton>
                        </Box>
                    )}
                </Box>
                <Box width="20%">
                    {/* 아티스트 */}
                    {/* <TextBox text={cellValues[2]} {...rest} color="darkgrey"></TextBox> */}
                    <LinkArtist artist={cellValues[2]} {...rest} color="darkgrey"></LinkArtist>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 버전 */}
                    <TextBox text={cellValues[3]} {...rest} cursor="auto" color="darkgrey"></TextBox>
                </Box>
                <Box width="15%" display="flex" flexDirection="row" alignItems="center">
                    {/* 재생시간 */}
                    <TextBox text={duration} {...rest} cursor="auto" color="darkgrey"></TextBox>
                    {!header && hovered && (
                        <Box ml="auto">
                            <HoverButton><MoreVertIcon fontSize="small"></MoreVertIcon></HoverButton>
                        </Box>
                    )}
                </Box>
            </Container>
            
    )
}

export default React.memo(SongItemWithIndex)
