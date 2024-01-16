import React, { ChangeEvent } from 'react';
import {
    Radio,
    RadioGroup,
    RadioGroupProps,
    FormControl,
    FormControlLabel,
    FormControlLabelProps,
    FormLabel,
} from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';

import { TControl } from '../type';

export type TRadioGroup = Omit<FormControlLabelProps, 'control'>;

interface CustomRadioGroupProps {
    groupLabel: string;
    group: TRadioGroup[];
    size?: 'medium' | 'small';
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

type TProps<T extends FieldValues> = Omit<RadioGroupProps, 'onChange'> & CustomRadioGroupProps & TControl<T>;

export function FormRadioGroup<T extends FieldValues>({
    groupLabel,
    control,
    name,
    size,
    group,
    onChange: propsOnChange,
}: TProps<T>) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        if (propsOnChange) {
            propsOnChange(event);
        }
    };
    const {
        field: { value, onChange },
    } = useController({ name, control });
    return (
        <FormControl>
            <FormLabel id={`${name}-radio-buttons-group-label`}>{groupLabel}</FormLabel>
            <RadioGroup row name={name} value={value} onChange={handleChange}>
                {group.map(({ value: radioValue, disabled, label }, index) => (
                    <FormControlLabel
                        key={index}
                        value={radioValue}
                        label={label}
                        control={<Radio size={size} value={radioValue} disabled={disabled} />}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
