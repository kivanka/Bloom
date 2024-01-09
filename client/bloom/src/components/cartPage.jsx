import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cart';
import { createOrder } from '../redux/slices/order';
import {
    Container, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleCheckout = () => {
        const productIds = cartItems.map(item => item._id);
        const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

        const orderData = {
            products: productIds,
            total: totalAmount
        };

        dispatch(createOrder(orderData));
    };

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