import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import TextBox from 'Components/Common/TextBox'
import useCurrentPlaylist from 'hooks/useCurrentPlaylist'
import ArchiveBoraPlayButton from 'Components/Portal/Archive/ArchiveBoraPlayButton'
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
    const {hideRightPane, showMiniArchiveList} = useMediaQueryEasy();
    const {index, archives} = props
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const {id, pgm_nm, chan_cd_full, dj, last_brd_time, archiveChildren} = archives;
    const rownum = index + 1;
    const lastUpdated = `${last_brd_time.slice(0,2)}시${last_brd_time.slice(2,4)}분`
    const reversed = React.useMemo(() => [...archiveChildren].reverse(),[archiveChildren]);
    const addSongNPlay = React.useCallback((event) => {
        const index = event.target.id;
        const archive = reversed[index];
        addSongsToCurrentPlaylist(archive, true);
    },[addSongsToCurrentPlaylist,reversed])
    const UPDATE_TEXT = showMiniArchiveList ? 'Last Updated: ' : 'Updated';
    return (
        <Container>
            <RowContainer>
                <Box flexShrink={0} minWidth="20px">
                    <TextBox fontSize="14px" color="white" text={`${rownum}.`}></TextBox>
                </Box>
                <Box flexShrink={0} minWidth="20px">
                    <TextBox 
                        fontSize="14px" 
                        color={chan_cd_full === 'AM' ?'burlywood':'lightskyblue'}
                        text={`[${chan_cd_full}]`}
                        mr="5px"
                        ml="3px"
                    >
                    </TextBox>
                </Box>
                <TextBox fontSize="14px" color="white" text={pgm_nm}></TextBox>
                <Box ml="auto" mr="20px">
                    <TextBox cursor="auto" opacity="0.5" text={`${UPDATE_TEXT} ${lastUpdated}`}></TextBox>
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

export default React.memo(ArchiveItem)