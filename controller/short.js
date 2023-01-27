import shortUrl from '../model/shortStore.js';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';

export const createShortURL = async (req, res) => {
    console.log('APICALL', req.body.full)
    console.log('NANOID', nanoid());

    var query = { full: req.body.full }
    var update = { short: nanoid() }
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };

    if (!validUrl.isUri(req.body.full)) {
        return res.status(401).json({
            message: 'Unable to shorten that link. It is not a valid url!'
        })
    }

    try {
        const shortURL = await shortUrl.findOneAndUpdate(query, update, options);
        console.log('shortURL', shortURL)
        res.send(shortURL);
    }
    catch (err) {
        res.status(501).json({
            message: 'Something went wrong! Please Try Again'
        })
    }
}

export const getShortURL = async (req, res) => {
    try {
        const short = await shortUrl.findOne({ short: req.params.shortUrl });
        res.redirect(`${short.full}`);
    } catch (err) {
        res.sendStatus(404);
    }
}