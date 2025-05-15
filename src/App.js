import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import ChatInterface from './components/ChatInterface';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Lawmate - Your AI Legal Assistant
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <ChatInterface />
      </Container>
    </ThemeProvider>
  );
}

export default App;
