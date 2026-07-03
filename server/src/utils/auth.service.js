import jwt from "jsonwebtoken";
const getToken = async (user) => {
    try{
        const payload = {id: user._id};
        
        const token = await jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1d",
        });

        res.cookie("Oreo",token,{
            maxAge: 1000*60*60*24,
            httpOnly:true,
            secure:false,
            sameSite:"lax",
        })
    } catch (error) {}
};