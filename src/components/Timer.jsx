import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimerIcon from '@mui/icons-material/Timer';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (time === 0) {
      setIsEditing(true);
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsEditing(true);
  };

  const handleCustomTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomTime(value);
    }
  };

  const handleSetCustomTime = () => {
    if (customTime !== '') {
      const seconds = parseInt(customTime) * 60;
      setTime(seconds);
      setIsEditing(false);
      setCustomTime('');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Round Timer
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2,
        justifyContent: 'center'
      }}>
        {isEditing ? (
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <TextField
              label="Minutes"
              type="number"
              value={customTime}
              onChange={handleCustomTimeChange}
              inputProps={{ min: 1, max: 60 }}
              sx={{ width: { xs: '100%', sm: '120px' } }}
            />
            <Button
              variant="contained"
              onClick={handleSetCustomTime}
              startIcon={<TimerIcon />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Set Time
            </Button>
          </Stack>
        ) : (
          <>
            <Typography 
              variant="h4" 
              sx={{ 
                minWidth: '100px',
                textAlign: 'center',
                fontFamily: 'monospace'
              }}
            >
              {formatTime(time)}
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={1}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <Button
                variant="contained"
                color={isRunning ? 'secondary' : 'primary'}
                onClick={handleStartPause}
                startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleReset}
                startIcon={<RestartAltIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(true)}
                startIcon={<TimerIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Change Time
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Timer; 