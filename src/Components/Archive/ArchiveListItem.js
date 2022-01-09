import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SmallCheckBox from '../Common/CheckBox';
import useCurrentPlaylist from 'hooks/useCurrentPlaylist';
import useSongHelper from 'hooks/useSongHelper';
import colors from 'config/colors';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 55px;
        width: 100%;
        background: ${props => props.checked ? colors.playerLight3 : 'transparent'};
        &:hover {
            background: ${colors.playerLight2}
        }
    }
`

const ArchiveListItem = props => {
    const {item:archive} = props;
    const [hovered, setHovered] = React.useState(false);
    const {addSongsToCurrentPlaylist} = useCurrentPlaylist();
    const {checked, addChecked, delChecked} = useSongHelper(archive.id);
    const onChecked = React.useCallback(() => {
        if(checked){
            delChecked(archive);
        } else {
            addChecked(archive)
        }
    },[addChecked, delChecked, archive, checked])
    return (
        <Container>
            <SmallCheckBox checked={checked} setChecked={onChecked} />

        </Container>
    )
}

export default ArchiveListItem;