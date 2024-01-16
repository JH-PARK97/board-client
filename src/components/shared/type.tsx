import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

// useController를 사용하는 컴포넌트를 위한 타입
export type TControl<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    rules?: Omit<RegisterOptions<T>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};
