const db = require('../../db/config');

const Brand = {
    createBranding: async (user_id) => {
        const [rows] = await db.query('SELECT title, slogan, logo, background, email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok, default_language, primary_color, secondary_color, success_color, warning_color, danger_color, dark_color FROM branding WHERE user_id = ?', [user_id]);
        let brandingData = { user_id: user_id, title: null, slogan: null, logo: null, background: null, email: null, address: null, phone: null, facebook: null, linkedin: null, instagram: null, whatsapp: null, youtube: null, google: null, tiktok: null, xapp: null, default_language: null, primary_color: null, secondary_color: null, success_color: null, warning_color: null, danger_color: null, dark_color: null };
        if (rows.length > 0) {
            brandingData = rows[0];
        }
        const { title, slogan, logo, background, email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok, default_language, primary_color, secondary_color, success_color, warning_color, danger_color, dark_color } = brandingData;
        await db.query(`INSERT INTO branding (user_id, title, slogan, logo, background, email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok, xapp,default_language, primary_color, secondary_color, success_color, warning_color, danger_color, dark_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user_id, title, slogan, logo, background, email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok, xapp, default_language, primary_color, secondary_color, success_color, warning_color, danger_color, dark_color]);
    },

    updateBranding: async (id, data, user_id) => {
        const { title, slogan, logo, background, email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok, xapp, default_language } = data;
        await db.query(`UPDATE branding SET title = ?, slogan = ?, logo = ?, background = ?, email = ?, address = ?, phone = ?, facebook = ?, linkedin = ?, instagram = ?, whatsapp = ?, youtube = ?, google = ?, tiktok = ?,xapp = ?,default_language = ?, user_id = ? WHERE id = ?`, [title, slogan, JSON.stringify(logo), JSON.stringify(background), email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok, xapp, default_language, user_id, id]);
    },

    getBranding: async (id) => {
        const [rows] = await db.query('SELECT id, title, slogan, logo, background, email, address, phone, facebook, linkedin, instagram, whatsapp, youtube, google, tiktok,default_language,xapp FROM branding WHERE user_id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    updateColors: async (id, colors) => {
        const { primary_color, secondary_color, success_color, warning_color, danger_color, dark_color, mode } = colors;
        await db.query(`UPDATE branding SET primary_color = ?, secondary_color = ?, success_color = ?, warning_color = ?, danger_color = ?, dark_color = ?, mode = ? WHERE id = ?`,[primary_color, secondary_color, success_color, warning_color, danger_color, dark_color, mode, id]);
    },

    getColors: async (id) => {
        const [rows] = await db.query('SELECT mode,id, primary_color, secondary_color, success_color, warning_color, danger_color, dark_color FROM branding WHERE user_id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },
};

module.exports = Brand;
