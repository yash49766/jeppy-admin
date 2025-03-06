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
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Contacts() {

    const [contacts, setContacts] = useState([]);


    useEffect(() => {
    handleSubmit()
    },[])

    function handleSubmit() {
        axios.get("https://valin-backend.onrender.com/api/contact")
            .then((response) => {setContacts(response.data)})
        .catch((error) => {
            console.log(error);})
    }

    function handleDelete(id) {
        axios.delete(`https://valin-backend.onrender.com/api/contact/${id}`)
        .then(() => {handleSubmit()})
            .catch((error) => {
                console.log(error);})
    }

    return (
        <Box>
            <Box style={{ padding: "2rem", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
                <Container maxWidth="xl">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ color: "#2b545a", fontWeight: "bold", textTransform: "uppercase" }}
                    >
                        Contact List
                    </Typography>


                    <TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Sr No</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Surname</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Contact No</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Company</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Request</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Your_message</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#244E54" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contacts.map((item, index) => (
                                    <TableRow key={item._id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.surname}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>{item.company}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.request}</TableCell>
                                        <TableCell>{item.your_message}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(item._id)}
                                                    sx={{
                                                        "&:hover": { backgroundColor: "#f44336" },
                                                    }}
                                                >
                                                    <DeleteForeverIcon />
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

export default Contacts;