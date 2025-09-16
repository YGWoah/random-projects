import express from 'express';
import { getKey, saveKey } from './db.js';
const tokenRouter = express.Router();

const generateKey = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

tokenRouter.post('/generate', (req, res) => {
    let { url } = req.body;
    if (!url) {
        return res.status(400).json({ status: 'ERROR', message: 'URL is required' });
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    let a = generateKey();
    saveKey(a, url);
    res.json({ status: 'OK', id: a });
});


tokenRouter.get("/:url_key", (req, res) => {
    const { url_key } = req.params;
    let url = getKey(url_key);
    if (!url) {
        res.json({
            success: false,
            reason: "key not found"
        })
        return
    }
    res.redirect(url);
})




export default tokenRouter;
