import React, { createContext, useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, updateProfile,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function AuthProvider({ children }) {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('')
    const [loading, setLoading] = useState(true);

    const googleHandler = () => {
        setLoading(true);
        console.log('google btn clicked')
        return signInWithPopup(auth, googleProvider)
    }
    const githubHandler = () => {
        setLoading(true);
        console.log('github btn clicked')
        return signInWithPopup(auth, githubProvider)
    }

    const registerWithEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name,image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:image
        })
    }

    const updateUserPassWord = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        signOut(auth).then(() => {
            setUserName(null)
            setPhotoUrl('')
        }).catch((error) => {
            // An error happened.
        });
    }

        // observer user auth state 
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, currentUser => {
                setUserName(currentUser?.displayName);
                setUserEmail(currentUser?.email)
                setPhotoUrl(currentUser?.photoURL)
                setLoading(false);
                if (currentUser && currentUser?.email) {
                    const loggedUser = {
                        email: currentUser.email
                    }
                    fetch('https://photography-campus-server.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },     
                        body: JSON.stringify(loggedUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            localStorage.setItem('access-token',data.token)
                        })
                }
                else{
                    // console.log('not fount email')
                    localStorage.removeItem('access-token')
                }
            });
    
            // stop observing while unmounting 
            return () => {
                return unsubscribe();
            }
        }, [])

    const authProvider = {
        loading,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        photoUrl,
        setPhotoUrl,
        githubHandler,
        googleHandler,
        registerWithEmail,
        updateUserProfile,
        updateUserPassWord,
        logInUser,
        logOut
    }

    return (
        <AuthContext.Provider value={authProvider}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider