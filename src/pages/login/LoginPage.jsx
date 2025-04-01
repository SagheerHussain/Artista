import { useState } from "react";
import { Link } from "react-router-dom";
import { loginAccount } from "../../../services/authService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logoSrc from "/Images/logo.png";
import authImage from "/Images/auth-illustration.png";
import { ClipLoader } from "react-spinners";
import { FaEye } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // navigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    console.log("form data", formData);
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginAccount(formData);
      console.log("user", user)
      if (user.success === true) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: user.message,
          timer: 1500,
        });
        // Stored token in localStorage
        localStorage.setItem("token", JSON.stringify(user.token));
        localStorage.setItem("user", JSON.stringify(user.user));
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      } else throw new Error(user.message);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 1500,
      });
    }
  };

  return (
    <div
      className="auth_layout flex justify-between items-center"
      style={{ backgroundColor: "#070a13", minHeight: "100vh" }}
    >
      {/* Left: Auth Form */}
      <div className="auth_children p-8 lg:w-[65vw]  xl:w-1/2 flex justify-center">
        <div
          className="auth_form p-10 flex flex-col items-center justify-center min-h-full lg:w-3/4"
          style={{ backgroundColor: "#12141d" }}
        >
          <div className="mb-6">
            <img
              src={logoSrc}
              alt="Artista Digitals"
              className="max-w-[200px]"
            />
          </div>
          <form onSubmit={handleLogin} className="auth_user_form w-full">
            <label htmlFor="" className="text-white text-sm pb-3">
              Email*
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border-none text-white focus:outline-none rouned-[25x]"
              style={{ backgroundColor: "#232839", borderRadius: "3px" }}
            />

            <div className="password w-full">
              <label htmlFor="" className="text-white text-sm mb-3">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 mb-4 border-none text-white focus:outline-none rouned-[15px]"
                  style={{ backgroundColor: "#232839", borderRadius: "3px" }}
                />
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white absolute top-1/2 right-1 -translate-y-full hover:text-[#eee] cursor-pointer -translate-x-1/2"
                />
              </div>
            </div>

            <button className="bg-[#878aff] hover:bg-[#767bfc] text-white px-8 py-1 text-lg rounded hover:text-white rouned-[15px] w-full font-semibold">
              {loading ? (
                <ClipLoader color="#fff" size={22} />
              ) : (
                "Login Account"
              )}
            </button>

            {/* <p className="mt-4 text-white">
              Dont have an account{" "}
              <Link
                to={`/register`}
                style={{ paddingRight: "5px" }}
                className="text-[#878aff] underline inline-block"
              >
                Register
              </Link>
              here
            </p> */}

            <div className="mt-4">
              <Link to={`/`} className="text-zinc-300 hover:text-zinc-400 underline">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="auth_image fixed top-0 right-0 lg:w-[35vw] xl:w-1/2 h-screen">
        <img
          src={authImage}
          alt="Auth Illustration"
          className="w-full"
          style={{ height: "100vh" }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
