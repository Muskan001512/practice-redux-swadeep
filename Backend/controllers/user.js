import Users from "../models/user.js"

export const getAllUsers = async (req, res) => {
    try {
        const userList = await Users.find()
        return { count: userList?.length, userList }
    } catch (error) {
        return { status: 0, message: error.message }
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users.findById(id)
        return user
    } catch (error) {
        return { status: 0, message: error.message }
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await Users.findByIdAndDelete(id)
        return deletedUser
    } catch (error) {
        return { status: 0, message: error.message }
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, age, email } = req.body
        const user = await Users.create({ name, age, email })
        return user
    } catch (error) {
        return { status: 0, message: error.message }
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findByIdAndUpdate(id, { $set: { age: 51 } })
        return user
    } catch (error) {
        return { status: 0, message: error.message }
    }
}