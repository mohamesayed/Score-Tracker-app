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
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';

const GameHistory = ({ history, onDeleteHistory }) => {
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
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Game History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
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
                  >
                    <DeleteIcon />
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