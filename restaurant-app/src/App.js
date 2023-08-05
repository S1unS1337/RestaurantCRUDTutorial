import logo from './logo.svg';
import './App.css';
import { Container, Typography } from '@mui/material';
import Order from './components/Order';
import { ThemeProvider, createTheme } from "@mui/material/styles"


const theme = createTheme({
  spacing: 1
});

function App() {
  return (
    <ThemeProvider theme = {theme}>
    <Container maxWidth = "md">
        <Typography
        gutterBottom
        variant='h2'
        align='center'>
          Restaurant App
        </Typography>
        <Order />
    </Container>
    </ThemeProvider>
  );
}

export default App;
