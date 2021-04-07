import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import Select from "react-select";


const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
];

const AddDish = () => {
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    const [values, setReactSelect] = useState({
        selectedOption: []
    });

    const handleMultiChange = (selectedOption) => {
        const selectedValue = selectedOption.label;
        setValue("reactSelect", selectedValue);
        setReactSelect({ selectedValue });
    };
    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="Name">Name</label>
                    <input placeholder="bill" {...register("Name")} />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <input placeholder="luo" {...register("description")} />
                </div>

                <div>
                    <label htmlFor="price">price</label>
                    <input
                        placeholder="price"
                        type="number"
                        {...register("price")}
                    />
                </div>
                <div>
                    <lable className="reactSelectLabel">React select</lable>
                    <Select
                        className="reactSelect"
                        name="filters"
                        placeholder="Filters"
                        options={options}
                        onChange={handleMultiChange}
                        noMulti
                    />
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddDish;