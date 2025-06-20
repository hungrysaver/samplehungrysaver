import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  isApproved: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, userData: any) => {
    // Check if user already exists with different role
    const existingUserQuery = query(
      collection(db, 'users'), 
      where('email', '==', email)
    );
    const existingUserSnapshot = await getDocs(existingUserQuery);
    
    if (!existingUserSnapshot.empty) {
      const existingUser = existingUserSnapshot.docs[0].data();
      if (existingUser.userType !== userData.userType) {
        throw new Error(`This email is already registered as ${existingUser.userType}. Please use a different email or login with the correct role.`);
      }
    }

    // Check volunteer requests for existing email
    if (userData.userType === 'Volunteer') {
      const volunteerQuery = query(
        collection(db, 'volunteer_requests'),
        where('email', '==', email)
      );
      const volunteerSnapshot = await getDocs(volunteerQuery);
      
      if (!volunteerSnapshot.empty) {
        throw new Error('This email is already registered as a volunteer. Please login instead.');
      }
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user data to Firestore
    if (userData.userType === 'Volunteer') {
      await addDoc(collection(db, 'volunteer_requests'), {
        uid: user.uid,
        email: user.email,
        firstName: userData.firstName,
        userType: userData.userType,
        education: userData.education,
        location: userData.location,
        status: 'pending',
        approved: false,
        createdAt: new Date()
      });
    } else {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        firstName: userData.firstName,
        userType: userData.userType,
        approved: true,
        createdAt: new Date()
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Check if user is admin (using environment variable or hardcoded admin email)
        const adminEmail = 'admin@hungrysaver.org'; // You can also use import.meta.env.VITE_ADMIN_EMAIL
        
        if (user.email === adminEmail) {
          // First admin login - create admin record if doesn't exist
          const adminDoc = await getDoc(doc(db, 'admin', 'settings'));
          if (!adminDoc.exists()) {
            await setDoc(doc(db, 'admin', 'settings'), {
              adminEmail: user.email,
              createdAt: new Date()
            });
          }
          setUserRole('Admin');
          setIsApproved(true);
        } else {
          // Check user role and approval status
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.userType);
            setIsApproved(userData.approved || false);
          } else {
            // Check volunteer requests by email
            const volunteerQuery = query(
              collection(db, 'volunteer_requests'),
              where('email', '==', user.email)
            );
            const volunteerSnapshot = await getDocs(volunteerQuery);
            
            if (!volunteerSnapshot.empty) {
              const volunteerData = volunteerSnapshot.docs[0].data();
              setUserRole('Volunteer');
              setIsApproved(volunteerData.approved || false);
            } else {
              // User not found in any collection - this shouldn't happen
              setUserRole(null);
              setIsApproved(false);
            }
          }
        }
      } else {
        setUserRole(null);
        setIsApproved(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    isApproved,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};