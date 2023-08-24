import User from "../models/User.js"
export const signup = async (req, res) => {
    try {
        const { email, firstName, password } = req.body;
        if (!email || !firstName || !password) {
            return res.status(400).json({
                success: false,
                message: 'Credentials not found',
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(500).json({
                success: false,
                message: 'Email already registered',
            })
        }
        const newUser = new User({
            email: email,
            password: password,
            firstName: firstName
        })
        newUser.save();
        return res.status(200).json({
            success: true,
            message: "registered successfully"
        })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: 'all fields are required'
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not exists'
            })
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        const token = await user.generateToken();
        res.cookie('AuthToken', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
        })
        return res.status(200).json({
            success: true,
            message: 'user logged in successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie('AuthToken', '', { maxAge: 0 });
        return res.status(200).json({
            success: true,
            message: 'user logged out successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
