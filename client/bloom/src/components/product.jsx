import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsById, updateProduct } from '../redux/slices/product';
import { fetchCategories } from '../redux/slices/categories';
import {
    Container, Grid, Typography, Button, TextField, Select, MenuItem, CircularProgress, FormControl, InputLabel, OutlinedInput, Chip
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { addToCart } from '../redux/slices/cart';

const ProductProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.currentProduct);
    const categories = useSelector(state => state.categories.categories);
    const [editMode, setEditMode] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        categories: []
    });
    const user = useSelector(state => state.auth.data);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchCategories());
        if (id) {
            dispatch(fetchProductsById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (product) {
            setUpdatedProduct({
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                categories: product.categories.map(c => c._id) // Assuming product.categories is an array of category objects
            });
        }
    }, [product]);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: parseInt(quantity, 10) }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryChange = (event) => {
        setUpdatedProduct(prevState => ({
            ...prevState,
            categories: event.target.value
        }));
    };

    const handleSubmit = async () => {
        // Filter out invalid or null category IDs
        const validCategoryIds = updatedProduct.categories.filter(categoryId => 
            categoryId != null && typeof categoryId === 'string'
        );
    
        const updatedData = {
            ...updatedProduct,
            categories: validCategoryIds
        };
    
        try {
            console.log('Updating product with data:', updatedData); // Debugging log
            await dispatch(updateProduct({ id, updatedData }));
            setEditMode(false);
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };
    
    

    if (!product) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: '4vh' }}>
            <Grid container spacing={4}>
                <Grid item md={6}>
                    {editMode ? (
                        <TextField
                            fullWidth
                            label="Image URL"
                            name="imageUrl"
                            value={updatedProduct.imageUrl}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
                    )}
                </Grid>
                <Grid item md={6}>
                    {editMode ? (
                        <>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={updatedProduct.description}
                                onChange={handleInputChange}
                                margin="normal"
                                multiline
                            />
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="category-select-label">Категории</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    multiple
                                    value={updatedProduct.categories}
                                    onChange={handleCategoryChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Категории" />}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => {
                                                const category = categories.find((c) => c._id === value);
                                                return (
                                                    <Chip key={category?._id} label={category?.Name || value} />
                                                );
                                            })}
                                        </div>
                                    )}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>
                                            {category.Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Сохранить изменения
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h3" component="h1">
                                {product.name}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {product.description}
                            </Typography>
                            <Typography variant="h4" color="primary" gutterBottom>
                                {product.price} BYN
                            </Typography>
                            <TextField
                                label="Количество"
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                            <Button variant="contained" startIcon={<AddShoppingCartIcon />} sx={{ mr: 2 }} onClick={handleAddToCart}>
                                Добавить в корзину
                            </Button>
                            <Button variant="contained" startIcon={<PhoneInTalkIcon />} color="success">
                                Позвонить для заказа
                            </Button>
                            {user && user.role === 'admin' && (
                                <Button onClick={() => setEditMode(true)} variant="contained" color="secondary">
                                    Редактировать
                                </Button>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductProfilePage;