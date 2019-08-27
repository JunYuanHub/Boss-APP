
export function getRedirectPath({type,avatar}) {
    let url=(type==='employee'?'/employee':'/employer');
    if(!avatar){
        url+='Info'
    }
    return url
}

export function getChatId(userid,targetid){
    return [userid,targetid].sort().join('_')
}