import { handleError } from "../helpers/handleError.js";
import Bloglike from "../models/bloglike.model.js";

export const doLike =  async(req, res, next) => {
 try {
    const { user, blogid } = req.body
    let like 
    like = await Bloglike.findOne({ user, blogid })
    if (!like) {
        const saveLike = new Bloglike({
            user, blogid
        })
        await saveLike.save()
    } else {
        await Bloglike.findByIdAndDelete(like._id)
    }

    const likeCount = await Bloglike.countDocuments({ blogid })
    
    res.status(200).json({
        likeCount
    })

 } catch (error) {
    next(handleError(500, error.message));
 }   
}

export const likeCount =  async(req, res, next) => {
 try {
    const { blogid, userid } = req.params
    const likeCount = await Bloglike.countDocuments({ blogid })
    
    let isUserLiked = false
    if (userid) {
        const getuserlike = await Bloglike.countDocuments({ blogid, user: userid })
        if (getuserlike > 0){
            isUserLiked = true
        }
    }  

    res.status(200).json({
        likeCount,
        isUserLiked
    })

 } catch (error) {
    next(handleError(500, error.message));
 }   
}

