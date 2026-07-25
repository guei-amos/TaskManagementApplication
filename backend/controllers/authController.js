import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res, next)=>{

    bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        user.save()
        .then(()=>{
            res.status(201).json({message: "Utilisateur crée !"})
        })
        .catch((error)=>{
            res.status(400).json({error})
        })
    })
    .catch((error)=>{
        res.status(500).json({error})
    })
    

}

export const login = (req, res, next)=>{

    User.findOne({email: req.body.email})
    .then((user)=>{
        if (!user) {
           return res.status(500).json({message: "Paire login/mot de passe incorrecte"})
        }else{
            bcrypt.compare(req.body.password, user.password)
            .then((valid)=>{

                if (!valid) {
                    return res.status(401).json({message: "Paire login/mot de passe incorrecte"})
                }

                res.status(200).json({
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    token: jwt.sign(
                        {
                        userId: user._id
                    },
                    process.env.JWT_SECRET,
                    {expiresIn: '24h'}
                )
                })
            })
            .catch(error =>{
                res.status(500).json({error})
            })
        }
    })
    .catch(error =>{
                res.status(500).json({error})
            })
}