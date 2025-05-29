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
        if(!e.errorMessage) {
            throw e.errorMessage;
        }
        throw "알 수 없는 오류가 발생했습니다."
    }
}