export const validateData = (arr, body) => {
    console.log(body)
    // console.log(body?.)
    for (const key of arr) {
        if (!body?.[key]) {
            return `${key} is required`
        }
    }
    return true
}