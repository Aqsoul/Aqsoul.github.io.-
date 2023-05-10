import React,{useState} from 'react';
import {SliderData} from "./SliderData";
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from "react-icons/fa";
import './Slider.css'
//Данный код представляет компонент React, который реализует слайдер изображений.
// Он импортирует компоненты `useState` и `FaArrowAltCircleRight`, `FaArrowAltCircleLeft` из библиотеки `react-icons/fa` и файл `SliderData.js`,
// содержащий массив объектов с данными изображений.




const ImageSlider = ({slides}) => {
    const [current,setCurrent] = useState(0)
    const lenght = slides.length

//Компонент `ImageSlider` принимает массив объектов с данными изображений и начинает с первого элемента.
// Далее, он содержит две функции `nextSlide` и `prevSlide`, которые изменяют текущий индекс `current` и переключают на следующее или предыдущее изображение.
// Если текущий индекс достигает конца массива, он переходит на первое изображение и наоборот.


    const nextSlide = () => {
        setCurrent(current === lenght - 1 ? 0 : current+ 1)
    }

    if(!Array.isArray(slides) || slides.length <=0) {
        return null;
    }
// Компонент также содержит условие, которое проверяет, является ли `slides` массивом и имеет ли он хотя бы один элемент.
// Если нет, компонент вернет `null`.



    const prevSlide = () => {
        setCurrent(current === 0 ? lenght -1 : current -1)
    }

    return (
        <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow"  onClick={prevSlide} />
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
            {SliderData.map((slide,index) => {
                return(
                    <div className={index===current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (
                            <img src={slide.image} alt="travel image" className="image"/>
                        )}
                    </div>
                    );
            }) }
        </section>
    );
};
//Затем компонент возвращает элемент `section` с классом `slider`. Этот элемент содержит две иконки - слева и справа,
// которые используются для переключения на предыдущее или следующее изображение. Также внутри этого элемента происходит отображение каждого изображения,
// используя функцию `map`. Каждое изображение обернуто в элемент `div` с классом `slide`.
// Внутри этого элемента происходит проверка, находится ли текущее изображение в массиве на основе его индекса `index`.
// Если индекс текущего изображения соответствует текущему состоянию `current`, класс этого элемента изменяется на `active`.
// Таким образом, только одно изображение будет отображаться одновременно, а все остальные будут скрыты.


export default ImageSlider;