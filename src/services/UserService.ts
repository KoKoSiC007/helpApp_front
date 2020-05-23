export default class UserService {
    private url: string = 'http://localhost:5000/api/auth/'

    public logIn(user: { email: string | null; password: string | null }) {
        return fetch(`${this.url}?email=${user.email}&password=${user.password}`, {method: "POST"})
            .then((response:any) => response.json())
            .then((result: any) => localStorage.setItem("token", result.access_token))
            .catch((error: any) => console.error('error', error));
    }
    public logOut():void {
        localStorage.clear();
    }
}

