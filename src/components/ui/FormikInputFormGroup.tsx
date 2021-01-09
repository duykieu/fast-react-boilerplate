import React from "react";
import { Input } from "antd";
import FormGroup from "./FormGroup";
import lodash from "lodash";
import { LiteralUnion } from "antd/lib/_util/type";

interface IFormikInputFormGroupProps {
    required?: boolean;
    fm: any;
    name: string;
    label: string;
    type?: LiteralUnion<
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week",
        string
    >;
}

const FormikInputFormGroup: React.FunctionComponent<IFormikInputFormGroupProps> = ({
    fm,
    name,
    label,
    required,
    ...props
}) => {
    console.log("Rendering");
    return (
        <FormGroup
            label={label}
            error={fm.errors[name]}
            touched={fm.touched[name]}
            required={required}
        >
            <Input
                {...props}
                name={name}
                value={fm.values[name]}
                onBlur={fm.handleBlur}
                onChange={fm.handleChange}
            />
        </FormGroup>
    );
};

export default React.memo(FormikInputFormGroup, (prevProps, nextProps) => {
    const { name } = prevProps;
    return (
        lodash.isEqual(prevProps.fm.values[name], nextProps.fm.values[name]) &&
        lodash.isEqual(prevProps.fm.errors[name], nextProps.fm.errors[name]) &&
        lodash.isEqual(prevProps.fm.touched[name], nextProps.fm.touched[name])
    );
});
