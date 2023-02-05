

const current = (req, res) => {
    const { email, name, phone, city, token, birthday } = req.user;
    res.json({
        token,
        status: "Success",
        code: 200,
        data: {
            name,
            email,
            birthday,
            phone,
            city
        }
    })
}

module.exports = current;