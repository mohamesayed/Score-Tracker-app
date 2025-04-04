import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const GameSettings = ({ onSetRounds, onSetScoringRule, onResetScores, onSaveGame, onClearAllData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mb: 3 }}>
      <Stack 
        direction={isMobile ? "column" : "row"} 
        spacing={2} 
        alignItems={isMobile ? "stretch" : "center"}
      >
        <TextField
          label="Number of Rounds"
          type="number"
          onChange={(e) => onSetRounds(e.target.value)}
          fullWidth={isMobile}
          size={isMobile ? "small" : "medium"}
          sx={{ 
            minWidth: isMobile ? '100%' : 200,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
            }
          }}
        />

        <FormControl 
          fullWidth={isMobile}
          sx={{ 
            minWidth: isMobile ? '100%' : 200,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
            }
          }}
        >
          <InputLabel>Scoring Rule</InputLabel>
          <Select
            label="Scoring Rule"
            defaultValue="highest"
            onChange={(e) => onSetScoringRule(e.target.value)}
            size={isMobile ? "small" : "medium"}
          >
            <MenuItem value="highest">Highest Score Wins</MenuItem>
            <MenuItem value="lowest">Lowest Score Wins</MenuItem>
          </Select>
        </FormControl>

        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            width: isMobile ? '100%' : 'auto',
            '& .MuiButton-root': {
              flex: isMobile ? 1 : 'auto',
              minWidth: isMobile ? 'auto' : 120,
              fontSize: isMobile ? '0.7rem' : '0.875rem',
              padding: isMobile ? '4px 8px' : '6px 16px',
              '& .MuiButton-startIcon': {
                marginRight: isMobile ? 0.25 : 0.5,
                '& .MuiSvgIcon-root': {
                  fontSize: isMobile ? '0.9rem' : '1.25rem'
                }
              }
            }
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onResetScores}
            startIcon={<RestartAltIcon />}
            size={isMobile ? "small" : "medium"}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={onSaveGame}
            startIcon={<SaveIcon />}
            size={isMobile ? "small" : "medium"}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClearAllData}
            startIcon={<DeleteForeverIcon />}
            size={isMobile ? "small" : "medium"}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GameSettings; 