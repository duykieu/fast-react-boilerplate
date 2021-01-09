import React from "react";
import { Input } from "antd";
import FormGroup from "./FormGroup";

interface IFormikFormTextAreaProps {
    required?: boolean;
    fm: any;
    name: string;
    label: string;
}

const FormikFormTextArea: React.FunctionComponent<IFormikFormTextAreaProps> = ({
    fm,
    name,
    label,
    required,
}) => (
    <FormGroup label={label} error={fm.errors[name]} touched={fm.touched[name]} required={required}>
        <Input.TextArea
            name={name}
            value={fm.values[name]}
            onBlur={fm.handleBlur}
            onChange={fm.handleChange}
        />
    </FormGroup>
);

export default FormikFormTextArea;
