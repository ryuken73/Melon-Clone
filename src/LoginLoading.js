import React from 'react';
import { Box } from '@mui/material';
import Login from 'Login';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`;

const imgUrl = '/images/login-background3.jpg';

const LoginLoading = () => {
    const [isImageReady, setImageReady] = React.useState(false);
    React.useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setImageReady(true)
        };
        image.src = imgUrl
    },[])
    return (
        <Container>
            {isImageReady ? 
                <Login backgroundImage={imgUrl}></Login> :
                <Box
                    fontSize="3em"
                >Redirecting Login Page.</Box>
            }
        </Container>
    )
}

export default LoginLoading
