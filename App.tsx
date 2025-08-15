import type { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { AuthProvider } from '@/contexts';
import { useAuth } from '@/hooks/useAuth';
import theme from '@/theme';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import IPOs from '@/pages/IPOs';
import About from './pages/AboutPage';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
// Import custom auth pages
import LoginPage from '@/pages/auth/custom/LoginPage';
import SignupPage from '@/pages/auth/custom/SignupPage';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import GlobalStyles from '@/styles/GlobalStyles';


// Protected Route Component
const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return null; // or return a loading spinner
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: '1 0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ScrollToTop />
        <Container 
          maxWidth={false}
          disableGutters
          sx={{
            width: '100%',
            maxWidth: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            '& > *': {
              width: '100%',
              maxWidth: '100%',
            },
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/ipos" 
              element={
                <PrivateRoute>
                  <IPOs />
                </PrivateRoute>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App
