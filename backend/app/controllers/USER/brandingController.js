const Brand = require('../../models/USER/brandingModel');

const brandingController = {
    updateBranding: async (req, res) => {
        const userId = parseInt(req.query.userId);
        const { id, title, slogan, logo, background, email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok,xapp,default_language } = req.body;
        try {
            if (id) {
                await Brand.updateBranding(id, {title, slogan, logo, background, email, address, phone,facebook, linkedin, instagram, whatsapp, youtube, google, tiktok,xapp,default_language}, userId);
                res.status(201).json({ status: 201, error: null, res: null });
            } else {
                res.status(400).json({ status: 400, error: 'Missing id in request body', res: null });
            }
        } catch (error) {
            res.status(500).json({ status: 500, error: error.message, res: null });
        }
    },
    
    getBranding: async (req, res) => {
        const userId = parseInt(req.query.userId);
        try {
            const brand = await Brand.getBranding(userId);
            if (!brand) {
                return res.status(404).json({ status: 404, error: `Brand with ID ${id} not found`,res:null });
            }
            res.status(200).json({ status: 200, res:brand,error:null });
        } catch (error) {
             res.status(500).json({ status: 500, error: error.message,res:null});
        }
    },
    updateColor: async (req, res) => {
        const { primary_color, secondary_color, success_color, warning_color, danger_color, dark_color,id,mode } = req.body;
        try {
            if(id){
                await Brand.updateColors(id,{primary_color, secondary_color, success_color, warning_color, danger_color, dark_color,mode});
                res.status(201).json({ status: 201, error: null, res:null });
            } else{
                res.status(400).json({ status: 400, error: 'Missing id in request body', res: null });
            }
        } catch (error) {
            res.status(500).json({ status: 500, error: error.message,res:null});
        }
    },
    getColors: async (req, res) => {
        let userId = parseInt(req.query.userId);
        try {
            userId = userId ? userId : 1;
            const brand = await Brand.getColors(userId);
            if (!brand) {
                return res.status(404).json({ status: 404, error: `Brand with ID ${id} not found`,res:null });
            }
            res.status(200).json({ status: 200, res:brand,error:null });
        } catch (error) {
             res.status(500).json({ status: 500, error: error.message,res:null});
        }
    }    
};

module.exports = brandingController;
