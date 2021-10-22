import React from 'react'
import Box from '@mui/material/Box';
import styled from 'styled-components';
import SongItemWithIndex from './SongItemWithIndex';
import Divider from '../Common/Divider';
import ScrollBarWithColor from '../Common/ScrollBarWithColor';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
    }
`
const songs = [
    ['소용돌이', '세븐틴', '03:46'],
    ['Rock with you', '세븐틴', '03:01'],
    ['Crush', '세븐틴', '02:50'],
    ['Pang!', '세븐틴', '02:59'],
    ['매일 그대라서 행복하다', '세븐틴', '03:25'],
    ['그리워하는 것까지', '세븐틴', '03:31'],
    ['2 MINUS 1(Digital Only)', '세븐틴', '03:11'],
    ['Pang!', '세븐틴', '02:59'],
    ['매일 그대라서 행복하다', '세븐틴', '03:25'],
    ['그리워하는 것까지', '세븐틴', '03:31'],
    ['2 MINUS 1(Digital Only)', '세븐틴', '03:11'],
    ['Pang!', '세븐틴', '02:59'],
    ['매일 그대라서 행복하다', '세븐틴', '03:25'],
    ['그리워하는 것까지', '세븐틴', '03:31'],
    ['2 MINUS 1(Digital Only)', '세븐틴', '03:11'],
]

const SongItemsWithIndex = props => {
    const {mr="15px"} = props;
    return (
        <Container>
            <SongItemWithIndex
                header={true}
                cursor="auto"
                cellValues={['순번', '곡명', '아티스트', '재생시간']}
            ></SongItemWithIndex>
            <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
            <ScrollBarWithColor autoHide style={{ width:'100%', height: 'calc(100vh - 370px)' }}>
                {songs.map((song, index) => (
                    <Box key={index}>
                        <SongItemWithIndex
                            fontSize="14px"
                            color="white"
                            cellValues={[index+1, ...song]}
                            width="fit-content"
                        ></SongItemWithIndex>
                        <Divider opacity="0.2" margin="0px" mr={mr}></Divider>
                    </Box>
                ))}
            </ScrollBarWithColor>
        </Container>
    )
}

export default React.memo(SongItemsWithIndex)
