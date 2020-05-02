export const login = (email, name, recipients, token) => {
    return {
        type: 'LOG_IN',
        payload: {
            email,
            name,
            recipients,
            token
        }
    }
}

export const logout = () => {
    return {
        type: 'LOG_OUT'
    }
}

export const changeRecipients = (recipients) => {
    return{
        type: 'CHANGE_RECIPIENTS',
        payload: {
            recipients
        }
    }
}