import {useRef, useState} from 'react';
import {ThemeProvider, Box, Button, Grid} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Selection from './components/Selection';
import Description from './components/Description';
import Header from './components/Header';
import Mindmap from './components/Mindmap';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: ['Quicksand'].join(','),
  }
});

function App() {
  const sectionTwoRef = useRef(null);
  const mindmapRef = useRef(null);
  const [selectedDish, setSelectedDish] = useState(null);



  const scrollToSectionTwo = () => {
    const offset = 30;
    const sectionTop = sectionTwoRef.current.offsetTop;
    window.scrollTo({ top: sectionTop - offset, behavior: 'smooth' });
  };

  const updateDishAndScroll = (dishName) => {
        setSelectedDish(dishName);
        mindmapRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }



  return (

    <ThemeProvider theme={theme}>
      <div>
        <Header />
        {/* First Section */}
        <Box sx={{height: '100vh', position: 'relative'}}>
          <Description/>
          <Grid container spacing={2} justifyContent="center">
              <Grid item xs={8}>
                  <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: '60px'}}>
                        <Button
                            onClick={scrollToSectionTwo}
                            sx={{
                              position: 'relative',
                              justifyContent: "center",
                              backgroundColor: 'white',
                              border: '1px solid black',
                              color: 'black',
                              padding: '10px 0',
                              width: '60%',
                              borderRadius: '20px',
                              fontWeight: 'bold',
                              fontFamily: 'Quicksand',
                            }}
                        >
                           Predict your Vietnamese Food
                        </Button>
                   </Box>
              </Grid>
          </Grid>
        </Box>

        {/* Second Section */}
        <Box ref={sectionTwoRef} sx={{ height: '100vh', marginTop: '-50px' }}>
          <Selection updateDishAndScroll={updateDishAndScroll} mindmapRef={mindmapRef} />
            <div ref={mindmapRef}>
                {selectedDish && <Mindmap dishname={selectedDish} />}
            </div>
        </Box>

      </div>
    </ThemeProvider>
  );
}

export default App;
