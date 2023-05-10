import React from 'react';
import {Typography,List,ListItem,ListItemText} from "@material-ui/core";


//Данный код отвечает за отображение информации о выбранных товарах и общей стоимости заказа в процессе оформления платежа.


//Компонент Review принимает объект checkoutToken, который содержит информацию о товарах в корзине, и возвращает разметку с помощью компонентов из библиотеки Material-UI.
const Review = ({checkoutToken}) => {
    return (
        //На первом уровне возвращается компонент Typography, который отображает заголовок "Тапсырыс туралы". На втором уровне возвращается компонент List с отключенным отступом.
        //
        // Для каждого товара в корзине создается компонент ListItem с помощью метода map(). Для каждого ListItem создается компонент ListItemText, который отображает имя товара и количество, и компонент Typography, который отображает цену товара.
        //
        // Наконец, создается последний ListItem, который содержит общую стоимость всех товаров в корзине, и который также состоит из компонента ListItemText и Typography.
        <>
         <Typography variant="h6" gutterBottom>
             Тапсырыс туралы</Typography>
            <List disablePadding>
                {checkoutToken.line_items.map((product) =>(
                    <ListItem style={{padding:'10px 0'}} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding:'10px 0' }}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" style={{fontWeight:700}}>
                        {checkoutToken.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>

            </List>
        </>
    );
};

export default Review;