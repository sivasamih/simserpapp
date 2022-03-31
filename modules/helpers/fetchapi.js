// return Promise
export const Fetch = async (Url, params, headers) => {
    return await fetch(Url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(params)
    });
}

//return data and status as per API response.
export const APICALL = async (Url, params, headers) => {
    let response = {
        data: null,
        status: false
    };
    try {
        const res = await fetch(Url, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(params)
        });
        if (res.status === 200) {
            response.data = await res.json();
            response.status = true;
            return response;
        } else {
            response.status = false;
            return response;
        }
    } catch (ex) {
        response.status = false;
        return response;
    }
}