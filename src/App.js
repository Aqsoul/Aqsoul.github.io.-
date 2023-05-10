import React, {useState, useEffect} from 'react';
import {commerce} from "./lib/commerce";
//Модуль коммерции, который импортируется из файла lib/commerce, используется для взаимодействия с серверной платформой электронной коммерции.
//  Приложение использует этот модуль для получения продуктов и категорий, добавления продуктов в корзину и завершения оформления заказа.

import {Products, Navbar, Cart, Checkout} from './components'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//Компонент Router из библиотеки react-router-dom используется для определения маршрутов приложения.
// Компоненты «Routes» и «Route» используются для определения различных путей, по которым может идти пользователь,
// и компонентов, которые должны отображаться на каждом пути.

import ImageSlider from "./slider/ImageSlider";
import {SliderData} from "./slider/SliderData";
import Footer2 from "./components/footer2/Footer2";
import FilterProduct from "./components/FilterProduct";

//Этот код представляет собой приложение React, которое отображает веб-сайт электронной коммерции.
// Он импортирует несколько компонентов из разных файлов для отображения разных разделов веб-сайта.


const App = () => {
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('')
    const [searchResult, setSearchResult] = React.useState([]);
    //Хуки useState используются для создания переменных состояния для хранения данных, необходимых приложению для работы.
    //  Хук useEffect используется для получения данных при монтировании приложения.


    const fetchProducts = async () => {
        const {data: products} = await commerce.products.list();
        const {data: categoriesData} = await commerce.categories.list();


        const productPerCategory = categoriesData.reduce((acc, category) => {
            return [
                ...acc,
                {
                    ...category,
                    productsData: products.filter((product) =>
                        product.categories.find((cat) => cat.id === category.id)
                    ),
                }
            ]
        }, []);

        setCategories((productPerCategory) || []);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const item = await commerce.cart.update(productId, {quantity});

        setCart(item);
    }

    const handleRemoveFromCart = async (productId) => {
        const item = await commerce.cart.remove(productId);

        setCart(item);
    }

    const handleEmptyCart = async () => {
        const item = await commerce.cart.empty();

        setCart(item);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart)
    }


    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    //Переменные состояния приложения передаются в качестве реквизита некоторым компонентам, чтобы они могли получить доступ и изменить состояние.
    // Функции `handleAddToCart`, `handleUpdateCartQty`, `handleRemoveFromCart` и `handleEmptyCart` передаются как свойства компоненту `Cart`,
    // чтобы позволить ему изменять состояние корзины. Функция `handleCaptureCheckout` передается в качестве свойства компоненту `Checkout` для обработки процесса оформления заказа.










    //Приложение содержит несколько компонентов, в том числе:
    //- `Navbar`: отображает панель навигации веб-сайта, включая количество товаров в корзине.
    // - `FilterProduct`: компонент, который принимает категории и результаты поиска и соответствующим образом фильтрует продукты.
    // - `ImageSlider`: отображает слайдер изображений на главной странице.
    // - `Products`: отображает список товаров.
    // - «Cart»: отображает элементы корзины и позволяет пользователю обновлять или удалять элементы.
    // - «Checkout»: отображает форму оформления заказа и обрабатывает процесс оформления заказа.
    // - `Footer2`: отображает нижний колонтитул веб-сайта.
    return (
        <Router>
            <div>
                <Navbar totalItems={cart?.total_items}/>
                <Routes>
                    <Route path="/" element={<FilterProduct categories={categories}
                                                            searchResult={searchResult}
                                                            setSearchResult={setSearchResult}
                                                            onAddToCart={handleAddToCart}
                    />}></Route>
                </Routes>
                {!searchResult.length && <>
                    <Routes>
                        <Route path="/" element={<ImageSlider slides={SliderData}/>}></Route>
                    </Routes>
                    <Routes>
                        <Route path="/" element={<Products categories={categories} onAddToCart={handleAddToCart}/>}>
                        </Route>
                        <Route path="/cart"
                               element={<Cart cart={cart}
                                              handleUpdateCartQty={handleUpdateCartQty}
                                              handleRemoveFromCart={handleRemoveFromCart}
                                              handleEmptyCart={handleEmptyCart}
                               />}>
                        </Route>
                        <Route path="/checkout" element={<Checkout cart={cart}
                                                                   order={order}
                                                                   onCaptureCheckout={handleCaptureCheckout}
                                                                   error={errorMessage}
                        />}>
                        </Route>
                    </Routes>
                    <Routes>
                        <Route path="/" element={<Footer2/>}>
                        </Route>
                    </Routes>
                </>}
            </div>
        </Router>


    );
};

export default App;