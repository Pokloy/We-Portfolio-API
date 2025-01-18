import { Request, Response } from 'express';
import mongoose from 'mongoose';

const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");

export const userRegistration = (req: Request, res: Response): any => {
    let newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    return newUser.save().then((user, error) => {
        if(error){
            return res.status(400).send({
                message: 'No user has been registered',
                user: newUser,
            });
        } else {
            return res.status(200).send({
                message: 'New User created successfully',
                user: newUser,
            });
        }
    })
}

export const userLogin = (req: Request, res: Response): any => {
    try {
        return User.findOne({ username: req.body.username }).then( result => {
            if(result == null){
                return false;
            } else {
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                if(isPasswordCorrect){
                    return res.send({access:auth.createAccessToken(result)});
                } else {
                    return res.send("Login Failed");
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred on logging in.' });
    }
}