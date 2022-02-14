import React from 'react'
import styled, {keyframes, css} from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAppState from 'hooks/useAppState';
import useQueryLogin from 'hooks/useQueryLogin';
import useMessageBox from 'hooks/useMessageBox';
import useSessionStorage from 'hooks/useSessionStorage';
import ButtonSmall from 'Components/Common/ButtonSmall';

// const logoColor = '#03a9f4';
const logoColor = 'white';
const inputColor = 'lightgrey';
const CustomButton = styled(Button)`
  && {
    color: white;
  } 
`
const Container = styled(Box)`
  background: darkslategrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url('/images/login-background3.jpg');
  background-size: cover;
  /* background-position: left 100px center;  */
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  height: 100vh;
`
const Stack = styled(Box)`
  flex: 3;
`
const LoginFormContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* height: 100%; */
  width: 600px;
  flex: 10;
  /* margin-top: 50%; */
  /* margin-top: auto; */
  /* margin-bottom: auto; */
`
const CustomInput = styled(TextField)`
  label {
    color: ${inputColor};
  }
  label.Mui-focused {
    color: ${inputColor};
  }
  div input {
    color: white;
  }
  div input:-webkit-autofill,
  div input:-webkit-autofill:hover, 
  div input:-webkit-autofill:focus {
    /* border: 1px solid green; */
    -webkit-text-fill-color: grey;
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  && div.MuiInputBase-root fieldset {
    border-color: ${inputColor};
  }
  && div.Mui-focused fieldset{
    border-color: ${inputColor};
    border-width: 2px;
  }
`;
const Logo = styled(Box)`
  position: absolute;
  font-size: 8em;
  transform: translate(0%, -100%);
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`
const LogoOuter = styled(Logo)`
  color: transparent;
  -webkit-text-stroke: 2px ${logoColor};
`
const animate = keyframes`
	0%,
	100% {
		clip-path: polygon(
			0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%,
      84% 59%, 100% 52%, 100% 100%, 0% 100%
		);
	}

	50% {
		clip-path: polygon(
			0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%,
			84% 45%, 100% 46%, 100% 100%, 0% 100%
		);
	}
`
const LogoInner = styled(Logo)`
  color: ${logoColor};
  animation: ${animate} 3s ease-in-out infinite;
`

const Login = () => {
  const [userId, setUserId] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const {saveLoginId, saveLoginSession} = useAppState();
  const [storedId, storeInSessionStorage] = useSessionStorage('login', '');

  React.useEffect(() => {
    if(storedId !== ''){
      saveLoginId(storedId);
    }
  },[storedId, saveLoginId])
  const {showMessageBox} = useMessageBox()
  const {refetch} = useQueryLogin(userId, password);
  const onBlurId = React.useCallback(event => {
    setUserId(event.target.value)
  },[])
  const onBlurPassword = React.useCallback(event => {
    setPassword(event.target.value)
  },[])
  const onClickLogin = React.useCallback(() => {
    refetch()
    .then(result => {
      const authenticated = result.data;
      if(authenticated){
        saveLoginId(userId)
        storeInSessionStorage(userId);
      } else {
        showMessageBox('아이디/암호를 확인해주시기 바랍니다.', 1000, 'error')
      }
      
    })
  },[userId, refetch, saveLoginId, storeInSessionStorage, showMessageBox])
  return (
    <Container>
      <LogoOuter> MUSICBANK </LogoOuter>
      <LogoInner> MUSICBANK </LogoInner>
      <Stack></Stack>
      <LoginFormContainer>
        <CustomInput onBlur={onBlurId} label="ID" size="small" autoFocus ></CustomInput>
        <CustomInput onBlur={onBlurPassword} label="PASSWORD" size="small" type="password" ></CustomInput>
        <Box>
          <CustomButton onClick={onClickLogin} background={"darkslategrey"}  fontSize="12px" hoverBackground="grey" >로그인</CustomButton>
        </Box>
      </LoginFormContainer>
      <Box mt="auto" mb="30px" sx={{fontSize:'13px', opacity:'0.5'}}>
        Copyright@ 2022 SBS. All Rights Reserved
      </Box>
    </Container>
  )
}

export default React.memo(Login);

