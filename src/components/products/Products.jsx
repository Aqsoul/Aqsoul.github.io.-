import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";

import Product from "../Product/Product";
import useStyles from './styles'

//Этот код экспортирует компонент React с именем Products, который отображает список продуктов, организованных по категориям.


const Products = ({categories,onAddToCart}) => {
    const classes = useStyles();
    //Компонент получает два реквизита: categories, который представляет собой массив объектов, содержащих название категории и данные о продуктах для этой категории,
    // и onAddToCart, который представляет собой функцию для обработки события добавления продукта в корзину.

    return (
        //Компонент отображает mainэлемент с classNameразмером classes.content. Внутри этого элемента есть цикл по массиву категорий с использованием функции map.
        // Для каждой категории Containerсоздается элемент с keyнабором имени категории. Внутри контейнера Typographyкомпонент отображает название категории.
        // Под ним Gridсоздается элемент, и цикл запускается по продуктам этой категории с помощью map, создавая Productкомпонент для каждого продукта,
        // передавая данные продукта и onAddToCartфункцию в качестве реквизита. Наконец, Productкомпоненты отображаются внутри Gridэлементов, которые управляют их расположением на странице.
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            {categories.map((category) => {
                return (
                    <Container key={category.name}>
                        <Typography className="headline" variant="h3" component="h2">
                            {category.name}
                        </Typography>
                        <Grid container justifyContent="center" spacing={4}>
                            {category.productsData.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} lg={3}>
                                    <Product product={product} onAddToCart={onAddToCart}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                )
            })}
        </main>
    )
}


export default Products