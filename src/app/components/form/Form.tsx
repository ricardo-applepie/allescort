'use client';

import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";
import { postData } from "@/utils/utils";
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

import './form.scss';

import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { setAuthState } from '@/redux/auth/auth';

type FormType = "login" | "signup";

interface FormProps {
  type: FormType;
}

export default function Form(props: FormProps) {
  const { type } = props;
  const isLogin = type === "login";
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Initial form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const createUser = async (user: any) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid, // optional but useful to store again
        email: user.email,
        type: "escort", // or "client"
        subscription: "free", // default
        coins: 0,
        createdAt: new Date(),
      });
      toast.success("Account has been created!");
    } catch (error) {
      console.error("Error creating user profile:", error);
      toast.error("Account not created, check Email or password");
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await createUser(user); // 👈 Create Firestore user doc here
      router.push('/boostProfile');
    } catch (error: any) {
      console.error("Signup error:", error.message);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setAuthState(user));
      // You can fetch additional profile info from Firestore here if needed
      router.push('/boostProfile');
    } catch (error: any) {
      console.error("Signin error:", error.message);
      toast.error("email or password is wrong");
    }
  };

  // Handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const endpoint = isLogin ? "/api/v1/login" : "/api/v1/signup";
    setLoading(true);

    try {
        // const response = await postData(endpoint, formData);
        if (isLogin) {
          const { email, password } = formData;
          signin(email, password);
        } else {
          const { email, password } = formData;
          signup(email, password);
        }
        // if (response.token) {
        //   window.localStorage.setItem("authToken", response.token);
        //   // router.push('/');
        // }
        setLoading(false);

    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <div className="form-container">
      <div className="form-inner">
        <h1 className="form-title">
          {isLogin ? "Seconds to Login!" : "Seconds to Sign Up!"}
        </h1>
        <form className="form" onSubmit={handleSubmit}>
           {!isLogin && (
            <> 
              {/* Username */}
              <div className="input-group">
                <label htmlFor="username">Nick Name</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>   
            </>
           )}

          {/* email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="button-group">
            <button
              className="submit-button"
              type="submit"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
            {loading && <div className="loading">loading...</div>}
            {isLogin && (
              <Link
                className="forgot-password-link"
                href="/password-forgot"
              >
                Forgot Password?
              </Link>
            )}
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Additional Links */}
          <div className="additional-links">
            <Link
              className="create-account-link"
              href={"/signup"}
            >
              Create new Account
            </Link>
            <div className="or-text">--- Or ---</div>
            <Link
              className="post-ad-link"
              href={"/newAd"}
            >
              Post new ad
            </Link>
          </div>

          <p className="footer-text">
            &copy;2024 Escort. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
};
