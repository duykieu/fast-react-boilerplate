import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
    button {
        margin-right: 1rem;
    }
`;

interface IFormButtonsProps {
    loading?: boolean;
    onSave?: any;
    onSaveAndContinue?: any;
    onCancel?: any;
}

const FormButtons: React.FunctionComponent<IFormButtonsProps> = ({
    loading,
    onCancel,
    onSave,
    onSaveAndContinue
}) => (
    <Wrapper>
        <Button loading={loading} onClick={onSave} type="primary" style={{ marginRight: "1rem" }}>
            Lưu lại
        </Button>
        {onSaveAndContinue && (
            <Button
                loading={loading}
                onClick={onSaveAndContinue}
                type="primary"
                style={{ marginRight: "1rem" }}
            >
                Lưu và thêm mới
            </Button>
        )}

        <Button loading={loading} onClick={onCancel}>
            Hủy bỏ
        </Button>
    </Wrapper>
);

export default FormButtons;
