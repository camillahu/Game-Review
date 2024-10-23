import React from "react";
import { Link } from "react-router-dom";

export default function NavbarItem({name, text, setSelectedItem, selectedItem}) 
{
    const select = () =>
    {
        let newItem = name;
        setSelectedItem(newItem);
    }
        return <span className="lead"><Link onClick={select} className="" to={name}>{text}</Link></span>
}