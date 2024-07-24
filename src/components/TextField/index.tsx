import React, {FC} from "react";

export interface TextFieldModel {
    name: string;
}

export interface TextFieldProps {
    props: TextFieldModel
}

const TextField: React.FC<TextFieldProps> = ({props}) => {
    return (
        <input
            type="text"
            id="price"
            placeholder={props.name}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    )
}

export default TextField;