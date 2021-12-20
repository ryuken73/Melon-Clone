import React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import useQueryArchives from 'hooks/useQueryArchives'
import createArchive from 'lib/archiveClass';
import ArchiveItem from 'Components/Portal/Archive/ArchiveItem';

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: ${prop => prop.height || "auto"};
    width: ${prop => prop.height || "100%"};
`

const groupBy = (key, archives) => {
    return archives.reduce((acc, archive) => {
        const alreadyGroup = acc.find(alreadyArchive => alreadyArchive[key] === archive[key]);
        if(alreadyGroup === undefined){
            // first member
            acc.push({
                [key]: archive[key],
                'pgm_nm': archive['pgm_nm'],
                'dj': archive['dj'],
                'last_brd_time': archive['brd_time'],
                'chan_cd_full': archive['chan_cd_full'],
                archiveChildren: [archive]
            })
        } else {
            // member of existing element
            alreadyGroup.archiveChildren.push(archive);
        }
        return [...acc];
    },[]) 
}

function ArchiveList() {
    const result = useQueryArchives();
    const archives = React.useMemo(() => createArchive(result.data), [result.data]);
    const groupedArchives = groupBy('pgm_cd', archives)
    console.log('^^^', archives, groupedArchives)
    return (
        <Container>
            {groupedArchives.map((archives, index) => (
                <ArchiveItem
                    key={archives.pgm_cd}
                    index={index}
                    archives={archives}
                ></ArchiveItem>
            ))}
            
        </Container>
    )
}

export default React.memo(ArchiveList)