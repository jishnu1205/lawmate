import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Container, Chip, Grid, Zoom, Fade } from '@mui/material';
import { getLegalAdvice } from '../services/geminiService';

const ChatInterface = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);

  const exampleQuestions = [
    "What are the steps to file for divorce?",
    "How do I register a trademark for my business?",
    "What should I do if I receive a traffic ticket?",
    "How do I create a basic will?",
    "What are my rights as a tenant?",
    "How do I start an LLC?"
  ];

  const handleExampleClick = (q) => {
    setQuestion(q);
    setCurrentTopic(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const answer = await getLegalAdvice(question, currentTopic ? chatHistory : []);
      
      // Update chat history
      const newMessage = {
        question,
        answer,
        timestamp: new Date().toISOString()
      };
      
      if (!currentTopic) {
        // New topic
        setCurrentTopic(question);
        setChatHistory([newMessage]);
      } else {
        // Existing topic
        setChatHistory([...chatHistory, newMessage]);
      }
      
      setResponse(answer);
      setQuestion('');
    } catch (error) {
      console.error('Error details:', error);
      setResponse(`Error: ${error.message || 'An unexpected error occurred. Please check your API key and try again.'}`);
    }
    setLoading(false);
  };

  const handleNewTopic = () => {
    setCurrentTopic(null);
    setChatHistory([]);
    setResponse('');
    setQuestion('');
  };

  const formatResponse = (text) => {
    if (!text) return null;

    const sections = text.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('Title:')) {
        return (
          <Fade in timeout={500}>
            <Typography key={index} variant="h4" gutterBottom 
              sx={{ 
                color: '#2c3e50',
                mt: 2, 
                fontWeight: 'bold',
                borderBottom: '2px solid #3498db',
                pb: 1
              }}>
              {section.replace('Title:', '').trim()}
            </Typography>
          </Fade>
        );
      } else if (section.startsWith('Prerequisites:')) {
        return (
          <Zoom in timeout={500}>
            <Box key={index} sx={{ 
              my: 3, 
              p: 2, 
              borderLeft: '4px solid #3498db',
              bgcolor: '#f8f9fa'
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#2980b9', fontWeight: 'bold' }}>
                Prerequisites
              </Typography>
              <Typography variant="body1" component="div" sx={{ pl: 2 }}>
                {section.replace('Prerequisites:', '').split('\n').map((item, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>{item}</div>
                ))}
              </Typography>
            </Box>
          </Zoom>
        );
      } else if (section.includes('Step-by-Step Guide:')) {
        return (
          <Fade in timeout={700}>
            <Box key={index} sx={{ 
              my: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#16a085', fontWeight: 'bold' }}>
                Step-by-Step Guide
              </Typography>
              <Box sx={{ pl: 2 }}>
                {section.replace('Step-by-Step Guide:', '').split('\n').map((step, i) => {
                  if (step.startsWith('Step')) {
                    return (
                      <Typography key={i} variant="body1" sx={{ 
                        mb: 2,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: '#f0f9ff',
                        fontWeight: 'bold'
                      }}>
                        {step}
                      </Typography>
                    );
                  } else if (step.startsWith('•')) {
                    return (
                      <Typography key={i} variant="body1" sx={{ 
                        mb: 1,
                        pl: 3,
                        position: 'relative',
                        '&::before': {
                          content: '"•"',
                          position: 'absolute',
                          left: '8px',
                          color: '#16a085'
                        }
                      }}>
                        {step.replace('•', '').trim()}
                      </Typography>
                    );
                  } else if (step.trim()) {
                    return (
                      <Typography key={i} variant="body1" sx={{ 
                        mb: 1,
                        pl: 3
                      }}>
                        {step}
                      </Typography>
                    );
                  }
                  return null;
                })}
              </Box>
            </Box>
          </Fade>
        );
      } else if (section.startsWith('Important Information:')) {
        return (
          <Zoom in timeout={900}>
            <Box key={index} sx={{ 
              my: 3, 
              bgcolor: '#fff3e0', 
              p: 2, 
              borderRadius: 2,
              border: '1px solid #ffb74d'
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#e67e22', fontWeight: 'bold' }}>
                Important Information
              </Typography>
              <Typography variant="body1" component="div">
                {section.replace('Important Information:', '').split('\n').map((item, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>
                    {item.includes(':') ? (
                      <>
                        <strong style={{ color: '#d35400' }}>{item.split(':')[0]}:</strong>
                        {item.split(':')[1]}
                      </>
                    ) : item}
                  </div>
                ))}
              </Typography>
            </Box>
          </Zoom>
        );
      } else if (section.startsWith('Additional Resources:')) {
        return (
          <Fade in timeout={1100}>
            <Box key={index} sx={{ 
              my: 3, 
              bgcolor: '#e8f5e9', 
              p: 2, 
              borderRadius: 2,
              border: '1px solid #81c784'
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                Additional Resources
              </Typography>
              <Typography variant="body1" component="div">
                {section.replace('Additional Resources:', '').split('\n').map((item, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>{item}</div>
                ))}
              </Typography>
            </Box>
          </Fade>
        );
      }
      return (
        <Typography key={index} variant="body1" paragraph>
          {section}
        </Typography>
      );
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ 
          p: 3,
          bgcolor: '#ffffff',
          borderRadius: 2
        }}>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: '#2c3e50',
            textAlign: 'center',
            mb: 3
          }}>
            Ask Your Legal Question
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#34495e', mb: 2 }}>
              Example Questions:
            </Typography>
            <Grid container spacing={1}>
              {exampleQuestions.map((q, index) => (
                <Grid item key={index}>
                  <Chip
                    label={q}
                    onClick={() => handleExampleClick(q)}
                    sx={{
                      m: 0.5,
                      bgcolor: '#ecf0f1',
                      '&:hover': {
                        bgcolor: '#bdc3c7',
                      },
                      cursor: 'pointer'
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={currentTopic ? "Ask a follow-up question..." : "Type your legal question here..."}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2980b9',
                  },
                }
              }}
            />
            <Button 
              variant="contained" 
              type="submit" 
              disabled={loading || !question}
              sx={{ 
                mb: 2,
                bgcolor: '#3498db',
                '&:hover': {
                  bgcolor: '#2980b9',
                },
                width: '100%',
                py: 1.5
              }}
            >
              {loading ? 'Getting Answer...' : currentTopic ? 'Ask Follow-up Question' : 'Get Legal Advice'}
            </Button>
          </form>
          
          {chatHistory.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#34495e' }}>
                Conversation History:
              </Typography>
              {chatHistory.map((chat, index) => (
                <Paper 
                  key={index} 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    mb: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    Q: {chat.question}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {formatResponse(chat.answer)}
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
          
          {response && !chatHistory.length && (
            <Fade in timeout={500}>
              <Paper elevation={1} sx={{ 
                p: 3, 
                mt: 2,
                bgcolor: '#f8f9fa',
                borderRadius: 2
              }}>
                {formatResponse(response)}
              </Paper>
            </Fade>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ChatInterface;