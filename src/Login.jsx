import { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "./UserContext";
import http from "./http";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookies";
import { Alert } from "@material-tailwind/react";


function Login() {
  const [showAlert, setShowAlert] = useState(false); // State to manage alert display
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setEmail: setLoggedInEmail, setId, email: ContextEmail, token, setToken } = useContext(UserContext);
  const navigate = useNavigate()
  
  const login = async (ev) => {
    ev.preventDefault();
    try {
      const {user} = await http.POST("/users/login", { email, password })
      const {email: backendEmail, _id} = user
      
      setLoggedInEmail(backendEmail);
      setId(_id);
      setToken(cookies.getItem("token"))
      navigate("/");
      
    } catch (error) {
      console.log(error);
      setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false); // Hide the alert after 5 seconds
          }, 3000);
    }
  }

  return (
    <>
    {showAlert && (
        <Alert className="fixed mt-8 top-4 left-1/2 transform -translate-x-1/2 z-20" color="red">خطأ في اسم المستخدم او كلمة المرور</Alert>
      )}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/Reset"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/Signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Signup Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
