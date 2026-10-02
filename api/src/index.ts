import express, {type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { randomBytes, randomInt } from 'node:crypto';

const app = express()

app.use(cors({
    origin: ["https://xksyu.cn", "https://www.xksyu.cn", "http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PWD: string = process.env.PWD ?? randomInt(1000000000,9999999999).toString()
let cookie_list = new Map<string, number>()

app.post('/admiao/login', (req: Request, res: Response) => {
    const { password } = req.body;

    if (password === PWD) {
        const token = randomBytes(16).toString('hex');
        const expireTime = Date.now() + 15 * 60 * 1000;

        cookie_list.set(token, expireTime);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        })

        return res.status(200).json({ success: true, message: '' })
    } else {
        return res.status(401).json({ success: false, message: '' })
    }
})

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    const expireTime = token ? cookie_list.get(token) : null;
    if (!token || !expireTime || expireTime < Date.now()) {
        return res.status(401).json({ success: false, message: '' });
    }
    next();
}

app.post('/admiao/post_info', authMiddleware, (req: Request, res: Response) => {
    const { title, abstract, part, tag } = req.body;


});

app.post('/admiao/post_file', authMiddleware, (req: Request, res: Response) => {



});


app.post('/admiao/esa_cache_flush', authMiddleware, (req: Request, res: Response) => {

});

app.post('/admiao/esa_ip_flush', authMiddleware, (req: Request, res: Response) => {

});

app.listen(3000)