import React from 'react';
import Box from '@mui/material/Box';
import useAppState from 'hooks/useAppState';

const OrderableBox = props => {
  const {setOrderBy} = useAppState();
  const [orderByDirection, setOrderByDirection] = React.useState('asc');
  const {page, orderByString, ...rest} = props;
  const handleClick = React.useCallback(() => {
      setOrderByDirection(orderByDirection => {
          return orderByDirection === 'asc' ? 'desc' : 'asc';
      })
      setOrderBy({
          page,
          orderby: `${orderByString} ${orderByDirection}`
      })
  },[setOrderBy, orderByDirection, orderByString, page])
  return (
      <Box onClick={handleClick} {...rest}>
          {props.children}
      </Box>
  )
}

export default React.memo(OrderableBox)