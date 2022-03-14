/**
 * Function checks internet access
 * @returns {boolean}
 */
export const checkInternetConnected = (): boolean => {
    return window.navigator.onLine
}
