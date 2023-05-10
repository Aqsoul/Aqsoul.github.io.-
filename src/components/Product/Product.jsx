import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";

import useStyles from './styles';

//Этот код определяет компонент React с именем Product, который отображает карточку Material UI, отображающую информацию о продукте.


const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

    //Компонент принимает два реквизита: productи onAddToCart. Реквизит product— это объект, содержащий информацию о конкретном товаре,
    // включая его название, изображение, описание и цену. Опция onAddToCart— это функция, которая вызывается при нажатии кнопки «Добавить в корзину».


    const handleAddToCart = () => onAddToCart(product.id, 1)

    //Компонент использует компоненты Material UI Card, CardMedia, CardContentи CardActionsдля размещения информации о продукте. Изображение продукта отображается с помощью CardMediaкомпонента,
    // а название продукта, описание и цена — с помощью CardContent.
    //
    // Кнопка «Добавить в корзину» отображается с помощью CardActionsкомпонента и IconButtonкомпонента со AddShoppingCartзначком из интерфейса материалов.
    //
    // При нажатии кнопки «Добавить в корзину» handleAddToCartвызывается функция, которая просто вызывает onAddToCartфункцию с товаром idи количеством, равным 1.

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>

                </div>

                <div className={classes.cardPrice}>
                    <Typography variant="h6">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2"
                            color="textSecondary"/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    );
};


export default Product;