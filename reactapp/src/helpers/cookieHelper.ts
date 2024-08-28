import DateHelper from "./dateHelper";

class CookieHelper {
    static setCookie = (cookieName: string, cookieValue: string, expiredIn: number = 30): void => {
        const expirationDate = DateHelper.getCurrentDateTime();
        expirationDate.setDate(expirationDate.getDate() + expiredIn);
        const expiresUTC = expirationDate.toUTCString();
    
        document.cookie = cookieName + "=" + cookieValue + "; expires=" + expiresUTC + "; secure=true; samesite=none";
    }
    
    static getCookie = (cookieName: string): string | null => {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
    
            if (cookie.startsWith(cookieName + "=")) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        
        return null;
    }
    
    static removeCookie = (cookieName: string): void => {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure=true; path=/;";
    }
}

export default CookieHelper;