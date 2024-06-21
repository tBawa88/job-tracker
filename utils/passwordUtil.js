import bcryptjs from 'bcryptjs'

export const hashPassword = async (password) => {
    const hashedPass = await bcryptjs.hash(password, 10);
    return hashedPass;
}


export const verifyPassword = async (password, hash) => {
    const result = await bcryptjs.compare(password, hash);
    return result;
}