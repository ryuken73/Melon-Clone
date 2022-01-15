import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import TextBox from 'Components/Common/TextBox'
import useCurrentPlaylist from 'hooks/useCurrentPlaylist'
import ArchiveBoraPlayButton from 'Components/Portal/Archive/ArchiveBoraPlayButton'
import {withRouter} from 'react-router-dom'
import CONSTANTS from 'config/constants';
// import useMediaQuery from '@mui/material/useMediaQuery';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: 'center';
    margin-top: 8px;
`
const RowContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: 'center';
`
const RowReverseContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: 'center';
`

function ArchiveItem(props) {
    // const {WIDTH_TO_HIDE_SIDE_PANEL} = CONSTANTS;
    // const hideRightPane = useMediaQuery(`(max-width:${WIDTH_TO_HIDE_SIDE_PANEL})`);
    const {hideRightPane, showShortArchiveList} = useMediaQueryEasy();
    const {index, archives, history} = props
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const {id, pgm_cd, pgm_nm, chan_cd, chan_cd_full, dj, last_brd_time, archiveChildren} = archives;
    const rownum = index + 1;
    // const lastUpdated = `${last_brd_time.slice(0,2)}시${last_brd_time.slice(2,4)}분`
    const lastUpdated = last_brd_time;
    const reversed = React.useMemo(() => [...archiveChildren].reverse(),[archiveChildren]);
    const addSongNPlay = React.useCallback((event) => {
        const index = event.target.id;
        const archive = reversed[index];
        addSongsToCurrentPlaylist(archive, true);
    },[addSongsToCurrentPlaylist,reversed])

    const handleOnClickChannel = React.useCallback(() => {
        chan_cd === 'A' && history.push(`/program/loveFM`, {chan_cd})
        chan_cd === 'F' && history.push(`/program/powerFM`, {chan_cd})
    },[chan_cd, history])

    const handleOnClickPgmNM = React.useCallback(() => {
        history.push(`/archive/${pgm_cd}/archiveList`, {pgm_cd})
    },[pgm_cd, history])

    const UPDATE_TEXT = showShortArchiveList ? 'Last Updated: ' : 'Updated';
    return (
        <Container>
            <RowContainer>
                <Box flexShrink={0} minWidth="20px">
                    <TextBox fontSize="14px" color="white" text={`${rownum}.`}></TextBox>
                </Box>
                <Box flexShrink={0} minWidth="20px">
                    <TextBox 
                        fontSize="14px" 
                        color={chan_cd === 'A' ?'burlywood':'lightskyblue'}
                        text={`[${chan_cd_full}]`}
                        mr="5px"
                        ml="3px"
                        onClick={handleOnClickChannel}
                    >
                    </TextBox>
                </Box>
                <TextBox 
                    fontSize="14px" 
                    color="white" 
                    text={pgm_nm}
                    onClick={handleOnClickPgmNM}
                ></TextBox>
                <Box ml="auto" minWidth="100px" mr="20px">
                    <TextBox opacity="0.5" text={`${UPDATE_TEXT} ${lastUpdated}`}></TextBox>
                </Box>
            </RowContainer>
            <RowReverseContainer>
                <Box flexShrink={0} minWidth="20px"></Box>
                {reversed.map((child, index) => (
                    <Box display="flex" alignItems="center" flexDirection="row" key={id} mr="5px">
                        <TextBox 
                            id={index} 
                            color="white" 
                            opacity="0.5"
                            onClick={addSongNPlay} 
                            fontWeight={100}
                            text={child.episode}
                        ></TextBox>
                        {child.bora_archive_yn === 'Y' &&
                            <ArchiveBoraPlayButton
                                media_id={child.media_id}
                                archive={child}
                            ></ArchiveBoraPlayButton>
                        }
                        
                    </Box>
                ))}
            </RowReverseContainer>
        </Container>
    )
}

export default React.memo(withRouter(ArchiveItem));