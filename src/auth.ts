import jwt from 'jsonwebtoken';

const secret = 'alierPortfolioAPI';

export const createAccessToken = (user: { _id: string; email: string; isAdmin: boolean }) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(data, secret, {});
};

export const verify = (req: any, res: any, next: any): any => {
    console.log(req.headers.authorization);

    let token = req.headers.authorization;

    if (typeof token === 'undefined') {
        return res.send({ auth: 'Failed. No Token!' });
    } else {
        token = token.slice(7, token.length);
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.send({
                    auth: 'Failed',
                    message: err.message,
                });
            } else {
                req.user = decodedToken;
                next();
            }
        });
    }
};
