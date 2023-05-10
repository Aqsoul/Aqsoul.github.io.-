import {FormControl, Select, MenuItem} from "@material-ui/core";
import "./style.css";

//Это компонент React под названием SelectCategory. Он отвечает за отображение раскрывающегося меню, которое позволяет пользователю выбирать категорию для продуктов, которые он хочет найти.
//
// Компонент использует компоненты Material-UI, такие как FormControl, Select, и MenuItemдля создания раскрывающегося меню. Он также импортирует файл CSS, чтобы добавить некоторые стили к компоненту.

//Компонент получает следующие реквизиты:
//
// onChange: функция для обработки события изменения, когда пользователь выбирает категорию из раскрывающегося меню.
// selectedCategory: текущая выбранная категория.
// categories: массив всех доступных категорий для отображения в раскрывающемся меню.

const SelectCategory = ({onChange, selectedCategory, categories}) => {
    return (
        <FormControl className="formControl">
            <Select value={selectedCategory.id} onChange={onChange}>
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

//Компонент SelectCategory возвращает FormControl компонент, который обертывает Select компонент.
// Внутри Select компонента есть несколько MenuItem компонентов, каждый из которых представляет категорию.
// Свойству value компонента Select присваивается значение id текущей выбранной категории, а onChange событие обрабатывается onChange функцией prop.
//
// Когда пользователь выбирает категорию из выпадающего меню, onChange вызывается функция prop,
// и value в качестве аргумента передается выбранная категория. Затем это значение используется для обновления состояния выбранной категории в родительском компоненте FilterProduct.

export default SelectCategory;