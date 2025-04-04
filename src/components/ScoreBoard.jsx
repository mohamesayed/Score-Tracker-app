import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ScoreBoard = ({ players, onUpdateScore, onRemovePlayer, scoringRule }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [manualScore, setManualScore] = useState('');

  const handleManualScoreChange = (e) => {
    const value = e.target.value;
    // Allow numbers, +, -, and spaces
    if (value === '' || /^[\d+\-\s]*$/.test(value)) {
      setManualScore(value);
    }
  };

  const handleManualScoreSubmit = (playerId) => {
    if (manualScore !== '') {
      try {
        // Remove any spaces
        const cleanScore = manualScore.replace(/\s+/g, '');
        
        // Calculate the new score
        let newScore;
        if (cleanScore.includes('+') || cleanScore.includes('-')) {
          // Handle mathematical expressions
          const parts = cleanScore.split(/([+-])/);
          newScore = parseInt(parts[0]);
          
          for (let i = 1; i < parts.length; i += 2) {
            const operator = parts[i];
            const number = parseInt(parts[i + 1]);
            if (operator === '+') newScore += number;
            if (operator === '-') newScore -= number;
          }
        } else {
          // Handle simple number
          newScore = parseInt(cleanScore);
        }

        // Update the score only if we got a valid number
        if (!isNaN(newScore)) {
          const currentPlayer = players.find(p => p.id === playerId);
          const scoreDiff = newScore - currentPlayer.score;
          onUpdateScore(playerId, scoreDiff);
        }
      } catch (error) {
        console.error('Error calculating score:', error);
      }
      setEditingPlayer(null);
      setManualScore('');
    }
  };

  const getPlayerTag = (player) => {
    if (players.length < 2) return null;
    
    const sortedPlayers = [...players].sort((a, b) => 
      scoringRule === 'highest' ? b.score - a.score : a.score - b.score
    );

    if (player.id === sortedPlayers[0].id) {
      return (
        <Tooltip title="Tag">
          <EmojiEventsIcon sx={{ color: '#FFD700' }} fontSize="small" />
        </Tooltip>
      );
    } else if (player.id === sortedPlayers[sortedPlayers.length - 1].id) {
      return (
        <Tooltip title="Bucket">
          <DeleteForeverIcon color="error" fontSize="small" />
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mb: 3,
        width: '100%',
        overflowX: 'auto',
        '& .MuiTableCell-root': {
          padding: isMobile ? 1 : 2,
          fontSize: isMobile ? '0.75rem' : '1rem',
          '& .MuiSvgIcon-root': {
            fontSize: isMobile ? '1rem' : '1.25rem'
          }
        }
      }}
    >
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell align="right">
                {editingPlayer === player.id ? (
                  <TextField
                    value={manualScore}
                    onChange={handleManualScoreChange}
                    size="small"
                    placeholder="Enter score or expression (e.g., 5+7)"
                    inputProps={{ 
                      style: { textAlign: 'right' },
                      inputMode: 'numeric',
                    }}
                    sx={{ width: isMobile ? '80px' : '120px' }}
                  />
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                    <TextField
                      type="number"
                      value={player.score}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        if (!isNaN(newValue)) {
                          onUpdateScore(player.id, newValue - player.score);
                        }
                      }}
                      size="small"
                      sx={{ width: isMobile ? 50 : 70 }}
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => onUpdateScore(player.id, -1)}
                        sx={{ p: isMobile ? 0.25 : 0.5 }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => onUpdateScore(player.id, 1)}
                        sx={{ p: isMobile ? 0.25 : 0.5 }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </TableCell>
              <TableCell align="center">
                {getPlayerTag(player)}
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                  {editingPlayer === player.id ? (
                    <IconButton
                      size={isMobile ? "small" : "medium"}
                      onClick={() => handleManualScoreSubmit(player.id)}
                      color="success"
                      sx={{ p: isMobile ? 0.25 : 0.5 }}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => {
                          setEditingPlayer(player.id);
                          setManualScore(player.score.toString());
                        }}
                        sx={{ p: isMobile ? 0.25 : 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => onRemovePlayer(player.id)}
                        color="error"
                        sx={{ p: isMobile ? 0.25 : 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard; 