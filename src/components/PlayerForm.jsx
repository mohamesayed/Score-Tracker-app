import React, { useState } from 'react';
import { Box, TextField, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const PlayerForm = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack 
          direction={isMobile ? "column" : "row"} 
          spacing={1} 
          alignItems={isMobile ? "stretch" : "center"}
        >
          <TextField
            label="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size={isMobile ? "small" : "medium"}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
                '&:hover': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              },
              flex: 1
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            size={isMobile ? "small" : "medium"}
            sx={{
              minWidth: isMobile ? '100%' : 160,
              height: isMobile ? '40px' : '56px',
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: 3,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              ml: isMobile ? 0 : 1,
              '& .MuiButton-startIcon': {
                marginRight: 1
              }
            }}
          >
            Add Player
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PlayerForm; 