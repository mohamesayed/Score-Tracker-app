import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Alert, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import PlayerForm from './components/PlayerForm';
import ScoreBoard from './components/ScoreBoard';
import GameSettings from './components/GameSettings';
import Timer from './components/Timer';
import GameHistory from './components/GameHistory';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState('');
  const [scoringRule, setScoringRule] = useState('highest');
  const [message, setMessage] = useState('');
  const [gameHistory, setGameHistory] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Load all data from localStorage on initial render
  useEffect(() => {
    const loadSavedData = () => {
      const savedGame = localStorage.getItem('scoreTrackerGame');
      const savedHistory = localStorage.getItem('scoreTrackerHistory');
      const savedSettings = localStorage.getItem('scoreTrackerSettings');
      
      if (savedGame) {
        const { players: savedPlayers, rounds: savedRounds } = JSON.parse(savedGame);
        setPlayers(savedPlayers);
        setRounds(savedRounds);
      }
      
      if (savedHistory) {
        setGameHistory(JSON.parse(savedHistory));
      }

      if (savedSettings) {
        const { scoringRule: savedRule } = JSON.parse(savedSettings);
        setScoringRule(savedRule);
      }
    };

    loadSavedData();
  }, []);

  // Save game state whenever it changes
  useEffect(() => {
    if (players.length > 0) {
      const gameData = {
        players,
        rounds,
      };
      localStorage.setItem('scoreTrackerGame', JSON.stringify(gameData));
    }
  }, [players, rounds]);

  // Save settings whenever they change
  useEffect(() => {
    const settingsData = {
      scoringRule,
    };
    localStorage.setItem('scoreTrackerSettings', JSON.stringify(settingsData));
  }, [scoringRule]);

  const handleAddPlayer = (name) => {
    if (players.some((player) => player.name === name)) {
      setMessage('Player already exists!');
      return;
    }
    const newPlayers = [...players, { id: Date.now(), name, score: 0 }];
    setPlayers(newPlayers);
    setMessage('');
  };

  const handleUpdateScore = (playerId, change) => {
    const newPlayers = players.map((player) =>
      player.id === playerId
        ? { ...player, score: player.score + change }
        : player
    );
    setPlayers(newPlayers);
  };

  const handleRemovePlayer = (playerId) => {
    const newPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(newPlayers);
    // Update localStorage when player is removed
    if (newPlayers.length > 0) {
      const gameData = {
        players: newPlayers,
        rounds,
      };
      localStorage.setItem('scoreTrackerGame', JSON.stringify(gameData));
    } else {
      // If no players left, remove the game data
      localStorage.removeItem('scoreTrackerGame');
    }
  };

  const handleSetRounds = (value) => {
    setRounds(value);
  };

  const handleSetScoringRule = (rule) => {
    setScoringRule(rule);
  };

  const handleResetScores = () => {
    const newPlayers = players.map((player) => ({ ...player, score: 0 }));
    setPlayers(newPlayers);
    setMessage('Scores have been reset');
  };

  const handleSaveGame = () => {
    const gameData = {
      players,
      rounds,
      scoringRule,
      timestamp: Date.now(),
    };
    
    const newHistory = [gameData, ...gameHistory];
    setGameHistory(newHistory);
    localStorage.setItem('scoreTrackerHistory', JSON.stringify(newHistory));
    
    setMessage('Game saved successfully!');
  };

  const handleDeleteHistory = (timestamp) => {
    const newHistory = gameHistory.filter(game => game.timestamp !== timestamp);
    setGameHistory(newHistory);
    // Update localStorage when history item is deleted
    if (newHistory.length > 0) {
      localStorage.setItem('scoreTrackerHistory', JSON.stringify(newHistory));
    } else {
      // If no history left, remove the history data
      localStorage.removeItem('scoreTrackerHistory');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('scoreTrackerGame');
      localStorage.removeItem('scoreTrackerHistory');
      localStorage.removeItem('scoreTrackerSettings');
      setPlayers([]);
      setRounds('');
      setScoringRule('highest');
      setGameHistory([]);
      setMessage('All data has been cleared');
    }
  };

  const getWinningStatus = () => {
    if (players.length === 0) return null;
    
    const sortedPlayers = [...players].sort((a, b) => 
      scoringRule === 'highest' ? b.score - a.score : a.score - b.score
    );
    
    return {
      winner: sortedPlayers[0],
      isTie: sortedPlayers[0].score === sortedPlayers[1]?.score,
    };
  };

  const winningStatus = getWinningStatus();

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        px: isMobile ? 1 : 3,
        py: 2,
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          borderRadius: '30px',
          zIndex: -1,
        }
      }}
    >
      <Box sx={{ 
        my: 2,
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '30px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        padding: 3,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1,
        },
        '&:hover': {
          transform: 'translateY(-5px) scale(1.01)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          '&::before, &::after': {
            transform: 'scale(1.2)',
            transition: 'transform 0.5s ease',
          }
        }
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 3,
            color: 'black',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '3px',
              background: 'black',
              borderRadius: '2px',
            }
          }}
        >
          Score Tracker
        </Typography>
        
        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {winningStatus && !winningStatus.isTie && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Current Leader: {winningStatus.winner.name} with {winningStatus.winner.score} points
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab label="Current Game" />
          <Tab label="Game History" />
        </Tabs>

        {activeTab === 0 ? (
          <>
            <GameSettings
              onSetRounds={handleSetRounds}
              onSetScoringRule={handleSetScoringRule}
              onResetScores={handleResetScores}
              onSaveGame={handleSaveGame}
              onClearAllData={handleClearAllData}
            />

            <PlayerForm onAddPlayer={handleAddPlayer} />

            <ScoreBoard
              players={players}
              onUpdateScore={handleUpdateScore}
              onRemovePlayer={handleRemovePlayer}
              scoringRule={scoringRule}
            />

            <Timer />
          </>
        ) : (
          <GameHistory
            history={gameHistory}
            onDeleteHistory={handleDeleteHistory}
          />
        )}
      </Box>
    </Container>
  );
};

export default App;
