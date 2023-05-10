import React from 'react';
import {Typography, Button, Divider} from "@material-ui/core";
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import Review from './Review'

//Этот код - компонент React для обработки платежей. Он использует библиотеку Stripe для создания и обработки платежей на основе карточек.

//Сначала мы импортируем необходимые компоненты из библиотек Material-UI и Stripe. Мы также импортируем компонент Review из нашего собственного файла,
// который отображает информацию о заказе для клиента.


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

//В компоненте PaymentForm мы определяем функцию handleSubmit для обработки событий отправки формы. При отправке формы мы сначала проверяем наличие библиотеки Stripe и элемента CardElement из этой библиотеки,
// который мы будем использовать для ввода данных карточки. Затем мы используем метод createPaymentMethod Stripe для создания платежа, передавая ему данные о типе карты и элементе CardElement.
// Если произойдет ошибка, мы выведем ее в консоль. Если все проходит успешно, мы создадим объект orderData, содержащий информацию о заказе и используем метод onCaptureCheckout для захвата платежа.
// Затем мы вызываем функцию timeout и переходим на следующий шаг с помощью функции nextStep.

const PaymentForm = ({checkoutToken, backStep,shippingData,onCaptureCheckout,nextStep,timeout}) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const {error,paymentMethod} = await stripe.createPaymentMethod({type:'card',card: cardElement});

        if(error) {
            console.log(error);
        }else {
            const orderData = {
                line_items:checkoutToken.line_items,
                customer:{firstname: shippingData.firstname, lastname:shippingData.lastname,email:shippingData.email},
                shipping:{
                    name:'Primary',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    county_state:shippingData.shippingSubdivision,
                    postal_zip_code:shippingData.zip,
                    country: shippingData.shippingCountry,

                },
                fulfillment: { shipping_method:shippingData.shippingOption},
                payment: {
                    gateway:'stripe',
                    stripe: {
                        payment_method_id:paymentMethod.id
                    }

                }
            }

            onCaptureCheckout(checkoutToken.id,orderData);

            timeout();

            nextStep();
        }


    }
    return (
        //Компонент также использует Stripe Elements для создания формы для ввода информации о карте и StripeProvider для обеспечения безопасности при передаче данных о платеже.
        // Кнопки "Оралу" и "Төлеу" позволяют пользователю вернуться на предыдущий шаг и отправить платеж соответственно. Все компоненты отображаются на странице внутри блока <Typography>,
        // который показывает заголовок блока и <Divider> - линия-разделитель.
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Төлем тәсілі</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement/>
                            <br/><br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Оралу</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Төлеу {checkoutToken.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>

            </Elements>
        </>
    );
};

export default PaymentForm;