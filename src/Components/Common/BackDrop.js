import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useIsFetching} from 'react-query';

const keysNoLoading = ['autocomplete', 'doListArtist'];

export default function SimpleBackdrop() {
    const [open, setOpen] = React.useState(false);
    // const isFetching = useIsFetching({predicate: query => query.queryKey[0] !== 'autocomplete'});
    const isFetching = useIsFetching({predicate: query => !keysNoLoading.includes(query.queryKey[0])});
    React.useEffect(() => {
        if(isFetching){
            setOpen(true);
            return
        }
        setOpen(false);
    },[isFetching])

    return (
        <div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        </div>
    );
}