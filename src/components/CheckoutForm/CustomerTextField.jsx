import React from 'react';
import {TextField,Grid} from "@material-ui/core";
import {useFormContext,Controller} from "react-hook-form";

//Этот код отвечает за создание компонента FormInput, который используется в другом компоненте AddressForm.
// Компонент FormInput представляет собой обертку над компонентом TextField из библиотеки @material-ui/core,
// который позволяет создавать поля ввода текста с различными свойствами, такими как name, label, и required.
const FormInput = ({ name,label,required}) => {
    //useFormContext() - это хук из библиотеки react-hook-form, который используется для доступа к контексту формы,
    // созданной с помощью useForm() в родительском компоненте AddressForm.
    const {control} = useFormContext();

    return (
        //Controller - это компонент из react-hook-form, который обеспечивает связь между контролируемым компонентом и формой.
        // Он принимает значение name, которое соответствует имени поля формы, и рендерит компонент TextField, передавая ему свойства name, label, и required.
        <Grid item xs={12} sm={6}>
            <Controller
                defaultValue=""
                control={control}
                name={name}
                render={({ field }) => (
                    <TextField
                        {...field}
                        name={name}
                        label={label}
                        required={required}
                        fullWidth
                    />
                )}
            />
        </Grid>
    );
};

//Таким образом, компонент FormInput используется для создания полей ввода текста в форме AddressForm и обеспечивает их связь с формой, созданной с помощью useForm().

export default FormInput;