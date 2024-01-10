import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, deleteOrder } from '../redux/slices/order';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    List,
    ListItem,
    ListItemText,
    CardMedia,
    Button
} from '@mui/material';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const orderStatus = useSelector((state) => state.orders.status);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleDelete = (orderId) => {
        dispatch(deleteOrder(orderId));
    };

    if (orderStatus === 'loading') {
        return <Typography>Loading...</Typography>;
    }

    if (orderStatus === 'failed') {
        return <Typography>Error in fetching orders.</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>Заказы</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID заказа</TableCell>
                            <TableCell>Дата заказа</TableCell>
                            <TableCell>Итоговая стоимость</TableCell>
                            <TableCell>Адрес</TableCell>
                            <TableCell>Номер телефона</TableCell>
                            <TableCell>Товары</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{new Date(order.purchaseDate).toLocaleDateString()}</TableCell>
                                <TableCell>{order.total} BYN</TableCell>
                                <TableCell>{order.address}</TableCell>
                                <TableCell>{order.phoneNumber}</TableCell>
                                <TableCell>
                                    <List>
                                        {order.products.map((product) => (
                                            <ListItem key={product._id}>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={product.imageUrl}
                                                    alt={product.name}
                                                />
                                                <ListItemText
                                                    primary={product.name}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(order._id)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default OrdersPage; 