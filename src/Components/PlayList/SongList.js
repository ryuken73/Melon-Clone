import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Song from './Song';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';
import ScrollBarSmooth from 'Components/Common/ScrollBarSmooth';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useMediaQueryEasy from 'hooks/useMediaQueryEasy';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    const {fullViewHeightMediaQuery} = useMediaQueryEasy();
    return (
        <ScrollBarWithColor autoHide style={{ width:`${hide ? '0px':'300px'}`, flex:"1", height: `calc(${fullViewHeightMediaQuery} - 440px)`}}>
         {/* <ScrollBarSmooth
             height={`calc(${fullViewHeightMediaQuery} - 440px)`}
             width={hide ? '0px':'300px'}
         > */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef} 
                    >
                        {currentPlaylist.map((song,index) => (
                            <Draggable key={song.id} draggableId={song.id} index={index}>
                                 {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        // {...provided.dragHandleProps}
                                    >
                                     <Song key={index} sequenceId ={index} song={song} provided={provided}></Song>
                                    </div>
                                 )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Container>
                    )}
                </Droppable>
            </DragDropContext>
        {/* </ScrollBarSmooth> */}
        </ScrollBarWithColor>
    )
}

export default React.memo(SongList)
