
const request = async (options, tokenCheck = true) => {
    if(tokenCheck) await checkToken(options.signal);
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    let token = localStorage.getItem(process.env.ACCESS_TOKEN);

    if(token) {
        headers.append('Authorization', 'Bearer ' + token)
    }

    const defaults = {headers: headers, cache: 'no-store'};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};
export async function createEnterpriseUser(user,signal){
    return request({
        url: "http://localhost:3002/users/create",
        method: 'POST',
        body: JSON.stringify(user),
        signal: signal
    })
}

export async function getUsers(signal){
    return request({
        url: "http://localhost:3002/users/allUsers",
        method: 'GET',
        signal: signal
    })
}

export async function getEnterpriseUsers(signal){
    return request({
        url: "http://localhost:3002/users/enterpriseUsers",
        method: 'GET',
        signal: signal
    })
}

export async function removeUser(id){
    return request({
        url: "http://localhost:3002/users/remove",
        method: 'DELETE',
        body: JSON.stringify(id)
    })
}

export async function updateUser(user){
    return request({
        url: "http://localhost:3002/users/updateUser",
        method: 'PUT',
        body: JSON.stringify(user)
    })
}

export async function changePassword(passRequest,signal) {
    return request({
        url: "http://localhost:3002/users/changePassword",
        method: 'PUT',
        body: JSON.stringify(passRequest),
        signal: signal
    },false);
}

export async function login(loginRequest,signal) {
    return request({
        url: "http://localhost:3002/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest),
        signal: signal
    },false);
}

export async function logout(signal) {
    return request({
        url: "http://localhost:3002/auth/logout",
        method: 'POST',
        signal: signal
    });
}


export function createProject(project,signal){
    return request({
        url: "http://localhost:3002/projects/createProject",
        method: 'POST',
        body: JSON.stringify(project),
        signal: signal
    })
}

export async function getProjects(signal,role){
    if( role === "admin" ){
        return request({
            url: "http://localhost:3002/projects/getAllProjects",
            method: 'GET',
            signal: signal
        })
    }
    else{
        return request({
            url: "http://localhost:3002/projects/getProjects",
            method: 'GET',
            signal: signal
        })
    }
}

export async function updateProject(project){
    return request({
        url: "http://localhost:3002/projects/updateProject",
        method: 'PUT',
        body: JSON.stringify(project)
    })
}

export async function removeProject(appId){
    return request({
        url: "http://localhost:3002/projects/removeProject",
        method: 'DELETE',
        body: JSON.stringify(appId)
    })
}

export async function getEnterprises(signal){
    return request({
        url: "http://localhost:3002/enterprises/getEnterprises",
        method: 'GET',
        signal: signal
    })
}

export async function createEnterprise(enterprise,signal){
    return request({
        url: "http://localhost:3002/enterprises/createEnterprise",
        method: 'POST',
        body: JSON.stringify(enterprise),
        signal: signal
    })
}

export async function updateEnterprise(enterprise){
    return request({
        url: "http://localhost:3002/enterprises/updateEnterprise",
        method: 'PUT',
        body: JSON.stringify(enterprise)
    })
}

export async function removeEnterprise(id){
    return request({
        url: "http://localhost:3002/enterprises/removeEnterprise",
        method: 'DELETE',
        body: JSON.stringify(id)
    })
}

export async function getBilling(billing,signal){
    return request({
        url: "http://localhost:3002/billing/getBilling",
        method: 'POST',
        body: JSON.stringify(billing),
        signal: signal
    })
}

export async function getAttendance(attendance,signal){
    return request({
        url: "http://localhost:3002/attendance/v1/getConferenceAttendance",
        method: 'POST',
        body: JSON.stringify(attendance),
        signal: signal
    })
}

export async function getOngoingPeers(roomId,signal){
    return request({
        url: "http://localhost:3002/suhangApi/getRoomPeers",
        method: 'POST',
        body: JSON.stringify(roomId),
        signal: signal
    })
}

export async function getConference(history,signal){
    return request({
        url: "http://localhost:3002/conference/getHistory",
        method: 'POST',
        body: JSON.stringify(history),
        signal: signal
    })
}

export async function getConferenceByMonth(history,signal){
    return request({
        url: "http://localhost:3002/conference/getHistoryByMonth",
        method: 'POST',
        body: JSON.stringify(history),
        signal: signal
    })
}

export async function getConferenceByUser(userInfo,signal){
    return request({
        url: "http://localhost:3002/conference/getEventsByUser",
        method: 'POST',
        body: JSON.stringify(userInfo),
        signal: signal
    })
}

export async function checkToken(signal){
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    if( localStorage.getItem(process.env.EXPIRE_AT) && Date.now() > localStorage.getItem(process.env.EXPIRE_AT) ){
        const refreshHeaders = headers;
        refreshHeaders.append('Authorization', 'Bearer ' + localStorage.getItem(process.env.REFRESH_TOKEN))
        let options;
        if(signal) options = { method: 'POST' , headers: refreshHeaders, signal: signal };
        else options = { method: 'POST' , headers: refreshHeaders }
        const res = await (await fetch("http://localhost:3002/auth/refreshToken",
            options )).json()
        localStorage.setItem(process.env.ACCESS_TOKEN, res.access_token);
        localStorage.setItem(process.env.REFRESH_TOKEN, res.refresh_token);
        localStorage.setItem(process.env.EXPIRE_AT, res.expire_at);
        return true;
    }
    else return true;
}