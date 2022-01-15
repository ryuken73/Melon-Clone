import React from 'react'
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox'
import ItemWithTitleNvalue from 'Components/Common/ItemWithTitleNValue';
// import useAlbumInfo from 'hooks/useAlbumInfo';
// import useSongsInAlbum from 'hooks/useSongsInAlbum';
import useQueryAlbumInfo from 'hooks/useQueryAlbumInfo';
import createAlbumInfo from 'lib/albumInfoClass';

const Container = styled(Box)`
    && {
        display: flex;
        flex-direction: column;
        flex: 0;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
        text-align: left;
    }
`

const TitleContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    text-align: left;
    align-items: center;
    width: 100px;
    justify-content: space-between;
    margin-top: 10px;
`

const TextBoxWithNoramlCursor =  styled(TextBox)`
    font-size: 14px;
`

const TableTitle = styled(TextBoxWithNoramlCursor)`
    font-size: 15px;
    font-weight: strong;
    color: white;
    opacity: 0.6;
    margin-top: 10px;
    margin-bottom: 10px;
    width: fit-content;
`

const PreWithWrap = styled.div`
    white-space: pre-line;
    font-size: 14px;
    color: grey;
    opacity: 1.0;
`

const slashReplaced = genre_nm => {
    if(genre_nm === undefined) return '';
    const [blank, ...rest] = genre_nm.split('/');
    return rest.join(' > ')
}
const dateWithDot = dateString => {
    if(dateString === undefined) return '';
    return `${dateString.substr(0,4)}.${dateString.substr(4,2)}.${dateString.substr(6,2)}`
}
const mkItems = albumInfo => {
    const {
        album_type,
        genre_nm,
        collect_dt,
        producer,
        collect_src,
        label_no
    } = albumInfo;

    return [
        {title: '유형', value: album_type},
        {title: '장르', value: slashReplaced(genre_nm)},
        {title: '입수일', value: dateWithDot(collect_dt)},
        {title: '기획/제작사', value: producer},
        {title: '레이블/라이센스', value: collect_src},
        {title: '청구번호', value: label_no},
    ]
}

const splitRemark = (remarkText='') => {
    const splited = remarkText.split('\r\n\r\n');
    if(splited.length > 2){
        return splited;
    } else {
        const splitByOneline = remarkText.split('\r\n');
        return splitByOneline;
    }
}

const AlbumInfoTable = props => {
    const {receipt_no} = props;
    const result = useQueryAlbumInfo(receipt_no);
    const albumInfo = React.useMemo(() => createAlbumInfo(result.data),[result.data]);
    // console.log('^^ albumInfo:', albumInfo)
    const items = mkItems(albumInfo);
    const [remarkHeader, ...rest] = splitRemark(albumInfo.remark_ext)
    const remark = rest.join('\r\n\r\n');
    const songsInAlbum = albumInfo.list_song;
    const songs = songsInAlbum.map(song => song.song_name);
    // console.log('^^ songsInAlbum:', songsInAlbum)
    const [openTitle, setOpenTitle] = React.useState(false);
    const openLinkText = openTitle ? '접기':'펼치기';
    const onClickOpenTitle = React.useCallback(()=>{
        setOpenTitle(openTitle => !openTitle)
    },[setOpenTitle]);

    return (
        <Container>
            <TableTitle text="활동정보"></TableTitle>
            {items.map(item => (
                <ItemWithTitleNvalue key={item.title} title={item.title} value={item.value}></ItemWithTitleNvalue>
            ))}
            <TitleContainer>
                <TableTitle text="앨범소개"></TableTitle>
                <TextBox clickable fontSize="8px" color="yellow" onClick={onClickOpenTitle} text={openLinkText}></TextBox>
            </TitleContainer>
            <TextBoxWithNoramlCursor mb="5px" text={remarkHeader}></TextBoxWithNoramlCursor>
            {openTitle && <PreWithWrap>{remark}</PreWithWrap>}
            <TitleContainer>
                <TableTitle text="Track List"></TableTitle>
            </TitleContainer>
            {songs.map((song, index) => (
                <TextBox fontSize="15px" margin="8px" opacity="0.6" onClick={()=>{}} text={`${index+1}. ${song}`}></TextBox>
            ))}
        </Container>
    )
}

export default React.memo(AlbumInfoTable)