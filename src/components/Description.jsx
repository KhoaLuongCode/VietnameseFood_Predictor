import {useRef} from 'react';
import {Box, Grid, Tooltip, Typography} from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                position: 'absolute',
                paddingTop: '400px',
                left: '50%'}}
            onClick={onClick}
        >

            <Tooltip title="Forward">
                <ArrowForwardIcon fontSize="large" />
            </Tooltip>

        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                position: 'absolute',
                zIndex: '1',
                paddingTop: '400px',
                left: '46%',
            }}
            onClick={onClick}
        >
            <Tooltip title="Back">
                <ArrowBackIcon fontSize="large" />
            </Tooltip>
        </div>
    );
}

function Description() {

    const sliderRef = useRef();

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024, // for devices with width less than 1024px
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600, // for devices with width less than 600px
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };

    const imageStyle = {
      width: '450px',
      height: '300px',
      borderRadius: '10px',
    };

    const slideStyle = {
      boxSizing: 'border-box',
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

      return (
        <Grid container sx={{paddingLeft: '70px', paddingRight: '70px', paddingTop: '20px'}}>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
              What is this application?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              A Machine Learning Prediction model that can predict your favorite Vietnamese food using a synthetic dataset created by Khoa Luong. The model uses a Decision Tree Classification Model to predict your Vietnamese food. Enjoy! Tech: Sklearn ML Framework Python, FastAPI backend Python, ReactJS Frontend (d3.JS, MUI)
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{paddingTop: '10px', fontWeight: 'bold'}}>
              Our database of Vietnamese food
            </Typography>
          </Grid>



          <Grid item xs={12}>
            <Slider ref={sliderRef} {...settings} >
                <Box display="flex" alignItems="center">
                    <Box flexShrink={0}>
                        <img
                            src="/Banh Bao.jpeg"
                            alt="Banh Bao"
                            style={imageStyle}
                        />
                    </Box>

                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Banh Bao
                        </Typography>
                    </Box>
                </Box>


                <Box sx={slideStyle}>
                    <img src="/Banh Canh.jpeg" alt="Banh Canh" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Banh Canh
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Banh Cuon.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Banh Cuon
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Banh My.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Banh My
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Banh Tom.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Banh Tom
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Banh Trang Tron.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Banh Bao
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Banh Xeo.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Banh Xeo
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Bun Bo Hue.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Bun Bo Hue
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Bun Bo Nam Bo.webp" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Bun Bo Nam Bo
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Bun Cha.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Bun Cha
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Bun Moc.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Bun Moc
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Bun Rieu.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Bun Rieu
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Bun Thit Nuong.webp" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Bun Thit Nuong
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Ca Phe Sua Da.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Ca Phe Sua Da
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Cha Gio.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Cha Gio
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Che .jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Che
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Cao Lau.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Cao Lau
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Com Tam.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Com Tam
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Goi Cuon.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold'}}>
                            Goi Cuon
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Goi Xoai.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold'  }}>
                            Goi Xoai
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Hu Tieu.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Hu Tieu
                        </Typography>
                    </Box>
                </Box>

                <Box sx={slideStyle}>
                    <img src="/Hu Tieu Nam Vang.jpeg" alt="Banh Bao" style={imageStyle}/>
                    <Box sx={{paddingTop: '5px'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Hu Tieu Nam Vang
                        </Typography>
                    </Box>
                </Box>

            </Slider>

          </Grid>

        </Grid>
      );
}

export default Description;
