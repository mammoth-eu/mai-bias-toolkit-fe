export const getIsActive = (location: string, uri: string): string => {
    if (location.startsWith(uri)) {
        return "is-active"
    }
    return ""
}