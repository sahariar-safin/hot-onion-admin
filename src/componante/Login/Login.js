import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const {
        register,
        getValues,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
                placeholder="Your email"
                type="text"
                {...register("email", {
                    required: "this is required",
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email address"
                    }
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="password">Password</label>
            <input
                placeholder="Your password"
                type="password"
                {...register("password", {
                    required: "This is required"
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input type="submit" />
            <div className="text-center">
                <button className="btn btn-dark signIn-btn">Sign In With Google</button>
                <button className="btn btn-dark signIn-btn">Sign In With Facebook</button>
            </div>
        </form>
    );
};

export default Login;