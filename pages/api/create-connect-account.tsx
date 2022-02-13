const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req: any, res: any) => {
    try {
        // Stripe用の connected accountを作成する
        // このタイミングでアカウントのタイプを選択する（今回は'express'）
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'JP',
        })

        // 作成したconnected accountのidから口座登録用のURLを発行する。
        const origin = process.env.NODE_ENV === 'development' ? `http://${req.headers.host}` : `https://${req.headers.host}`
        const accountLinkURL = await generateAccountLink(account.id, origin)
        res.statusCode = 200
        // res.json(accountLinkURL)
        res.redirect(303, accountLinkURL);
    } catch (err: any) {
        res.status(500).json(err.message);
    }
}

function generateAccountLink(accountID: any, origin: any) {
    return stripe.accountLinks.create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `${origin}/onboard-user/refresh`,
        return_url: `${origin}/success`,
    }).then((link: any) => link.url);
}

