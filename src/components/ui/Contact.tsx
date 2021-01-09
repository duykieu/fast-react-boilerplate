import React from "react";
import _ from "lodash";
import { IUser } from "../../models/user";

interface IContactProps {
    contact: IUser;
}

const Contact: React.FunctionComponent<IContactProps> = ({ contact }) => {
    return (
        <div>
            {!!contact.phoneNumber && (
                <div>
                    <a href={`tel:${contact.phoneNumber}`}>
                        {`${contact.name || "Chưa rõ"} (${contact.phoneNumber})`}
                    </a>
                    {contact.phoneNumber2 && (
                        <a href={`tel:${contact.phoneNumber2}`}>
                            {" | "}
                            Số phụ ({contact.phoneNumber2})
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default React.memo(Contact, (p, n) => {
    return _.isEqual(p.contact, n.contact);
});
