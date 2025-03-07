import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

function Inquiry() {

    const [inquairy, setInquairy] = useState([]);


    useEffect(() => {
        handleSubmit()
    }, [])

    function handleSubmit() {
        axios.get("https://valin-backend.onrender.com/api/inquiry")
            .then((response) => {
                setInquairy(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleDelete(id) {
        axios.delete(`https://valin-backend.onrender.com/api/inquiry/${id}`)
            .then(() => {
                handleSubmit()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Box>
            <Box style={{padding: "2rem", backgroundColor: "#f4f6f8", minHeight: "100vh"}}>
                <Container maxWidth="xl">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{color: "#2b545a", fontWeight: "bold", textTransform: "uppercase"}}
                    >
                        Inquiry List
                    </Typography>


                    <TableContainer sx={{boxShadow: 3, borderRadius: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: "#f0f0f0"}}>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Sr No</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Image</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Product Name</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Name</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Email</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Contact No</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Subject</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Message</TableCell>
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>ProductMessage</TableCell>
                                    {/*<TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>product_id</TableCell>*/}
                                    <TableCell sx={{fontWeight: "bold", color: "#244E54"}}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inquairy.map((item, index) => (
                                    <TableRow key={item._id} sx={{"&:hover": {backgroundColor: "#f5f5f5"}}}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell sx={{
                                            height: "70px",
                                            width: "70px",
                                        }}>
                                            <img src={item.product_id.product_image} alt=""
                                                 style={{width: "100%", height: "100%", objectFit: "contain"}}/>
                                        </TableCell>
                                        <TableCell sx={{
                                            maxWidth: 100,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>{item.product_id.product_name}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>{item.subject}</TableCell>
                                        <TableCell sx={{
                                            maxWidth: 100,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>{item.message}</TableCell>
                                        <TableCell sx={{
                                            maxWidth: 100,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>{item.productMessage}</TableCell>
                                        {/*<TableCell>{item.product_id}</TableCell>*/}
                                        <TableCell>
                                            <Box sx={{display: "flex", gap: 1}}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(item._id)}
                                                    sx={{
                                                        "&:hover": {backgroundColor: "#f44336"},
                                                    }}
                                                >
                                                    <DeleteForeverIcon/>
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </Box>
    );
}

export default Inquiry;