import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';

const GameHistory = ({ history, onDeleteHistory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getWinner = (game) => {
    if (game.players.length === 0) return 'No players';
    
    const sortedPlayers = [...game.players].sort((a, b) => 
      game.scoringRule === 'highest' ? b.score - a.score : a.score - b.score
    );
    
    return `${sortedPlayers[0].name} (${sortedPlayers[0].score} points)`;
  };

  return (
    <Box sx={{ mb: 3, width: '100%', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Game History
      </Typography>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxWidth: '100%',
          '& .MuiTableCell-root': {
            padding: isMobile ? 1 : 2,
            fontSize: isMobile ? '0.75rem' : '1rem',
          }
        }}
      >
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Winner</TableCell>
              <TableCell>Rounds</TableCell>
              <TableCell>Players</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((game) => (
              <TableRow key={game.timestamp}>
                <TableCell>{formatDate(game.timestamp)}</TableCell>
                <TableCell>{getWinner(game)}</TableCell>
                <TableCell>{game.rounds || 'N/A'}</TableCell>
                <TableCell>{game.players.length}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onDeleteHistory(game.timestamp)}
                    color="error"
                    size={isMobile ? "small" : "medium"}
                  >
                    <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GameHistory; 