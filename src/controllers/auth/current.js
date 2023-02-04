

const current = (req, res) => {
    const { email, name, phone, city, token } = req.user;
    res.json({
        token,
        user: {
            email,
            name,
            phone,
            city,
        }
      
    })
}

module.exports = current;