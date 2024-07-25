import React from "react";

export interface TextFieldModel {
    name: string;
}

export interface TextFieldProps {
    props: TextFieldModel,
    type?: "text" | "number";
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({props, type, value, onChange}) => {
    return (
        <input
            type={type}
            id="price"
            placeholder={props.name}
            value={value}
            className="bg-gray-200/40 py-4 mt-1 block w-full border border-gray-200 rounded-md shadow-sm px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={onChange}
            required
        />
    )
}

export default TextField;