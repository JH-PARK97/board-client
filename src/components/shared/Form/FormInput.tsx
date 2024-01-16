import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';

import { TControl } from '../type';

type FormInputTextProps<T extends FieldValues> = TextFieldProps & TControl<T>;

export function FormInputText<T extends FieldValues>({ control, name, rules, ...props }: FormInputTextProps<T>) {
    const {
        field: { value, onChange },
        fieldState: { isDirty, isTouched, invalid, error },
    } = useController({ name, rules, control });
    return <TextField name={name} value={value} onChange={onChange} {...props} />;
}
