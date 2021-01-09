import React from "react";
import FormGroup from "./FormGroup";
import { Select, Alert } from "antd";
import lodash from "lodash";
import { makeSlug } from "../../utils";

interface IFormikSelectFormGroupProps {
    defaultValue?: any;
    labelKey?: string;
    key?: string;
    fm: any;
    label?: string;
    name: string;
    value?: any;
    items: any[];
    multiple?: boolean;
    loading?: boolean;
    objectModel?: boolean;
}

export const handleFilter = (value, options): boolean => {
    return makeSlug(options.children).includes(makeSlug(value));
};

const FormikSelectFormGroup: React.FunctionComponent<IFormikSelectFormGroupProps> = ({
    defaultValue,
    label,
    name,
    labelKey = "name",
    key = "id",
    fm,
    value,
    items,
    multiple,
    loading,
    objectModel = false,
}) => {
    if (!Array.isArray(items)) {
        return <Alert message="Error" description="Bug on Select component" type="error" />;
    }

    const handleChange = (values) => {
        if (!objectModel) {
            fm.setFieldValue(name, values);
        } else {
            if (multiple) {
                fm.setFieldValue(
                    name,
                    items.filter((item) => values.includes(item.id)),
                );
            } else {
                fm.setFieldValue(
                    name,
                    items.find((item) => values === item.id),
                );
            }
        }
    };

    return (
        <FormGroup label={label} touched={fm.touched[name]} error={fm.errors[name]}>
            <Select
                filterOption={handleFilter}
                showSearch
                loading={loading}
                mode={multiple ? "tags" : undefined}
                style={{ width: "100%" }}
                defaultValue={defaultValue ? defaultValue : fm.values[name]}
                value={value ? value : fm.values[name]}
                onChange={handleChange}
            >
                {items.map((item) => (
                    <Select.Option key={item.id} value={item[key]}>
                        {item[labelKey]}
                    </Select.Option>
                ))}
            </Select>
        </FormGroup>
    );
};
export default React.memo(FormikSelectFormGroup, (prevProps, nextProps) => {
    const { name } = prevProps;
    return (
        lodash.isEqual(prevProps.fm.values[name], nextProps.fm.values[name]) &&
        lodash.isEqual(prevProps.items, nextProps.items) &&
        lodash.isEqual(prevProps.fm.errors[name], nextProps.fm.errors[name]) &&
        lodash.isEqual(prevProps.fm.touched[name], nextProps.fm.touched[name])
    );
});
