import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export const LogOut = () => {
	return (
		<div>
			<button onClick={() => signOut(auth)}>Log out</button>
		</div>
	)
}
