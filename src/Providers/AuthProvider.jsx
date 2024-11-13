import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
export const AuthContext =  createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword (auth,email,password) 
    }
    const signIn =( email,password) => {
          setLoading(true)
          return signInWithEmailAndPassword(auth,email,password)
    }
   
     useEffect(() => {
        const  unsubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        });
        return () =>{
            return unsubscribe()
        }
    },[])
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }



    const authInfo = {
        user,
        loading,
        createUser,
        signIn

    }
   
    return (
        <AuthContext.Provider> 

            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;