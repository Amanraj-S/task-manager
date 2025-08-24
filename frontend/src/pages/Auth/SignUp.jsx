import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
 
    let profileImageUrl = '';
    if (!fullName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-4xl mx-auto h-auto md:h-full mt-8 md:mt-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black text-center md:text-left">
          Create an Account
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 mt-2 mb-6 max-w-lg text-center md:text-left mx-auto md:mx-0">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="flex justify-center mb-4">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>

          {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}

          <button
            type="submit"
            className="btn-primary w-full md:w-auto px-6 py-2 sm:py-3 text-sm sm:text-base"
          >
            SIGN UP
          </button>

          <p className="text-xs sm:text-sm text-slate-800 mt-3 text-center md:text-left max-w-lg mx-auto md:mx-0">
            Already have an account?{' '}
            <Link className="font-medium text-blue-600 underline" to="/">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
