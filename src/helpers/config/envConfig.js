export const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "https://money-manager-api-sand.vercel.app/api/v1"
}
export const baseUrl = () => {
    return process.env.BASE_URI || "https://money-manager-api-sand.vercel.app/"
}