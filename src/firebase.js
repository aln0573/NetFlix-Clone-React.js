import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyAZgcEB2wVYgJenAt4B4O-0u4w2ipL_AQA",
    authDomain: "netflix-clone-b2d15.firebaseapp.com",
    projectId: "netflix-clone-b2d15",
    storageBucket: "netflix-clone-b2d15.firebasestorage.app",
    messagingSenderId: "362396408963",
    appId: "1:362396408963:web:705a4cadeecd6135508fb6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth)
}

export {
    auth,
    db,
    login,
    signup,
    logout
}