import React from 'react';
import Box from '@mui/material/Box';
import Song from 'Components/PlayList/Song';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`
const DragNDrop = props => {
    const {currentPlaylist, onDragEnd} = props;
    return (
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
    )
}

export default React.memo(DragNDrop)
