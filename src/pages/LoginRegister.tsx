import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

const loginSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean(),
});

const registerSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Confirm password is required"),
});

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const LoginRegister: React.FC = () => {
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const { 
    register: registerLoginForm, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors } 
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const { 
    register: registerRegisterForm, 
    handleSubmit: handleRegisterSubmit, 
    formState: { errors: registerErrors },
    reset: resetRegisterForm
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onLogin = async (data: LoginFormData) => {
    try {
      await login(data.email);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleLogin = () => {
    toast.info("Google OAuth is not implemented in this demo");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const errorAnimation = {
    initial: { x: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>{tab === "login" ? "Login" : "Register"} | ClickGain PTC Platform</title>
        <meta name="description" content="Login or register to start earning with ClickGain, the premium paid-to-click platform." />
      </Helmet>

      <div className="flex min-h-screen bg-background">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary">ClickGain</h1>
              <p className="text-muted-foreground mt-2">
                {tab === "login" ? "Sign in to your account" : "Create a new account"}
              </p>
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full mb-8 grid grid-cols-2 gap-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {tab === "login" ? (
                  <TabsContent value="login" forceMount>
                    <motion.form
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                      onSubmit={handleLoginSubmit(onLogin)}
                    >
                      <motion.div variants={itemVariants}>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <motion.div
                              variants={errorAnimation}
                              animate={loginErrors.email ? "shake" : "initial"}
                            >
                              <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                className={`pl-10 ${loginErrors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                {...registerLoginForm("email")}
                              />
                            </motion.div>
                          </div>
                          {loginErrors.email && (
                            <p className="text-destructive text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {loginErrors.email.message}
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <motion.div
                              variants={errorAnimation}
                              animate={loginErrors.password ? "shake" : "initial"}
                            >
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`pl-10 ${loginErrors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                {...registerLoginForm("password")}
                              />
                            </motion.div>
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {loginErrors.password && (
                            <p className="text-destructive text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {loginErrors.password.message}
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="flex items-center">
                          <input
                            id="rememberMe"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            {...registerLoginForm("rememberMe")}
                          />
                          <Label htmlFor="rememberMe" className="ml-2 text-sm">
                            Remember me
                          </Label>
                          <a
                            href="#"
                            className="ml-auto text-sm text-primary hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging in..." : "Sign in"}
                        </Button>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="relative my-4">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted"></div>
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              Or continue with
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={handleGoogleLogin}
                        >
                          <svg
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                          >
                            <path
                              fill="currentColor"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                          </svg>
                          Sign in with Google
                        </Button>
                      </motion.div>
                    </motion.form>
                  </TabsContent>
                ) : (
                  <TabsContent value="register" forceMount>
                    <motion.form
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                      onSubmit={handleRegisterSubmit(onRegister)}
                    >
                      <motion.div variants={itemVariants}>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <motion.div
                              variants={errorAnimation}
                              animate={registerErrors.email ? "shake" : "initial"}
                            >
                              <Input
                                id="register-email"
                                type="email"
                                placeholder="your@email.com"
                                className={`pl-10 ${registerErrors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                {...registerRegisterForm("email")}
                              />
                            </motion.div>
                          </div>
                          {registerErrors.email && (
                            <p className="text-destructive text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {registerErrors.email.message}
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <motion.div
                              variants={errorAnimation}
                              animate={registerErrors.password ? "shake" : "initial"}
                            >
                              <Input
                                id="register-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`pl-10 ${registerErrors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                {...registerRegisterForm("password")}
                              />
                            </motion.div>
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {registerErrors.password && (
                            <p className="text-destructive text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {registerErrors.password.message}
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <motion.div
                              variants={errorAnimation}
                              animate={registerErrors.confirmPassword ? "shake" : "initial"}
                            >
                              <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`pl-10 ${registerErrors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                {...registerRegisterForm("confirmPassword")}
                              />
                            </motion.div>
                            <button
                              type="button"
                              onClick={toggleConfirmPasswordVisibility}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {registerErrors.confirmPassword && (
                            <p className="text-destructive text-sm flex items-center mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {registerErrors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating account..." : "Create account"}
                        </Button>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <p className="text-center text-sm text-muted-foreground">
                          By creating an account, you agree to our{" "}
                          <a href="#" className="text-primary hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </motion.div>
                    </motion.form>
                  </TabsContent>
                )}
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>

        <motion.div 
          className="hidden md:block md:w-1/2 bg-primary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-md text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">
                Start earning with ClickGain today
              </h2>
              <p className="mb-6">
                Join thousands of users who are already making money by viewing ads and referring friends.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>View ads and earn money instantly</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Refer friends to earn passive income</p>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Fast payments via multiple methods</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginRegister;
