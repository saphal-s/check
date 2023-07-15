const Banner = require('../models/banner');

 exports.create= async(req,res)=>{
    try {
        const banner = await new Banner()
            if (req.file) {
                banner.image = req.file.path
            }
            banner.save();
            res.json(banner);
    } catch (err) {
        console.log('Banner update error',err);
        return res.status(400).send('Banner update failed');
    }
}

exports.display = async(req,res)=>{
    let banners = await Banner.find({})
    .sort([["createdAt","desc"]])
    .exec();
    res.json(banners);
};

exports.remove = (req,res)=>{
    const id=req.params.id
    Banner.findByIdAndRemove(id)
    .then((result)=>{
        res.status(200).json({result:"Product add. is successfully deleted"})
    })
    .catch((err)=>{ 
        console.log(err)
    })
}