import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import './AddDish.css'
import axios from "axios";

const options = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" }
];

const AddDish = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [imgURL, setImgURL] = useState();
    const onSubmit = (data) => {
        console.log({ ...data, imgURL });
        axios.post('https://fathomless-bayou-79225.herokuapp.com/addProduct', {
            ...data, imgURL
        })
            .then(function (response) {
                const url = response.data.data.display_url;
                setImgURL(url);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const [values, setReactSelect] = useState({
        selectedOption: []
    });

    const handleUploadImage = (event) => {
        document.getElementById("submitBtn").setAttribute("disabled", "");
        document.getElementById("submitBtn").value = "Uploading Image!"
        const img = event.target.files[0];
        const imgData = new FormData();
        imgData.set("key", "5cc92beddf63f7dc55cb81cb7d04e498")
        imgData.append('image', img);
        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(function (response) {
                const url = response.data.data.display_url;
                setImgURL(url);
                document.getElementById("submitBtn").removeAttribute("disabled");
                document.getElementById("submitBtn").value = "Uploaded!"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleMultiChange = (selectedOption) => {
        const selectedValue = selectedOption.label;
        setValue("category", selectedValue);
        setReactSelect({ selectedValue });
    };


    return (
        <div className="addDish">
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="Name">Name</label>
                <input placeholder="Dish Name" {...register("Name")} />

                <label htmlFor="description">Description</label>
                <input placeholder="Dish Description" {...register("description")} />

                <label htmlFor="price">price</label>
                <input
                    placeholder="price"
                    type="number"
                    {...register("price")}
                />

                <label className="reactSelectLabel">React select</label>
                <Select
                    className="reactSelect"
                    name="category"
                    placeholder="Category"
                    options={options}
                    onChange={handleMultiChange}
                    noMulti
                />
                <label htmlFor="Upload Image">Upload Image</label>
                <input type="file" placeholder="Upload Image" onChange={handleUploadImage} />
                <input id="submitBtn" type="submit" />
            </form>
        </div>
    );
};

export default AddDish;