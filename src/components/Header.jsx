import React from 'react';
import Container from '@mui/material/Container';
import {Box, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Header() {
  const headerStyle = {
    width: '100%',
    top: 0,
    left: 0,
  };
  const headerImageStyle = {
    width: '100%',
    height: '15vh',
    backgroundImage: 'url(/Header4.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
      <div style={headerStyle}>
        <div style={headerImageStyle}></div>
        <Container maxWidth="xl" style={{padding: 0}}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '20px',
            fontFamily: 'Quicksand',
            pt: '20px',
            fontWeight: 700,
            color: 'black',
            width: '100%',
          }}>
            <Typography variant="h4" style={{paddingLeft: '70px', textAlign: 'left', fontWeight: 'bold'}}>
              Vietnamese Food predictor using Machine Learning
            </Typography>

            <Typography style={{paddingRight: '70px', display: 'flex', alignItems: 'center', textAlign: 'right'}}>
              khoa luong
              <a href="https://github.com/KhoaLuongCode" target="_blank" rel="noopener noreferrer"
                 style={{textDecoration: 'none', paddingLeft: '10px'}}>
                <GitHubIcon style={{fontSize: 30, color: 'black', marginRight: '10px'}}/>
              </a>
              <a href="https://www.linkedin.com/in/khoaluongcwru/" target="_blank" rel="noopener noreferrer"
                 style={{textDecoration: 'none'}}>
                <LinkedInIcon style={{fontSize: 30, color: 'black'}}/>
              </a>
            </Typography>
          </Box>
        </Container>
      </div>
  );
}

export default Header

