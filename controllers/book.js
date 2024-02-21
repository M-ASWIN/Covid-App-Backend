import db from "../db.js";


export const Book=(req,res)=>{
    // console.log(req.body);
    const book=req.body.book;
    const val=req.body.slotname;

    const q='INSERT INTO booked(name,age,sltcount,gender,address,location,bookedon,slot) values(?)';
    // const q = 'INSERT INTO booked(name, age, sltcount, gender, address, location, bookedon, slot) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const values=[
        book.name,
        book.age,
        book.sltcount,
        book.gender,
        book.address,
        req.body.selectloc,
        req.body.selectdate,
        req.body.selectslot
    ]

    db.query(q,[values],(err,data)=>{
        if(err)return res.status(500).json(err);

        // const p=`UPDATE  bookslot SET  ${val}=? WHERE location=? AND  helodon=?`;
        const p = `UPDATE bookslot SET ${val} = ? WHERE location = ? AND heldon = ?`;
        const v=[
            req.body.value,
            req.body.selectloc,
            req.body.selectdate
        ] 
        db.query(p,v,(err,data)=>{
            if(err)return res.status(500).json("error in update");
            return res.status(200).json("created Successfully");
        })
    })
}