import axios from "@apis/instance";

export async function getWorkDetailApi(accessToken: string, workId: string) {
    try {
        const response = await axios.get(
            "/work",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                params: { wrokId: workId }
            }
        )

        return response.data;
    } catch (e: any) {
        throw e.errorMessage ? e.errorMessage : "알 수 없는 오류가 발생했습니다"
    }
}

export async function putHeartedApi(accessToken: string, workId: string, like: boolean) : Promise<boolean> {
    try {
        const response = await axios.put(
            `/work/${workId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                param: {
                    like,
                }
            }
        )
        return response.status === 200;
    } catch (e : any) {
        throw e.errorMessage ?? "알 수 없는 오류가 발생했습니다"
    }
}