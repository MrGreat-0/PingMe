import { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authThunk";

import AuthImagePattern from "../components/AuthImagePattern";
import Loader from "../components/Loader";

import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState({
    pass1: false,
    pass2: false,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password) return toast.error("Password is required");
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return toast.error("Password must include a special character");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain at least one capital letter");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    const isValid = validateForm();
    if (!isValid) return;
    if (isValid === true) {
      dispatch(
        signup({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  if (isSigningUp) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  name="fullName"
                  autoComplete="name"
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChanges}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChanges}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  name="password"
                  type={showPassword.pass1 ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChanges}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      pass1: !prevState.pass1,
                    }))
                  }
                >
                  {showPassword.pass1 ? (
                    <EyeOff className="size-5 text-base-content/40 z-10" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 z-10" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  name="confirmPassword"
                  type={showPassword.pass2 ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChanges}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() =>
                    setShowPassword((prevState) => ({
                      ...prevState,
                      pass2: !prevState.pass2,
                    }))
                  }
                >
                  {showPassword.pass2 ? (
                    <EyeOff className="size-5 text-base-content/40 z-10" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 z-10" />
                  )}
                </button>
              </div>
            </div>

            {/* Password hint text */}
            <ul className="mt-2 text-xs list-disc list-inside space-y-1">
              <li
                className={
                  formData.password.length >= 8
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                At least 8 characters
              </li>

              <li
                className={
                  /[A-Z]/.test(formData.password)
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                Include a capital letter (A–Z)
              </li>

              <li
                className={
                  /[!@#$%^&*()<>,.]/.test(formData.password)
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                Include a special character (!@#$...)
              </li>

              {formData.confirmPassword && (
                <li
                  className={`${
                    formData.password === formData.confirmPassword
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? "✅ Passwords match"
                    : "❌ Passwords do not match"}
                </li>
              )}
            </ul>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
