import React from 'react'
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextBox from 'Components/Common/TextBox'

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
const ItemContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 5px;
`
const ItemTitle = styled(TextBoxWithNoramlCursor)`
    font-weight: string;
    color: grey;
    opacity: 0.8;
    width: 120px;
`
const ItemValue = styled(TextBoxWithNoramlCursor)`
    font-weight: string;
    color: grey;
    opacity: 1.0;
`
const TableItem = props => {
    const {title, value} = props;
    return (
        <ItemContainer>
            <ItemTitle text={title}></ItemTitle>
            <ItemValue text={value}></ItemValue>
        </ItemContainer>
    )
}

const PreWithWrap = styled.div`
    white-space: pre-line;
    font-size: 14px;
    color: grey;
    opacity: 1.0;
`

const items = [
    {title: '유형', value: 'EP'},
    {title: '장르', value: '국내음악 > 가요 > R&B'},
    {title: '입수일', value: '2021.11.03'},
    {title: '기획/제작사', value: 'SONY MUSIC'},
    {title: '레이블/라이센스', value: 'SONY MUSIC'},
    {title: '청구번호', value: '4MB029304'},
];
const remarkHeader = "msftz 1st EP [Belief]"
const remark = "“자신의 감정을 존중하고, 자신의 마음을 믿어보자.\r\n다른 사람 눈치보지 말고, 어떠한 틀에 얽매이지 말고.\r\n우리 모두가 세상에 하나뿐인 소중한 존재이니까.”\r\n\r\n청순한 외모와 매력적인 보이스톤으로 많은 사랑을 받고 있는 미스피츠가 데뷔 이후 1년 10개월만에 첫 EP 앨범 [Belief]을 선보인다.\r\n\r\n미스피츠(msftz)는 ‘어떤 것에도 속하지 않는다’는 이름의 뜻처럼 인디와 팝, R&B와 발라드를 넘나들며 실력파 아티스트로서의 입지를 넓혀가고 있는 싱어송라이터이다. 트렌디하고 고혹적인 외모로 화제를 모으고 있으며, 싱가포르 R&B 가수 Sezairi부터 박원, 크루셜스타, 해쉬스완, 릴러말즈 등 다수의 아티스트들로부터 피처링 러브콜을 받으며 다양한 음악적 활동을 보여주고 있다.\r\n\r\n이번 EP 앨범에서는 ‘믿음’에 대한 다양한 내면의 생각들을 아이코닉한 음악으로 풀어냈으며, 다채로운 콘셉트와 가감없이 솔직한 가사를 통해 일반적인 사랑이야기에서 한 층 확장된 ‘청춘’들을 위한 메시지가 담겨있는 총 6곡을 선보인다. 앨범 전곡의 작사, 작곡, 편곡 등 전 과정에 참여한 미스피츠는 싱어송라이터 미스피츠만의 음악적 정체성과 인간 이신애의 감성과 서사를 모두 녹여내고자 했다. 특히 헤이즈, 카더가든, 수란, 김필 등 내로라하는 아티스트의 음악을 이끌고 있는 프로듀싱팀 ‘623’, 기리보이, 오르내림과 함께하며 그 실력을 발한 신예 작곡가 ‘sec paul’, 힙합 씬의 중심에 선 천재 래퍼이자 작곡가 ‘sokodomo’, 전작 ‘Facetime, Face Me’에서 함께했던 작곡가 ‘JISU’와의 작업을 통해 앨범의 음악적 완성도를 높였다.\r\n\r\n타이틀곡인 ‘Heart’의 뮤직비디오와 콘셉트 이미지에서도 알 수 있듯, 미스피츠는 지금까지 볼 수 없었던 과감한 메이크업과 컨셉추얼한 의상으로 그동안 보여줬던 모습과는 사뭇 다른 자신만의 색과 다채로운 이미지를 보여줄 예정이다. 또한, 첫 앨범 발매를 시작으로 곡뿐만 아니라 다양한 콘텐츠를 선보이며, 프로페셔널한 아티스트의 모습과 소녀 같은 인간적인 매력을 모두 보여주면서 글로벌 음악팬들을 사로잡을 전망이다.\r\n\r\n\r\n[Album Preview]\r\n\r\n01. Heart (**Title)\r\n“짝사랑은 싫지만, 좋은 걸 어떡해?\r\n당신이 너무 좋아서 심장이 터져버릴 것 같아요.\r\n이뤄질 수 없다는 걸 알지만, 나만의 방식으로 이 사랑을 지키고 싶어요.”\r\n\r\n앨범의 첫 곡이자 타이틀곡인 ‘Heart’는 짝사랑은 싫지만 어쩔 수 없이 사랑에 점점 깊이 빠져드는 감정을 미스피츠만의 통통 튀는 귀여운 노랫말로 표현한 팝(Pop) 곡이다. 솔직하고 꾸밈없는 청춘들의 짝사랑 이야기를 대변한 작품으로, 트렌디한 사운드와 멜로디뿐만 아니라 미스피츠의 미니멀한 래핑이 가미되어 다채로운 음악성을 확인해 볼 수 있다.\r\n\r\n02. Do You Feel Sad?\r\n“내가 슬프거나 불안할 때 듣고 싶었던 말을 노래로 만들었다.\r\n마찬가지로 혹시 마음이 힘든 시기를 지나는 다른 사람들에게도\r\n‘나도 그 마음 알아, 내가 곁에 있어.‘ 라고 말해주고 싶었다.”\r\n\r\n상처받을까봐 늘 불안하고 두려운 사람들에게 들려주는 미스피츠만의 위로 송이다. 유니크하면서도 캐치한 사운드와 리드미컬한 비트가 돋보이는 인디팝(Indie pop) 장르로, 래퍼 소코도모의 깜짝 래핑이 어우러져 곡의 매력을 극대화한다.\r\n\r\n03. 100%\r\n“과연 세상에 완전한 사랑은 있을까?\r\n말 그대로 100% 완벽한 사랑이 존재할까?\r\n누군가를 사랑하고 있다면, 다시 돌아오지 않을 그 순간들을 위해 진심을 다해보자.”\r\n\r\n보사노바(Bassa nova) 장르 특유의 나른하면서도 사랑스러운 분위기가 돋보이는 곡으로, 사랑에 푹 빠져 있는 순간 모든 것이 아름답고 행복해 보이는 완벽한 감정을 그려냈다. 기타 사운드 위로 채워지는 미스피츠의 수려한 보컬은 아름다운 해변가를 연상케하며 음악적 몰입도를 높인다.\r\n\r\n04. 우물\r\n“아 답답해! 안 되는 게 뭐가 이렇게 많아, 왜 이렇게 조심스러운 거지?\r\n사회적 울타리에 친구마저 나를 속박하네. 그저 하고 싶은 대로 살면 안 되나?\r\n이게 그냥 나인 걸. 숨기라고 하지 말아 줘.”\r\n\r\n‘우물’은 사회적으로 정해진 인식과 속박에 갇혀 ‘척’하려고 애쓰는 사람들에게 그러지 않아도 된다는 메시지를 전하는 록(Rock) 장르의 곡이다. 미니멀하면서도 어쿠스틱한 악기 구성으로 시작해 점차 화려해지는 세션으로 극대화되는 편곡 덕분에, ‘척’하는 사람들에게 일침을 날리는 듯한 느낌을 자아내며 보다 감각적이면서도 흥미로운 곡으로 거듭났다.\r\n\r\n05. 착해\r\n“나는 뜻하지 않게 다른 사람들의 감정을 상하게 하는 게 제일 두렵다.\r\n‘착하다는 틀을 절대로 깨면 안 돼!’\r\n하지만 나처럼 생각하는 사람들의 마음을 약점 잡아 이용하는 사람들은 정말 나쁘다.”\r\n\r\n다른 사람들이 바라고 원하는 모습에 맞춰 사는 걸 거부하고 나답게 살고 싶은 마음을 표현한 곡이다. 존재감이 뚜렷한 베이스라인과 화려한 피아노 선율이 조화를 이루는 밴드 사운드가 인상적인 얼터너티브 록(Alternative Rock) 트랙으로, 각 섹션의 구분이 명확하게 느껴지는 버라이어티한 곡 진행이 돋보인다. 대체 불가한 뮤지션 미스피츠의 음악적 깊이와 아이덴티티를 엿볼 수 있는 작품이다.\r\n\r\n06. MISFITS\r\n“맞지 않아도 괜찮다. 옷도 종종 오버사이즈로, 타이트한 핏으로 입어줘야 재미있으니까.\r\n서로에게 프레임을 씌우지 말자, 숨이 턱 막히니까.\r\n틀을 깨지 않기 위해 각자의 정체성을 잃어가는 건 정말 괴로운 일이다.”\r\n\r\n앨범의 마지막을 장식하는 여섯 번째 트랙 ‘MISFITS’는 ‘어떤 것에도 속하지 않는다’는 미스피츠(msftz)란 이름의 지향점을 보여주는 작품으로, 자칫 대중에겐 낯설 수 있는 다채로운 사운드와 틀을 벗어던진 구성을 선보였다. 특히, 스스로를 ‘잡초가 아니라 연약한 꽃’이라고 말하면서도 한 편으로는 상대의 방식을 인정하며 각자의 갈 길을 가자는 가사를 통해, 서로 다른 개성을 가진 우리는 결국 모두 ‘misfits’라는 메시지를 감각적으로 녹여냈다.\r\n";
const songs = [
    'Heart',
    'Do You Feel Sad',
    '100%',
    '우물',
    '착해',
    'MISFITS'
]

const AlbumInfoTable = () => {
    const [openTitle, setOpenTitle] = React.useState(false);
    const openLinkText = openTitle ? '접기':'펼치기';
    const onClickOpenTitle = React.useCallback(()=>{
        setOpenTitle(openTitle => !openTitle)
    },[setOpenTitle]);

    return (
        <Container>
            <TableTitle text="활동정보"></TableTitle>
            {items.map(item => (
                <TableItem title={item.title} value={item.value}></TableItem>
            ))}
            <TitleContainer>
                <TableTitle text="앨범소개"></TableTitle>
                <TextBox fontSize="8px" color="yellow" onClick={onClickOpenTitle} text={openLinkText}></TextBox>
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