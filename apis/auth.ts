import axios from "@apis/instance";

interface ILoginApiData {
    accessToken : string,
    refreshToken : string,
    nickname : string,
    userId : string
}

export async function loginApi(username : string, password : string) : Promise<ILoginApiData> {
    try {
        const response = await axios.post(
            "/auth/login",
            { data : { username, password } }
        )

        return response.data;
    } catch(e : any) {
        throw e.errorMessage ? e.errorMessage : "알 수 없는 오류가 발생했습니다"
    }
}

export async function checkUsernameApi(username : string) {
    try {
        const response = await axios.get("/auth/checkUsername", {
            data : { username }
        })

        return response.status === 200;
    } catch(e : any) {
        throw e.errorMessage ? e.errorMessage : "알 수 없는 오류가 발생했습니다"
    }
}

export async function registerApi(name : string, username : string, password : string, workIdList : any) {
    try {
        const response = await axios.post("/auth/register", {
            data : { name, username, password, workIdList }
        })

        return response.data;
    } catch(e : any) {
        throw e.errorMessage ? e.errorMessage : "알 수 없는 오류가 발생했습니다"
    }
}