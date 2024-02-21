import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db.js';

export const login=(req,res)=>{
    const q='SELECT * FROM users WHERE username=? AND role=?';
    db.query(q,[req.body.username,req.body.role],(err,data)=>{
        if(err)return res.status(400).json(err);
        if(data.length===0) return res.status(400).json('User not found');
        const checkpassword=bcrypt.compareSync(req.body.password,data[0].password);
        if(!checkpassword) return res.status(400).json("Wrong username or Password");

        const token = jwt.sign({ id: data[0].id }, "secretkey");
        const {password,...others}=data[0];

        res.cookie("tokenkey",token,{
            httpOnly:true,
            secure:true
        }).status(200).json({ id: data[0].id, ...others })
    })
}


export const register=(req,res)=>{
    const p='SELECT * FROM users WHERE username=? AND email=?';
    const q='INSERT INTO users(username,email,role,password) VALUES(?)';

    db.query(p,[req.body.username,req.body.email],(err,data)=>{
        if(err)return res.status(500).json(err);
        if(data.length) return res.status(200).json("User already present");

        const salt=bcrypt.genSaltSync(10);
        const password=bcrypt.hashSync(req.body.password,salt);
        const values=[
            req.body.username,
            req.body.email,
            req.body.role,
            password,
        ]
        db.query(q,[values],(err,data)=>{
            if(err)return res.status(500).json(err);

            const userId = data.length+1; // Assuming your user ID is auto-incremented
            const token = jwt.sign({ id: userId }, "secretkey");
            const {password,...others}=req.body;

            res.cookie("tokenkey",token,{
                httpOnly:true,
                secure:true
            }).status(200).json({ id: userId, ...others })
        })
    })
}

export const getUsers=(req,res)=>{
    
}

export const profile=(req,res)=>{
    const token=req.cookies?.tokenkey;
    if(token){
        jwt.verify(token,'secretkey',(err,userData)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(userData);
        })
    }
    else{
        res.json("Not logged in");
    }
}