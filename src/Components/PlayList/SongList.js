import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Song from './Song';
import DragNDropList from 'Components/PlayList/DragNDrop';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import CONSTANTS from 'config/constants';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const {
  HEIGHT_OF_FLAT_PLAYER
} = CONSTANTS;

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const SongList = props => {
    console.log('^^^ re-render SongList:', props)
    const {hide} =props;
    const {currentPlaylist, setCurrentPlaylist} = useCurrentPlaylist();
    const onDragEnd = React.useCallback((result) => {
        console.log(result)
        if (!result.destination) {
            return;
        }
        const reordered = reorder(currentPlaylist, result.source.index, result.destination.index)
        setCurrentPlaylist(reordered);
    },[currentPlaylist, setCurrentPlaylist])
    console.log('###songs:', currentPlaylist)
    const fullViewHeightMediaQuery = hide ? `100vh - ${HEIGHT_OF_FLAT_PLAYER} - 20px` : '100vh';
    const width = React.useMemo(() =>  hide ? '0px':'300px', [hide]);
    const height = React.useMemo(() => `calc(${fullViewHeightMediaQuery} - 440px)`, [fullViewHeightMediaQuery]);
    // not to make too many re-render of ScrollBarWithColor
    const setScrollRefTime = React.useCallback(() => {},[]);

    React.useEffect(() => console.log('^^^ hide changed:', hide),[hide])
    React.useEffect(() => console.log('^^^ currentPlaylist changed:'),[currentPlaylist])
    React.useEffect(() => console.log('^^^ setCurrentPlaylist changed:'),[setCurrentPlaylist])

    return (
        <ScrollBarWithColor 
            autoHide 
            setScrollRefTime={setScrollRefTime}
            style={{ width:width, flex:"1", height:height}}
        >
            <DragNDropList
                onDragEnd={onDragEnd}
                currentPlaylist={currentPlaylist}
            >
            </DragNDropList>
        </ScrollBarWithColor>
    )
}

export default React.memo(SongList)
