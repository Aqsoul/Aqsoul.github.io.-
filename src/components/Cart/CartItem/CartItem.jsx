import React from 'react';
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from "@material-ui/core";
//Первая строка импортирует необходимые компоненты Material-UI, такие как Typography, Button, Card, CardActions, CardContent, CardMedia,
// которые будут использоваться в дальнейшем в этом компоненте.

import useStyles from './style';
//useStyles - это пользовательская функция, которая возвращает объект, содержащий пользовательские стили для этого компонента,
// такие как media, cardContent, cartActions, buttons.



//Этот код представляет собой компонент CartItem React, который отображает элемент корзины товаров в интернет-магазине.



//Функциональный компонент CartItem принимает три аргумента: item, onUpdateCartQty, onRemoveFromCart.
// item содержит информацию о товаре, который был добавлен в корзину, onUpdateCartQty - функция, которая обновляет количество товара в корзине,
// onRemoveFromCart - функция, которая удаляет товар из корзины.
//Затем мы возвращаем Card, который содержит информацию о товаре, в том числе изображение, название и цену,
// а также кнопки для обновления количества товара в корзине и удаления товара из корзины. Метод onUpdateCartQty вызывается,
// когда пользователь нажимает кнопку "+" или "-", чтобы изменить количество товара в корзине.
// Метод onRemoveFromCart вызывается, когда пользователь нажимает кнопку "Жою", чтобы удалить товар из корзины.
const CartItem = ({item,onUpdateCartQty,onRemoveFromCart}) => {
    const classes = useStyles();
    return (
       <Card>
           <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
           <CardContent className={classes.cardContent}>
               <Typography variant="h4">{item.name}</Typography>
               <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
           </CardContent>
          <CardActions className={classes.cartActions}>
              <div className={classes.buttons}>
                  <Button type="button" size="small" onClick={(event)=> {
                      event.preventDefault();
                      onUpdateCartQty(item.id , item.quantity -1)
                  }}>-</Button>
                  <Typography>{item.quantity}</Typography>
                  <Button type="button" size="small" onClick={(event)=> {
                      event.preventDefault();
                      onUpdateCartQty(item.id , item.quantity +1)}
                  }>+</Button>
              </div>
              <Button variant="contained" type="button" color="secondary" onClick={(event)=> {
                  event.preventDefault();
                  onRemoveFromCart(item.id)}
              }>Жою</Button>
          </CardActions>
       </Card>
    );
};

export default CartItem;