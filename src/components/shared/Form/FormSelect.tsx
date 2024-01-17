import React from 'react';
import { Select, FormControl, FormControlProps, InputLabel, MenuItem, MenuItemProps } from '@mui/material';

import { FieldValues, useController } from 'react-hook-form';
import { TControl } from '../type';

interface CustomSelectProps {
    inputLabel: string;
    selectItem: MenuItemProps[];
    formControlProps: FormControlProps;
}

type TProps<T extends FieldValues> = CustomSelectProps & TControl<T>;

export default function FormSelect<T extends FieldValues>({
    inputLabel,
    control,
    name,
    selectItem,
    formControlProps,
}: TProps<T>) {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control });
    return (
        <FormControl {...formControlProps}>
            <InputLabel>{inputLabel}</InputLabel>
            <Select MenuProps={{ style: { maxHeight: 400 } }} label={inputLabel} value={value} onChange={onChange}>
                {selectItem.map(({ value: itemValue, children }, index) => (
                    <MenuItem key={index} value={itemValue}>
                        {children}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
