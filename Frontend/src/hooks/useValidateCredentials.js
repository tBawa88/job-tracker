import { useState } from "react";
import customFetch from "../utils/customFetch";

const useValidateCredentials = () => {

    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)
    const [isCheckingPassword, setIsCheckingPassword] = useState(false);


    const checkUsernameUnique = async (name) => {
        try {
            const response = await customFetch.post('/auth/check-username', { name })
            setUsernameErrorMessage(response.data.message)
            setIsUsernameInvalid(false)
        } catch (error) {
            const { response } = error
            setUsernameErrorMessage(response.data.message)
            setIsUsernameInvalid(true)
        }
    }
    const checkPasswordValid = async (password) => {
        try {
            const response = await customFetch.post('/auth/check-password', { password })
            setPasswordErrorMessage(response.data.message)
            setIsPasswordInvalid(false);
        } catch (error) {
            const { response } = error;
            setPasswordErrorMessage(response.data.message)
            setIsPasswordInvalid(true)
        }
    }

    return {
        usernameErrorMessage,
        isUsernameInvalid,
        isCheckingUsername,
        passwordErrorMessage,
        isPasswordInvalid,
        isCheckingPassword,
        checkUsernameUnique,
        checkPasswordValid,
        setIsCheckingPassword,
        setIsCheckingUsername
    }

}

export default useValidateCredentials;