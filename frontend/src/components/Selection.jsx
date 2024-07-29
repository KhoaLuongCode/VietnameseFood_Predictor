import {useEffect, useRef, useState} from 'react'; // Import React and useState hook
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import {Grid, IconButton, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import '../App.css';
import { CircularProgress } from '@mui/material';
import Mindmap from './Mindmap'
import Stack from "@mui/material/Stack";
import TreeVisualization from "./Tree";

function Selection({mindmapRef}) {
    const [mainIngredient, setMainIngredient] = useState('');
    const [flavor, setFlavor] = useState('');
    const [dishType, setDishType] = useState('');
    const [mealTime, setMealTIme] = useState('');
    const [spicy, setSpicy] = useState('');
    const [vegetarian, setVegetarian] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [isBlurred, setIsBlurred] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [quote, setQuote] = useState('')
    const quotes = ["cannot have enough of", "really loves", "always craves", "absolutely adores", "never tires of", "is addicted to", "can't resist"];


    const resultsRef = useRef(null);

    useEffect(() => {
        console.log(serverResponse);
    }, [serverResponse]);

    useEffect(() => {
        const newProgress = calculateProgress();
        setProgress(newProgress);
    }, [mainIngredient, flavor, dishType, mealTime, spicy, vegetarian]);

    const handleMainIngredientChange = (event) => {
        setMainIngredient(event.target.value);
    };

    const handleFlavorChange = (event) => {
        setFlavor(event.target.value);
    };

    const handleDishTypeChange = (event) => {
        setDishType(event.target.value);
    };

    const handleMealTimeChange = (event) => {
        setMealTIme(event.target.value);
    };

    const handleSpicyChange = (event) => {
        setSpicy(event.target.value);
    };

    const handleVegetarianChange = (event) => {
        setVegetarian(event.target.value);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const calculateProgress = () => {
        let fieldsFilled = 0;
        const totalFields = 6; // Update this if you add/remove fields
        if (mainIngredient) fieldsFilled++;
        if (flavor) fieldsFilled++;
        if (dishType) fieldsFilled++;
        if (mealTime) fieldsFilled++;
        if (spicy) fieldsFilled++;
        if (vegetarian) fieldsFilled++;

        return Math.round((fieldsFilled / totalFields) * 100);
    };

    const handleOpenNameModal = () => {
        setIsNameModalOpen(true);
    };

    // Function to handle closing the name modal
    const handleCloseNameModal = () => {
        setIsNameModalOpen(false);
    };

    // Function to handle sending data to server
    const handleSendData = async () => {
        handleCloseNameModal();
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
        try {
            // Await the completion of sendDataToServer function
            await sendDataToServer();
            console.log(serverResponse)
            // Handle successful completion (if any additional actions are needed)
            console.log('Data sent successfully');
        } catch (error) {
            // Handle any errors that occur during the execution
            console.error('Error sending data:', error);
        }
    };

    const mainBoxStyle = {
        border: '1px solid black',
        padding: '60px',
        borderRadius: '20px',
        backgroundSize: 'cover',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };

    const mainTypographyStyle = {
        fontFamily: 'Quicksand',
        fontSize: '28px',
        fontWeight: 'bold',
        justifyContent: 'center',
        display: 'flex',
        paddingTop:'10px',
        paddingBottom:'10px',
    };


    const foodImageMapping = {
      "Banh Bao": "/static/photos/Banh Bao.jpeg",
      "Banh Canh": "/static/photos/Banh Canh.jpeg",
      "Banh Cuon": "/static/photos/Banh Cuon.jpeg",
      "Banh Mi": "/static/photos/Banh My.jpeg",
      "Banh Tom": "/static/photos/Banh Tom.jpeg",
      "Banh Trang Tron": "/static/photos/Banh Trang Tron.jpeg",
      "Banh Xeo": "/static/photos/Banh Xeo.jpeg",
      "Bun Bo Hue": "/static/photos/Bun Bo Hue.jpeg",
      "Bun Bo Nam Bo": "/static/photos/Bun Bo Nam Bo.webp",
      "Bun Cha": "/static/photos/Bun Cha.jpeg",
      "Bun Moc": "/static/photos/Bun Moc.jpeg",
      "Bun Rieu": "/static/photos/Bun Rieu.jpeg",
      "Bun Thit Nuong": "/static/photos/Bun Thit Nuong.webp",
      "Ca Phe Sua Da": "/static/photos/Ca Phe Sua Da.jpeg",
      "Cha Gio": "/static/photos/Cha Gio.jpeg",
      "Cao Lau": "/static/photos/Cao Lau.jpeg",
      "Che": "/static/photos/Che .jpeg",
      "Com Tam": "/static/photos/Com Tam.jpeg",
      "Goi Cuon": "/static/photos/Goi Cuon.jpeg",
      "Goi Xoai": "/static/photos/Goi Xoai.jpeg",
      "Hu Tieu": "/static/photos/Hu Tieu.jpeg",
      "Hu Tieu Nam Vang": "/static/photos/Hu Tieu Nam Vang.jpeg",
      "Lau Viet Nam": "/static/photos/Lau Viet Nam.jpeg",
      "My Quang": "/static/photos/My Quang.jpeg",
      "Nem Nuong": "/static/photos/Nem Nuong.jpeg",
      "Pho": "/static/photos/Pho.jpeg",
      "Non La": "/static/photos/Non La.png",
    };


    useEffect(() => {
        if (serverResponse && mindmapRef.current) {
            setTimeout(() => {
                mindmapRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
            }, 500); // Adjust the delay as needed
        }
    }, [serverResponse, mindmapRef]);

    const getRandomQuote = () => {
        return quotes[Math.floor(Math.random() * quotes.length)];
    };


    const sendDataToServer = async () => {

        setLoading(true)
        setServerResponse('');
        setIsBlurred(true)

        try {
            const response = await fetch(`/predict`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MainIngredient: mainIngredient,
                    Flavor: flavor,
                    DishType: dishType,
                    MealTime: mealTime,
                    Spicy: spicy,
                    Vegetarian: vegetarian
                })
            });
            const data = await response.json(); // Assuming the response is in JSON format

            setTimeout(() => {
                setLoading(false);
                if (data && data.prediction !== undefined) {
                    setServerResponse(data.prediction.toString()); // Convert to string if necessary

                    if(resultsRef.current){
                        resultsRef.current.scrollIntoView({behavior: 'smooth', block: 'nearest'})
                    }

                } else {
                    setServerResponse('No prediction received');
                }
            }, 2000); // Delay for 2 seconds (you can adjust this value)

            window.scrollTo()

        }
        catch {
            console.log("Error")
            setServerResponse('Error in fetching data');
        }
    }

    return (
        <Box >
            <Box sx={{paddingLeft: '70px', paddingRight: '70px', fontFamily: 'QuickSand', marginTop: '-50px'}}>
                <Grid item xs={12} sx={{marginTop: '-50px'}}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{display: 'flex', opacity: 0, alignItems: 'center'}}>
                            <Typography variant="body1" sx={{marginRight: '20px'}}>
                                Progress: {`${calculateProgress()}%`}
                            </Typography>
                            <CircularProgress
                                variant="determinate"
                                value={calculateProgress()}
                                size={30}
                                color="success"
                                sx={{
                                    paddingBottom: '10px',
                                    '& .MuiCircularProgress-circle': {
                                        transition: 'stroke-dashoffset 1s ease'
                                    },
                                }}
                            />
                        </Box>

                        <Typography variant="h4" sx={{
                            fontWeight: 'bold',
                            paddingBottom: '10px',
                            textAlign: 'center',
                            flexGrow: 1,
                        }}>
                            Your <span style={{color: '#B22B27'}}>Vietnamese</span> Food Predictor
                        </Typography>

                        {/* Actual visible progress */}
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant="body1" sx={{marginRight: '20px'}}>
                                Progress: {`${calculateProgress()}%`}
                            </Typography>
                            <CircularProgress
                                variant="determinate"
                                value={calculateProgress()}
                                size={30}
                                color="success"
                                sx={{
                                    paddingBottom: '10px',
                                    color: progress < 100 ? 'grey' : '#4CAF50',
                                    transition: 'color 1s ease',
                                    '& .MuiCircularProgress-circle': {
                                        transition: 'stroke-dashoffset 1s ease'
                                    },
                                }}
                            />
                        </Box>
                    </Stack>
                </Grid>


                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box sx={{...mainBoxStyle}}>
                            <img src="/static/photos/MainIngredient.png" alt="Main Ingredient" style={{width: '100px', height: '130px', justifyContent:'center', display:'flex'}}/>
                            <Typography sx={{...mainTypographyStyle}}>
                                Main Ingredient
                            </Typography>
                            <Select
                                value={mainIngredient}
                                variant="outlined"
                                onChange={handleMainIngredientChange}
                                displayEmpty
                                fullWidth
                                sx={{border: "1px solid black", borderRadius: '20px'}}
                            >
                                <MenuItem value="" disabled>
                                    main ingredients... hmm?
                                </MenuItem>
                                <MenuItem value="Various">Various</MenuItem>
                                <MenuItem value="Seafood">Seafood</MenuItem>
                                <MenuItem value="Beef">Beef</MenuItem>
                                <MenuItem value="Chicken">Chicken</MenuItem>
                                <MenuItem value="Pork">Pork</MenuItem>
                                <MenuItem value="Shrimp">Shrimp</MenuItem>
                                <MenuItem value="Mango">Mango</MenuItem>
                                <MenuItem value="Coffee">Coffee</MenuItem>
                                <MenuItem value="Vegetables">Vegetables</MenuItem>
                            </Select>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{...mainBoxStyle}}>
                            <img src="/static/photos/vietnam-drip.png" alt="Rice Dish"
                                 style={{width: '100px', height: '130px', justifyContent: 'center', display: 'flex'}}/>
                            <Typography sx={{...mainTypographyStyle}}> Flavor
                            </Typography>
                            <Select
                                value={flavor}
                                variant="outlined"
                                onChange={handleFlavorChange}
                                displayEmpty
                                fullWidth
                                sx={{border: "1px solid black", borderRadius: '20px'}}
                            >
                                <MenuItem value="" disabled>
                                    are you a sweet lover?
                                </MenuItem>
                                <MenuItem value="Savory">Savory</MenuItem>
                                <MenuItem value="Sweet">Sweet</MenuItem>
                                <MenuItem value="Fresh">Fresh</MenuItem>
                                <MenuItem value="Bitter">Bitter</MenuItem>
                                <MenuItem value="Spicy">Spicy</MenuItem>
                                <MenuItem value="Sour">Sour</MenuItem>
                                <MenuItem value="Herbal">Herbal</MenuItem>
                                <MenuItem value="Spicy/Savory">Spicy/Savory</MenuItem>
                                <MenuItem value="Sweet/Sour">Sweet/Sour</MenuItem>
                                <MenuItem value="Savory/Sweet">Savory/Sweet</MenuItem>
                                <MenuItem value="Savory/Sour">Savory/Sour</MenuItem>
                            </Select>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{...mainBoxStyle}}>
                            <img src="/static/photos/rice.png" alt="Rice Dish"
                                 style={{width: '100px', height: '130px', justifyContent: 'center', display: 'flex', paddingTop: '20px'}}/>
                            <Typography sx={{...mainTypographyStyle}}> Dish Type
                            </Typography>
                            <Select
                                value={dishType}
                                variant="outlined"
                                onChange={handleDishTypeChange}
                                displayEmpty
                                fullWidth
                                sx={{mb: '20px', border: "1px solid black", borderRadius: '20px'}}
                            >
                                <MenuItem value="" disabled>
                                    what dish are you craving?
                                </MenuItem>
                                <MenuItem value="Noodles">Noodles</MenuItem>
                                <MenuItem value="Sandwich">Sandwich</MenuItem>
                                <MenuItem value="Roll">Roll</MenuItem>
                                <MenuItem value="Rice Dish">Rice dish</MenuItem>
                                <MenuItem value="Dessert">Dessert</MenuItem>
                                <MenuItem value="Dumpling">Dumpling</MenuItem>
                                <MenuItem value="Fritter">Fritter</MenuItem>
                                <MenuItem value="Hot Pot">Hot pot</MenuItem>
                                <MenuItem value="Grilled">Grilled</MenuItem>
                                <MenuItem value="Pancakes">Pancakes</MenuItem>
                                <MenuItem value="Salad">Salad</MenuItem>
                                <MenuItem value="Snack">Snack</MenuItem>
                                <MenuItem value="Crepes">Crepes</MenuItem>
                                <MenuItem value="Drink">Drinks</MenuItem>
                            </Select>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{marginY: '16px'}}/>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box sx={{...mainBoxStyle}}>
                            <img src="/static/photos/goi-cuon.png" alt="Rice Dish"
                                 style={{width: '100px', height: '130px', justifyContent: 'center', display: 'flex'}}/>
                            <Typography sx={{...mainTypographyStyle}}> Dinner, Lunch?
                            </Typography>
                            <Select
                                value={mealTime}
                                variant="outlined"
                                onChange={handleMealTimeChange}
                                displayEmpty
                                fullWidth
                                sx={{mb: '20px', border: "1px solid black", borderRadius: '20px'}}
                            >
                                <MenuItem value="" disabled>
                                    did you just wake up?
                                </MenuItem>
                                <MenuItem value="Any">Any</MenuItem>
                                <MenuItem value="Lunch">Lunch</MenuItem>
                                <MenuItem value="Dinner">Dinner</MenuItem>
                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                            </Select>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{...mainBoxStyle}}>
                            <img src="/static/photos/chopstick.png" alt="Rice Dish"
                                 style={{width: '100px', height: '130px', justifyContent: 'center', display: 'flex'}}/>
                            <Typography sx={{...mainTypographyStyle}}> Spicy or not?
                            </Typography>
                            <Select
                                value={spicy}
                                variant="outlined"
                                onChange={handleSpicyChange}
                                displayEmpty
                                fullWidth
                                sx={{mb: '20px', border: "1px solid black", borderRadius: '20px'}}
                            >
                                <MenuItem value="" disabled>
                                    choose your spice level
                                </MenuItem>
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                            </Select>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{...mainBoxStyle}}>
                            <img src="/static/photos/banh-mi.png" alt="Rice Dish"
                                 style={{width: '100px', height: '130px', justifyContent: 'center', display: 'flex'}}/>
                            <Typography sx={{...mainTypographyStyle}}> Are you Vegetarian?
                            </Typography>
                            <Select
                                value={vegetarian}
                                variant="outlined"
                                onChange={handleVegetarianChange}
                                displayEmpty
                                fullWidth
                                sx={{mb: '20px', border: "1px solid black", borderRadius: '20px'}}
                            >
                                <MenuItem value="" disabled>
                                    vegetarian or non-vegetarian?
                                </MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Optional">Optional</MenuItem>
                            </Select>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={8}>
                        <Box display="flex" justifyContent="center" sx={{paddingTop: '20px'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenNameModal}
                                style={{
                                    backgroundColor: 'white',
                                    border: '1px solid black',
                                    color: 'black',
                                    width: '60%',
                                    padding: '10px 0',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    cursor: progress === 100 ? 'pointer' : 'not-allowed',
                                    position: 'relative',
                                }}
                                disabled={progress !== 100}
                            >
                                Get your comfort Viet Food
                                {progress !== 100 && (
                                    <div
                                        className="unavailable-icon"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            aria-label="Unavailable"
                                            style={{
                                                backgroundColor: 'transparent',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                        </IconButton>
                                    </div>
                                )}
                            </Button>

                            <Modal
                                open={isNameModalOpen}
                                onClose={handleCloseNameModal}
                                aria-labelledby="name-modal-title"
                                aria-describedby="name-modal-description"
                                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <Box sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    height: '180px',
                                    width: '600px',
                                    padding: '10px'
                                }}>
                                    <Typography id="name-modal-title" variant="h6" component="h2"
                                                sx={{padding: '10px', fontWeight: 'bold'}}>
                                        Last, what is your name?
                                    </Typography>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Your Name"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {"&.Mui-focused fieldset": {borderColor: 'black',}},
                                            borderRadius: '20px'
                                        }}
                                    />
                                    <Button onClick={handleSendData}
                                            sx={{color: 'black', fontWeight: 'bold'}}>Submit</Button>
                                </Box>
                            </Modal>

                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <Typography variant="h6"
                                sx={{marginTop: '20px', fontWeight: 'bold', padding: '16px', color: 'black'}}>
                        Fetching your favorite Vietnamese food...
                    </Typography>
                </div>
            )}

            {!loading && (
                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{width: '100%'}}
                      ref={resultsRef}>
                    <Grid item xs={4} sx={{transform: 'translate(8%, 20%)'}}>
                        {foodImageMapping[serverResponse] && (
                            <Box onClick={() => setIsBlurred(false)} sx={{
                                filter: isBlurred ? 'blur(5px)' : 'none',
                                cursor: isBlurred ? 'pointer' : 'default',
                            }}>
                                <img
                                    src={foodImageMapping[serverResponse]}
                                    alt={serverResponse}
                                    style={{
                                        width: '500px',
                                        height: '300px',
                                        borderRadius: '200px',
                                        top: '0',
                                        transition: 'filter 0.5s ease-in'
                                    }}
                                />
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={8} sx={{transform: 'translate(-25%)'}}>
                        <Typography
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '20px',
                                minHeight: '50vh',
                                textAlign: 'center',
                                paddingTop: '80px',
                                width: '100%',
                                margin: 'auto',
                            }}
                        >
                            {name} {quote}
                            <Typography
                                sx={{
                                    filter: isBlurred ? 'blur(5px)' : 'none',
                                    cursor: isBlurred ? 'pointer' : 'default',
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    marginTop: '-10px',
                                    transition: 'filter 0.5s ease-in'
                                }}
                                onClick={() => setIsBlurred(false)}
                            >
                                {serverResponse}
                                <Mindmap dishname={serverResponse}/>
                            </Typography>
                        </Typography>
                    </Grid>

                    <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'auto',
                            marginTop: '-250px'
                        }}

                    >
                        <Box sx={{backgroundColor: 'white'}}>
                            <Box sx={{maxWidth: '80vw', maxHeight: '60vh', backgroundColor: 'white'}}>
                                <TreeVisualization/>
                            </Box>
                            <Button onClick={handleCloseModal} sx={{
                                color: 'white',
                                justifyContent: 'center',
                                transform: 'translate(38vw, 57vh)',
                                backgroundColor: '#B22B27',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                '&:hover': {backgroundColor: '#354c7c',},
                            }}>
                                Close
                            </Button>
                        </Box>
                    </Modal>

                    <Grid container sx={{paddingLeft: '100px', marginTop: '-150px'}}>
                        <Button onClick={handleOpenModal} sx={{
                            flexDirection: 'row',
                            width: '420px',
                            height: '50px',
                            border: '1px solid black',
                            borderRadius: '20px',
                            color: 'black',
                            fontWeight: 'bold'
                        }}>
                            Wonder how your food was chosen? Click here
                        </Button>
                    </Grid>
                </Grid>
            )}

        </Box>
    );

}

export default Selection;
