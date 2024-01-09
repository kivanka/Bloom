import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsById, updateProduct } from '../redux/slices/product';
import { Container, Grid, Typography, Button, TextField, CircularProgress } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { addToCart } from '../redux/slices/cart';

const ProductProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.currentProduct);
    const [editMode, setEditMode] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const user = useSelector(state => state.auth.data);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCart = () => { 
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product));
        }
    };

    useEffect(() => {
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
            });
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        await dispatch(updateProduct({ id, updatedData: updatedProduct }));
        setEditMode(false);
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
                            />
                            <Button variant="contained" startIcon={<AddShoppingCartIcon />} sx={{ mr: 2 }} onClick={handleAddToCart}>
                                Добавить в корзину
                            </Button>
                            <Button variant="contained" startIcon={<PhoneInTalkIcon />} color="success">
                                Позовнить для заказа
                            </Button>
                            {user && user.role === 'admin' && (
                                <>
                                    <Button onClick={() => setEditMode(true)} variant="contained" color="secondary">
                                        Редактировать
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductProfilePage;