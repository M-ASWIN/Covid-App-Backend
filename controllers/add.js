import db from '../db.js';

export const Addlocations = (req, res) => {
    const date = req.body.heldon;
    const q = 'INSERT INTO bookslot(location, dose, heldon, s1, s2, s3, slot1, slot2, slot3) VALUES(?, ?, STR_TO_DATE(?, \'%d-%m-%Y\'), ?, ?, ?, ?, ?, ?)';

    const values = [
        req.body.location,
        req.body.dose,
        date,
        req.body.s1,
        req.body.s2,
        req.body.s3,
        req.body.slot1,
        req.body.slot2,
        req.body.slot3,
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("New Location added successfully");
    });
};

export const Getlocations=(req,res)=>{
    const q='SELECT * FROM bookslot';
    db.query(q,[],(err,data)=>{
        // console.log(data);
        if(err)return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const Viewlocation=(req,res)=>{
    const q='SELECT * FROM bookslot WHERE location= ? AND heldon=?';
    
    db.query(q,[req.body.selectloc,req.body.selectdate],(err,data)=>{
        if(err)return res.status(500).json(err);
        // console.log(data);
        return res.status(200).json(data);
    })
}