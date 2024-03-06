
export const postReq = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    const data = await response.json()

    if (!response.ok) {
        let message = 'An error occured....'
        if (data?.msg) {
            message = data.msg
        } else {
            message = data
        }
        return { error: true, msg: message }
    }
    return data;
}

export const getReq = async (url) => {
    const response = await fetch(url)

    const data = await response.json()

    if (!response.ok) {
        let message = 'An error occured....'
        if (data?.msg) {
            message = data.msg
        } else {
            message = data
        }
        return { error: true, msg: message }
    }
    return data;
}

export const patchReq = async (url) => {
    const response = await fetch(url, {
        method: 'PATCH'
    }
    )
    const data = await response.json()

    if (!response.ok) {
        let message = 'An error occured....'
        if (data?.msg) {
            message = data.msg
        } else {
            message = data
        }
        return { error: true, msg: message }
    }
    return data;
}
