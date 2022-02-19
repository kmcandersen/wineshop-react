import React, { useState } from 'react';
import { IconButton, Slide, Snackbar, SnackbarContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Alert({ message, colorBg, colorText }) {
  const [open, setOpenState] = useState(true);

  const handleClose = () => {
    setOpenState(false);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction='up' />;
  }

  return (
    <div>
      <Snackbar
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
      >
        <SnackbarContent
          aria-describedby='message-id'
          sx={{ backgroundColor: colorBg }}
          message={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: colorText,
              }}
            >
              <InfoOutlinedIcon />
              <span id='message-id'>
                <div style={{ margin: '0 10px 0 8px' }}>{message}</div>
              </span>
              <IconButton aria-label='close' size='small' onClick={handleClose}>
                <CloseIcon sx={{ color: colorText }} />
              </IconButton>
            </div>
          }
        />
      </Snackbar>
    </div>
  );
}
