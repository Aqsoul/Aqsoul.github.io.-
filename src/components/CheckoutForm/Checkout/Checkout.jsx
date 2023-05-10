import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button,CssBaseline} from "@material-ui/core";
import {Link,useNavigate} from "react-router-dom"
import {commerce} from "../../../lib/commerce";
import useStyles from './style'
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ['Shipping address', 'Payment details'];
//Первым делом, определяется константа steps, которая содержит список шагов, необходимых для оформления заказа.
// Эти шаги позднее будут отображаться на странице как составляющие компонента Stepper из Material-UI.

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    //Далее, определяется компонент Checkout. Он принимает несколько пропсов, таких как cart, order, onCaptureCheckout, и error.
    // Каждый из них будет использоваться для обновления состояния компонента во время оформления заказа.
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const {isFinished,setIsFinished} = useState(false)
    const classes = useStyles();
    const navigate = useNavigate();
    //С помощью хука useState в этом компоненте создаются несколько переменных состояния,
    // включая activeStep, который отслеживает текущий шаг, на котором находится пользователь в процессе оформления заказа,
    // checkoutToken, который содержит токен для проверки корзины,
    // shippingData, который содержит данные о доставке, введенные пользователем,
    // и isFinished, который указывает, завершен ли заказ.
    //С помощью хука useStyles определяется объект стилей, используемый для настройки стилей компонента Material-UI.
    //Затем, используя хук useNavigate, создается функция, которая будет использоваться для перенаправления пользователя на другую страницу при возникновении ошибок.


    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                setCheckoutToken(token);
            } catch (error) {
                navigate.pushState('/');
            }
        }
        generateToken()
    }, [cart]);
    //С помощью хука useEffect вызывается функция generateToken, которая генерирует токен для проверки корзины,
    // используя метод API commerce.checkout.generateToken. Если токен успешно сгенерирован, он сохраняется в переменную checkoutToken.
    // В противном случае, пользователь перенаправляется на главную страницу.

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)

        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        },3000)
    }
    //Компонент Checkout также определяет несколько функций, таких как nextStep, которая переходит на следующий шаг оформления заказа,
    // и backStep, которая возвращает пользователя на предыдущий шаг. Есть также функции next, которая вызывается при завершении ввода информации о доставке,
    // и timeout, которая вызывается при успешном завершении заказа.


    let Confirmation = () => order.customer ? (
        //Функция Confirmation определяет, что показывать на странице в зависимости от статуса заказа.
        // Если заказ завершен, то отображается сообщение об успешном завершении заказа и кнопка, возвращающая пользователя на главную страницу.
        // Если заказ еще не завершен, то показывается индикатор загрузки
        <>
            <div>
                <Typography variant="h5">Cатып алғаныңызға рахмет,{order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Негізгі экранға оралу</Button>
        </>
    ) :  isFinished ? (
        <>
            <div>
                <Typography variant="h5">Сатып алғаныңызға рахмет</Typography>
                <Divider className={classes.divider}/>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Негізгі экранға оралу</Button>
        </>
    ) :(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    );

    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Негізгі экранға оралу</Button>
        </>
    };


    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep}
                       onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>

    return (
        <>
            <CssBaseline/>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Тексеру</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;