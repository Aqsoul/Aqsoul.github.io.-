import React from "react";
import {
    Grid,
    Paper,
    Container,
    InputBase,
    IconButton,
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {commerce} from "../../lib/commerce";
import SelectCategory from "./SelectCategory";
import "./style.css";
import Product from "../Product/Product";


//Этот код создает компонент FilterProduct, который представляет собой фильтр для поиска продуктов на сайте.
// Он использует некоторые компоненты из библиотеки Material-UI, такие как Grid, Paper, Container, InputBase, IconButton и SelectCategory.

//Компонент содержит следующие функциональности:
//
// Пользователь может выбрать категорию продукта из выпадающего списка, представленного компонентом SelectCategory.
// Пользователь может ввести ключевое слово для поиска продуктов в поле InputBase.
// Пользователь может нажать на кнопку IconButton, чтобы запустить поиск продуктов на основе выбранных категорий и ключевого слова.
// После нажатия на кнопку IconButton компонент отправляет запрос на сервер с использованием commerce.products.list(), чтобы получить список продуктов, соответствующих категориям и ключевому слову.
// Если запрос успешен, компонент отображает результаты поиска в виде сетки продуктов (Grid), каждый продукт представлен компонентом Product.
// Если запрос не дал результатов, компонент отображает сообщение об ошибке вместо результатов поиска.


const FilterProduct = ({categories, searchResult, setSearchResult,onAddToCart}) => {
    const defaultCategory = {id: 0, name: "All"}
    const [keyword, setKeyword] = React.useState("");
    const [resultMessage, setResultMessage] = React.useState("");
    const [selectedCategory, setSelectedCategory] =
        React.useState(defaultCategory);
    //Компонент инициализирует некоторые переменные состояния с помощью useStateхука из React:
    //
    // defaultCategoryэто объект с idустановленным на 0 и nameустановленным на «Все».
    // keywordэто строковая переменная, которая содержит ключевое слово для поиска, введенное пользователем. Он инициализируется пустой строкой.
    // resultMessage— это строковая переменная, содержащая сообщение, которое будет отображаться при отсутствии результатов поиска. Он инициализируется пустой строкой.
    // selectedCategoryэто объектная переменная, которая содержит текущую выбранную категорию для фильтрации продуктов. Он инициализируется в defaultCategory.


    const handleInputChange = (event) => {
        if (!keyword || !event.target.value) {
            setResultMessage("");
            setSearchResult([]);
            setSelectedCategory(defaultCategory);
        }
        setKeyword(event.target.value);
    };
    //Эта функция срабатывает всякий раз, когда происходит изменение поля ввода. Он проверяет, пусто поле ввода или нет, и если оно пусто, очищает результаты поиска, сбрасывает выбранную категорию на «Все» и очищает все отображаемые сообщения о результатах.
    //
    // Если поле ввода не пусто, оно обновляет переменную состояния «ключевое слово» значением поля ввода.



    const handleSelectChange = (event) => {
        const {value} = event.target;
        const category = categories.find((cat) => cat.id === value);
        if (value === 0) {
            setSelectedCategory(defaultCategory);
        } else {
            setSelectedCategory(category);
        }
    };
    //Этот код определяет handleSelectChangeфункцию, которая вызывается, когда пользователь выбирает категорию из выпадающего списка. Сначала функция извлекает значение выбранной опции из объекта события. Затем он использует этот Array.prototype.find()метод, чтобы найти объект категории, который имеет тот же идентификатор, что и выбранное значение. Если выбранное значение равно 0 (что соответствует категории «Все»), функция устанавливает выбранную категорию в качестве объекта категории по умолчанию. В противном случае он устанавливает выбранную категорию в объект категории, найденный с помощью find().
    //
    // Таким образом, эта функция обновляет выбранную категорию на основе выбора пользователя в раскрывающемся списке категорий.

    const onSubmit = async (e) => {
        e.preventDefault();
        //Этот код определяет onSubmit функцию, которая вызывается при отправке формы в компоненте.
        // Это асинхронная функция, которая сначала предотвращает отправку формы по умолчанию, вызывая e.preventDefault().
        if (!keyword) {
            setResultMessage("You have to enter a product name");
        }
        //Затем он проверяет, keyword пуста ли переменная состояния. Если это так, он устанавливает resultMessageдля переменной состояния значение «Вы должны ввести название продукта».
        if (keyword) {
            try {
                const categoryId = selectedCategory.id
                    ? {category_id: selectedCategory.id}
                    : {};
                const {data} = await commerce.products.list({
                    query: keyword,
                    ...categoryId,
                });
                //Если keywordне пусто, функция отправляет запрос в commerceAPI для получения списка продуктов, соответствующих введенному keyword.
                // Переменная categoryIdстроится на основе selectedCategoryпеременной состояния, которая является либо пустым объектом (если выбрана категория по умолчанию «Все»),
                // либо объектом со свойством, category_idравным идентификатору выбранной категории.
                if (!data) {
                    setResultMessage("No result match");
                    setSearchResult([]);
                    return;
                }
                //Если запрос API не возвращает данных, функция устанавливает resultMessageдля переменной состояния значение «Нет совпадения результатов» и устанавливает searchResultдля переменной состояния пустой массив.
                setResultMessage("");
                setSearchResult(data);
            } catch (error) {
                setSearchResult([]);
                //Если запрос API возвращает данные, функция устанавливает resultMessageпеременную состояния в пустую строку и устанавливает searchResultпеременную состояния в возвращенные данные.
                // Если во время запроса API возникает ошибка, searchResultпеременная состояния устанавливается в пустой массив.
            }
        }
    };


    return (
        //Компонент принимает следующие свойства:
        //
        // categories - массив категорий продуктов
        // searchResult - массив продуктов, соответствующих результатам поиска
        // setSearchResult - функция для обновления массива продуктов, соответствующих результатам поиска
        // onAddToCart - функция для добавления продукта в корзину.
        <div className="filter-bar">
            <Container>
                <Paper component="form" className="root" onSubmit={onSubmit}>
                    <SelectCategory
                        categories={[defaultCategory, ...categories]}
                        selectedCategory={selectedCategory}
                        onChange={handleSelectChange}

                    />
                    <InputBase
                        className="input"
                        onChange={handleInputChange}
                        placeholder="Search for a product"
                        inputProps={{"arial-label": "Search for a product"}}
                    />
                    <IconButton type="submit" aria-label="search">
                        <Search/>
                    </IconButton>
                </Paper>
                {resultMessage && <p className="result-message">{resultMessage}</p>}
                {searchResult.length && (
                    <div>
                        <Grid container spacing={4}>
                            {searchResult.map((product) => (
                                <Grid key={product.id} item xs={12} sm={6} md={4}>
                                    <Product product={product} onAddToCart={onAddToCart} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default FilterProduct