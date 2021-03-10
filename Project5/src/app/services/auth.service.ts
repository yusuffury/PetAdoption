import{ Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
interface user {
    uid: string
}
@Injectable()
export class AuthService{
    private user: user

    constructor( private afAuth: AngularFireAuth )
    { }//end
    setUser(user: user) {
		this.user = user
	}

    getUID(): string {
		return this.user.uid

	}
}