import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    TextField, Button, Container, Typography, Grid, Box
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";

const Addproducts = ({selectedProduct, onSave}) => {
    const {id} = useParams();
    const [product, setProduct] = useState({
        product_name: "",
        product_image: null,
        main_ingredient: [""],
        shapes: [""],
        expansion_process: [""],
        cooking_after_image: null,
        cooking_before_image: null,
        technical_infos: [""],
        product_title: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else if (id) {
            axios.get(`https://valin-backend.onrender.com/api/product/${id}`)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                });
        }
    }, [id , selectedProduct]);

    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({...product, [field]: file});
        }
    };

    // const handleFileChange = (e, field) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProduct({...product, [field]: URL.createObjectURL(file)}); // Create object URL
    //     }
    // };

    const handleArrayChange = (e, field) => {
        setProduct({...product, [field]: e.target.value.split(",")});
    };

    const handleTechnicalInfoChange = (index, field, value) => {
        const updatedTechnicalInfos = [...product.technical_infos];
        updatedTechnicalInfos[index] = {...updatedTechnicalInfos[index], [field]: value};
        setProduct({...product, technical_infos: updatedTechnicalInfos});
    };

    const addTechnicalInfo = () => {
        setProduct({
            ...product,
            technical_infos: [...product.technical_infos, {name: "", value: ""}],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("product_name", product.product_name);
        formData.append("product_image", product.product_image);
        formData.append("main_ingredient", JSON.stringify(product.main_ingredient));
        formData.append("shapes", JSON.stringify(product.shapes));
        formData.append("expansion_process", JSON.stringify(product.expansion_process));
        formData.append("cooking_after_image", product.cooking_after_image);
        formData.append("cooking_before_image", product.cooking_before_image);
        formData.append("product_title", product.product_title);


        formData.append("technical_infos", JSON.stringify(product.technical_infos));

        try {
            if (id) {
                await axios.put(`https://valin-backend.onrender.com/api/product/${id}`, formData, {
                    headers: {"Content-Type": "multipart/form-data"}
                });
                navigate("/");

            } else {
                await axios.post("https://valin-backend.onrender.com/api/product", formData, {
                    headers: {"Content-Type": "multipart/form-data"}
                });
                navigate("/")

            }
            onSave();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <Box sx={{py: 5, height: "100vh"}}>
            <Container maxWidth="lg" sx={{background: "#f9f9f9", borderRadius: 4, boxShadow: 8, p: 4}}>
                <Typography variant="h4" sx={{fontWeight: "bold", textAlign: "center", mb: 4, color: "#2B545A"}}>
                    {id ? "Edit Product" : "Add New Product"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Product Name:</Typography>
                            <TextField fullWidth variant="outlined" name="product_name" value={product.product_name}
                                       onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Main Ingredient:</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Comma separated values"
                                       name="main_ingredient" value={product.main_ingredient}
                                       onChange={(e) => handleArrayChange(e, "main_ingredient")}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Shapes:</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Comma separated values" name="shapes"
                                       value={product.shapes} onChange={(e) => handleArrayChange(e, "shapes")}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Expansion Process:</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Comma separated values"
                                       name="expansion_process"
                                       value={product.expansion_process}
                                       onChange={(e) => handleArrayChange(e, "expansion_process")}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Product Title:</Typography>
                            <TextField fullWidth variant="outlined" name="product_title" value={product.product_title}
                                       onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Technical Infos:</Typography>
                            {product.technical_infos.map((info, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={5}>
                                        <TextField fullWidth label="Name" value={info.name} InputLabelProps={{ shrink: true }}
                                                   onChange={(e) => handleTechnicalInfoChange(index, "name", e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField fullWidth label="Value" type="number" value={info.value} InputLabelProps={{ shrink: true }}
                                                   onChange={(e) => handleTechnicalInfoChange(index, "value", e.target.value)}/>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button variant="outlined" onClick={addTechnicalInfo}
                                    sx={{mt: 2, backgroundColor: "#244E54", color: "white"}}>Add Technical Info</Button>
                        </Grid>
                        {/* File Upload Fields */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{fontWeight: "bold", color: "#2B545A"}}>Upload Product
                                Image:</Typography>
                            <Box
                                sx={{
                                    border: "2px dashed #2B545A",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    backgroundColor: "#f3f3f3",
                                    cursor: "pointer",
                                    "&:hover": {backgroundColor: "#e0e0e0"},
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "150px",
                                }}
                                onClick={() => document.getElementById("productImageInput").click()}
                            >
                                {product.product_image ? (
                                    <img src={product.product_image} alt="Preview" style={{
                                        width: "365px",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}/>
                                ) : (
                                    <Typography sx={{color: "#2B545A"}}>Drag and drop files here or click to
                                        browse</Typography>
                                )}
                                <input type="file" id="productImageInput" hidden
                                       onChange={(e) => handleFileChange(e, "product_image")}/>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{fontWeight: "bold", color: "#2B545A"}}>Cooking Before
                                Image:</Typography>
                            <Box
                                sx={{
                                    border: "2px dashed #2B545A",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    backgroundColor: "#f3f3f3",
                                    cursor: "pointer",
                                    "&:hover": {backgroundColor: "#e0e0e0"},
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "150px",
                                }}
                                onClick={() => document.getElementById("cookingBeforeImageInput").click()}
                            >
                                {product.cooking_before_image ? (
                                    <img src={product.cooking_before_image} alt="Preview" style={{
                                        width: "365px",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}/>
                                ) : (
                                    <Typography sx={{color: "#2B545A"}}>Drag and drop files here or click to
                                        browse</Typography>
                                )}
                                <input type="file" id="cookingBeforeImageInput" hidden
                                       onChange={(e) => handleFileChange(e, "cooking_before_image")}/>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{fontWeight: "bold", color: "#2B545A"}}>Cooking After
                                Image:</Typography>
                            <Box
                                sx={{
                                    border: "2px dashed #2B545A",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    backgroundColor: "#f3f3f3",
                                    cursor: "pointer",
                                    "&:hover": {backgroundColor: "#e0e0e0"},
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "150px",
                                }}
                                onClick={() => document.getElementById("cookingAfterImageInput").click()}
                            >
                                {product.cooking_after_image ? (
                                    <img src={product.cooking_after_image} alt="Preview" style={{
                                        width: "365px",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}/>
                                ) : (
                                    <Typography sx={{color: "#2B545A"}}>Drag and drop files here or click to
                                        browse</Typography>
                                )}
                                <input type="file" id="cookingAfterImageInput" hidden
                                       onChange={(e) => handleFileChange(e, "cooking_after_image")}/>
                            </Box>
                        </Grid>


                    </Grid>

                    <Box sx={{textAlign: "center", mt: 4}}>
                        <Button type="submit" variant="contained"
                                sx={{backgroundColor: "#244E54"}}>
                            {id ? "Update Product" : "Add Product"}
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default Addproducts;
