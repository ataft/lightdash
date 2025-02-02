import { Button, FormGroup } from '@blueprintjs/core';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Input from './Input';
import { MultiKeyValuePairRow } from './MultiKeyValuePairsInput.styles';

type Props = {
    name: string;
    label: string;
    disabled?: boolean;
};
export const MultiKeyValuePairsInput = ({ name, label, disabled }: Props) => {
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({ name, control });
    return (
        <FormGroup className="input-wrapper" label={label}>
            {fields.map((field, index) => (
                <MultiKeyValuePairRow key={field.id}>
                    <Input
                        name={`${name}.${index}.key`}
                        placeholder="Key"
                        disabled={disabled}
                    />
                    <Input
                        name={`${name}.${index}.value`}
                        placeholder="Value"
                        disabled={disabled}
                    />
                    <Button
                        minimal={true}
                        icon={'cross'}
                        onClick={() => remove(index)}
                        disabled={disabled}
                    />
                </MultiKeyValuePairRow>
            ))}
            <Button
                minimal
                onClick={() => append({ key: '', value: '' })}
                icon={'plus'}
                text="Add variable"
                disabled={disabled}
            />
        </FormGroup>
    );
};
