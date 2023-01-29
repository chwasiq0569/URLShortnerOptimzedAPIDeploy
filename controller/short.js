import shortUrl from '../model/shortStore.js';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import moment from 'moment';
import URI from "uri-js";

const fixURL = (url) => {
    if (!URI.parse(url).scheme) {
        return 'http://' + url;
    } else return url;
}

export const createShortURL = async (req, res) => {
    console.log('APICALL', !validUrl.isUri(req.body.full))
    console.log('NANOID', nanoid());
    console.log('URI', fixURL(req.body.full));

    if (!validUrl.isUri(fixURL(req.body.full))) {
        return res.status(401).json({
            message: 'Unable to shorten that link. It is not a valid url!'
        })
    }
    try {
        const found = await shortUrl.find({ full: req.body.full }).sort({ createdAt: -1 }).limit(1);
        if (found.length > 0) {
            let hours = moment().diff(moment(found[0].createdAt), 'hours');
            console.log("hours", hours)
            if (hours >= 5) {
                const shortURL = await shortUrl.create({ full: req.body.full, short: nanoid() });
                console.log('shortURL', shortURL)
                res.send(shortURL);
            } else {
                res.send(found[0]);
            }
        } else {
            const shortURL = await shortUrl.create({ full: req.body.full, short: nanoid() });
            console.log('shortURL', shortURL)
            res.send(shortURL);
        }
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