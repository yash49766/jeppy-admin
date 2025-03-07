import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Box, Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Allproducts() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    function fetchdata() {
        axios.get("https://valin-backend.onrender.com/api/product")
            .then((response) => setProducts(response.data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchdata();
    }, [])

    function handleDelete(id) {
        axios.delete(`https://valin-backend.onrender.com/api/product/${id}`)
            .then(() => fetchdata())
            .catch((error) => console.log(error));
    }

    function handleEdit(id) {
        navigate(`/addproducts/${id}`);
    }

    return (
        <Box style={{padding: '2rem', backgroundColor: '#f4f6f8', minHeight: '100vh'}}>
            <Typography
                variant="h4"
                align="center"

                gutterBottom
                sx={{color: '#2b545a', fontWeight: 'bold', textTransform: "uppercase"}}
            >
                Product List
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'end'}}>
                <Box
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/addproducts')}
                    sx={{
                        padding: "12px 24px",
                        borderRadius: 3,
                        border: "none",
                        mb: 5,
                        background: "#2B545A",
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        "&:hover": {
                            background: "#244e54"
                        }
                    }}
                >
                    Add Product
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{boxShadow: 3, borderRadius: 2}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: '#f0f0f0'}}>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Sr No</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Product Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Product Image</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Main Ingredient</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Shapes</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Expansion Process</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Cooking AfterImage</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Cooking BeforeImage</TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    color: "#244E54",
                                    maxWidth: 150,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                            >
                                <Typography noWrap sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    fontWeight: 'bold',
                                    color: '#244E54'
                                }}>
                                    Technical Infos-Name
                                </Typography>
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    color: "#244E54",
                                    maxWidth: 80,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                            >
                                <Typography noWrap sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    fontWeight: 'bold',
                                    color: '#244E54'
                                }}>
                                    Technical Infos-Value
                                </Typography>
                            </TableCell>

                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Product Title</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#244E54'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((item, index) => (
                            <TableRow key={index + 1} sx={{'&:hover': {backgroundColor: '#f5f5f5'}}}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell sx={{
                                    maxWidth: 150,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}>
                                    <Typography noWrap sx={{overflow: "hidden", textOverflow: "ellipsis"}}>
                                        {item.product_name}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{height: "100px", width: "100px"}}>
                                    <img src={item.product_image} style={{width: "100%", height: "50%"}}/>
                                </TableCell>

                                <TableCell>
                                    {item.main_ingredient.map((ingredient, idx) => (
                                        <Typography key={idx}>{ingredient} </Typography>
                                    ))}
                                </TableCell>

                                <TableCell>
                                    {item.shapes.map((shapes, idx) => (
                                        <Typography key={idx}>{shapes} </Typography>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.expansion_process.map((expansion_process, idx) => (
                                        <Typography key={idx}>{expansion_process} </Typography>
                                    ))}
                                </TableCell>
                                <TableCell sx={{height: "100px", width: "100px"}}>
                                    <img src={item.cooking_after_image} style={{width: "100%", height: "50%"}}/>
                                </TableCell>
                                <TableCell sx={{height: "100px", width: "100px"}}>
                                    <img src={item.cooking_before_image} style={{width: "100%", height: "50%"}}/>
                                </TableCell>
                                <TableCell>
                                    {item.technical_infos.map((technical_infos, idx) => (
                                        <Box key={idx} sx={{display: "flex", width: 150, overflow: "hidden"}}>
                                            <Typography
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "100%"
                                                }}
                                            >
                                                {technical_infos.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </TableCell>

                                <TableCell>
                                    {item.technical_infos.map((technical_infos, idx) => (
                                        <Box sx={{
                                            display: "flex",
                                        }}>
                                            <Typography key={idx}>{technical_infos.value} </Typography>
                                        </Box>
                                    ))}
                                </TableCell>
                                <TableCell sx={{
                                    maxWidth: 150,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}>
                                    <Typography noWrap sx={{overflow: "hidden", textOverflow: "ellipsis"}}>
                                        {item.product_title}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleEdit(item._id)}
                                        sx={{
                                            marginRight: 1,
                                            '&:hover': {backgroundColor: 'darkgreen'},
                                        }}
                                    >
                                        <ModeEditIcon/>
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(item._id)}
                                        sx={{
                                            '&:hover': {backgroundColor: '#f44336'},
                                        }}
                                    >
                                        <DeleteForeverIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Allproducts;