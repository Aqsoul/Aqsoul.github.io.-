import React from 'react';
//Этот код - это компонент React с названием "Cart". Он отображает содержимое корзины покупок на сайте.
import {Container,Typography,Button,Grid} from "@material-ui/core";
//import {Container,Typography,Button,Grid} from "@material-ui/core"; - импорт необходимых компонентов из Material-UI.
import {Link} from 'react-router-dom'
//import {Link} from 'react-router-dom' - импорт компонента для создания ссылок между страницами.
import useStyles from './style'
//import useStyles from './style' - импорт стилей для компонента.
import CartItem from "./CartItem/CartItem";
//import CartItem from "./CartItem/CartItem"; - импорт компонента CartItem, который используется для отображения каждого элемента корзины.

const Cart = ({cart, handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
    //const Cart = ({cart, handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {...} - это функциональный компонент,
    // который принимает в качестве аргументов объект cart, функции handleUpdateCartQty, handleRemoveFromCart и handleEmptyCart.
    // Эти аргументы передаются из родительского компонента и используются для обновления содержимого корзины.

    const classes = useStyles();
    //const classes = useStyles(); - создание объекта, содержащего стили для компонента.

    const EmptyCart = () => (
        <Typography variant="subtitle1">Сіздің қоржыныңызда тауар жоқ, қосуды бастаңыз
        <Link to="/" className={classes.link}>Өнімдерді қосу</Link>
        </Typography>
    );
    //const EmptyCart = () => {...} - это компонент-функция, которая отображает текст, когда корзина пуста.

    const FilledCart = () => (
        //const FilledCart = () => {...} - это компонент-функция, которая отображает список элементов корзины и общую сумму.
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) =>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>


            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Жалпы бағасы-{cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Бос Жәщік</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Тексеру</Button>
                </div>
            </div>
        </>
    )

if (!cart?.line_items) return 'Loading...';
//if (!cart?.line_items) return 'Loading...'; - если объект cart или свойство line_items объекта cart не существует, то отображается текст "Loading...".

    return (
            <Container>
                <div className={classes.toolbar}/>
                <Typography className={classes.title} variant="h3" gutterBottom>
                    Таңдалған өнімдердің тізімі</Typography>
                { !cart?.line_items.length ? <EmptyCart/> : <FilledCart/>}
            </Container>
    );
};
//<Container>...</Container> - контейнер для отображения содержимого корзины.
//
// <Typography>...</Typography> - компонент для отображения текста.
//
// <Button>...</Button> - компонент для создания кнопок.
//
// <Grid>...</Grid> - компонент, который размещает элементы в сетке.
//
// <Link>...</Link> - компонент для создания ссылок между страницами.
//
// <CartItem>...</CartItem> - компонент, который отображает каждый элемент корзины.

export default Cart;