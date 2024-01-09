import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/slices/cart';
import { createOrder } from '../redux/slices/order';
import {
    Container, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Typography, Modal, Box, TextField
} from '@mui/material';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const cartItems = useSelector((state) => state.cart.items);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        dispatch(clearCart());
    };

    const handleCheckout = async () => {
        const productIds = cartItems.map(item => item._id);
        const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

        const orderData = {
            products: productIds,
            total: totalAmount,
            address: address
        };

        dispatch(createOrder(orderData));
        setIsModalOpen(true);
    };

    console.log('Modal Open State:', isModalOpen);

    if (cartItems.length === 0) {
        return (
            <Container>
                <Typography variant="h5">Ваша корзина пока пуста</Typography>
                <Link to="/products" style={{ textDecoration: 'none', color: '#007bff' }}>
                    <Button variant="outlined" color="primary">
                        Перейти в каталог
                    </Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', boxShadow: 24, borderRadius: '4px' }}>
                    <Typography variant="h6" id="simple-modal-title">Ваш заказ принят</Typography>
                    <Typography variant="body1" id="simple-modal-description">
                        Письмо с подтверждением было отправлено на вашу электронную почту.
                    </Typography>
                    <Button onClick={handleCloseModal} style={{ marginTop: '10px' }}>
                        Закрыть
                    </Button>
                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Фото</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Удалить</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '50px' }} />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveFromCart(item._id)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TextField
                label="Адрес доставки"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                style={{ marginTop: '20px' }}
            >
                Оформить заказ
            </Button>
        </Container>
    );
};

export default CartPage; 