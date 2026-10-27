import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Briefcase,
  Building,
  Sparkles,
  Paperclip,
  Plus,
  X,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ShaderBackground from "../../components/ShaderBackground";
import Toast from "../../components/Toast";

// Assets
import loginIllustration from "../../assets/login-illustration.png";
import logoImg from "../../assets/logo.png";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Mode: "signin" | "register"
  const [mode, setMode] = useState("signin");

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("aarav.trainee@capacityconnect.gov.in");
  const [signInPassword, setSignInPassword] = useState("password123");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [signInErrors, setSignInErrors] = useState({});

  // Register State
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState("Trainee");
  const [regDesignation, setRegDesignation] = useState("");
  const [regDepartment, setRegDepartment] = useState("");
  const [regSkills, setRegSkills] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [regErrors, setRegErrors] = useState({});

  // Shared UX State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "info", title: "", message: "" });
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);

  // Check screen width for mobile responsiveness & disabling tilt
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D Tilt Effect on Desktop Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Switch mode and reset field errors
  const handleModeChange = (newMode) => {
    if (isSubmitting) return;
    setMode(newMode);
    setSignInErrors({});
    setRegErrors({});
  };

  // File Upload Handling for Trainer Registration
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems = files.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      }));
      setCertificates((prev) => [...prev, ...newItems]);
      if (regErrors.certificates) {
        setRegErrors((prev) => ({ ...prev, certificates: null }));
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveCertificate = (id) => {
    setCertificates((prev) => prev.filter((item) => item.id !== id));
  };

  // Email format validator
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Sign In Submission
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!signInEmail.trim()) {
      errors.email = "Email address is required.";
    } else if (!isValidEmail(signInEmail.trim())) {
      errors.email = "Please enter a valid work email (e.g., name@company.com).";
    }

    if (!signInPassword) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    setSignInErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const emailLower = signInEmail.toLowerCase().trim();

      if (emailLower.includes("admin")) {
        setToast({
          show: true,
          type: "warning",
          title: "System Notice",
          message: "Admin portal coming in the next phase. Please sign in as a Trainee or Trainer.",
        });
        return;
      }

      if (emailLower.includes("trainer")) {
        const username = emailLower.split("@")[0].replace(/[._-]/g, " ");
        const formattedName =
          username.charAt(0).toUpperCase() + username.slice(1) || "Faculty Trainer";

        login("trainer", {
          name: formattedName.includes("Dr") ? formattedName : `Dr. ${formattedName}`,
          email: signInEmail,
        });
        navigate("/trainer/dashboard");
      } else {
        const username = emailLower.split("@")[0].replace(/[._-]/g, " ");
        const formattedName =
          username.charAt(0).toUpperCase() + username.slice(1) || "Aarav Sharma";

        login("trainee", {
          name: formattedName,
          email: signInEmail,
        });
        navigate("/trainee/dashboard");
      }
    }, 700);
  };

  // Register Submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regFullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    if (!regEmail.trim()) {
      errors.email = "Work email is required.";
    } else if (!isValidEmail(regEmail.trim())) {
      errors.email = "Please enter a valid work email.";
    }

    if (!regPassword) {
      errors.password = "Password is required.";
    } else if (regPassword.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!regDesignation.trim()) {
      errors.designation = "Designation is required.";
    }

    if (!regDepartment.trim()) {
      errors.department = "Department is required.";
    }

    if (regRole === "Trainer" && certificates.length === 0) {
      errors.certificates = "At least one document is required for trainer review.";
    }

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    setRegErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setToast({
        show: true,
        type: "success",
        title: "Registration Submitted",
        message: "Request submitted. You can sign in once an administrator approves your account.",
      });

      // Clear register form
      setRegFullName("");
      setRegEmail("");
      setRegPassword("");
      setRegDesignation("");
      setRegDepartment("");
      setRegSkills("");
      setCertificates([]);

      // Slide back to Sign In mode
      setMode("signin");
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-slate-950 font-sans selection:bg-brand-teal selection:text-white">
      {/* 3D Animated ShaderGradient Background with Film Grain */}
      <ShaderBackground />

      {/* 3D Perspective Card Wrapper */}
      <div
        className="relative z-10 w-full max-w-[1140px] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-auto min-h-[620px] md:h-[670px] bg-slate-900/85 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] shadow-2xl shadow-black/80 overflow-hidden flex flex-col md:flex-row transition-shadow duration-300"
        >
          {/* ========================================================== */}
          {/* 1. ILLUSTRATION PANEL (Slides between Left & Right on Desktop) */}
          {/* ========================================================== */}
          <motion.div
            initial={false}
            animate={{
              x: isMobile ? "0%" : mode === "signin" ? "0%" : "100%",
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1], // Smooth snappy ease
            }}
            className="hidden md:flex md:absolute top-0 bottom-0 left-0 w-1/2 h-full flex-col justify-between p-8 lg:p-10 z-10 overflow-hidden select-none"
          >
            {/* Full-bleed cover illustration image */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-700 ease-out scale-105"
              style={{ backgroundImage: `url(${loginIllustration})` }}
            />

            {/* Dark Slate Gradient Overlay to ensure maximum contrast and legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/40 pointer-events-none" />
            <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px] pointer-events-none" />

            {/* Top-Left: Logo in rounded glass square + Wordmark */}
            <div className="relative z-10 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shadow-lg shadow-black/30 group">
                <img
                  src={logoImg}
                  alt="CapacityConnect Logo"
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-xl font-extrabold tracking-tight leading-none text-white">
                  <span>Capacity</span>
                  <span className="text-[#a99bf0] ml-1">Connect</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-300/80 mt-1">
                  ENTERPRISE LMS
                </span>
              </div>
            </div>

            {/* Lower Area: Eyebrow + Headline + Muted Subtext */}
            <div className="relative z-10 mt-auto">
              <span className="inline-block text-[11px] font-extrabold tracking-[0.2em] text-[#a99bf0] uppercase mb-2">
                YOUR LEARNING WORKSPACE
              </span>

              <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.15]">
                Build capability.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  Make an impact.
                </span>
              </h2>

              <p className="text-xs lg:text-sm text-slate-300 font-normal leading-relaxed max-w-sm mt-3.5">
                One place to discover courses, grow skills, and keep every learning journey moving
                forward.
              </p>
            </div>
          </motion.div>

          {/* ========================================================== */}
          {/* 2. FORM PANEL (Slides between Right & Left on Desktop)     */}
          {/* ========================================================== */}
          <motion.div
            initial={false}
            animate={{
              x: isMobile ? "0%" : mode === "signin" ? "100%" : "0%",
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full md:w-1/2 h-full md:absolute top-0 bottom-0 left-0 z-20 flex flex-col bg-slate-900/90 md:bg-slate-900/95 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-full">
              {/* Header: Shield Icon, Eyebrow & Headline */}
              <div>
                {/* Mobile-only brand banner */}
                <div className="flex md:hidden items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 p-1.5 flex items-center justify-center">
                    <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-white">Capacity</span>
                    <span className="text-lg font-bold text-[#a99bf0] ml-1">Connect</span>
                    <span className="block text-[9px] tracking-widest text-slate-400 font-semibold uppercase">
                      ENTERPRISE LMS
                    </span>
                  </div>
                </div>

                {/* Shield icon tile */}
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/70 text-brand-teal flex items-center justify-center shadow-inner mb-3">
                  <ShieldCheck className="w-5 h-5 text-brand-teal" />
                </div>

                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  {mode === "signin" ? "WELCOME BACK" : "NEW REGISTRATION"}
                </span>

                <h1 className="text-2xl lg:text-[26px] font-extrabold text-white tracking-tight mt-1">
                  {mode === "signin" ? "Sign in to your account" : "Register your account"}
                </h1>

                {/* Segmented Toggle: White Pill for active option */}
                <div className="flex rounded-xl bg-slate-950/80 p-1 border border-slate-800/90 my-5">
                  <button
                    type="button"
                    onClick={() => handleModeChange("signin")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                      mode === "signin"
                        ? "bg-white text-slate-950 shadow-md font-extrabold"
                        : "text-slate-400 hover:text-slate-200 font-semibold"
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange("register")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                      mode === "register"
                        ? "bg-white text-slate-950 shadow-md font-extrabold"
                        : "text-slate-400 hover:text-slate-200 font-semibold"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Dynamic Crossfading Form Content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {mode === "signin" ? (
                    /* ============================================ */
                    /* SIGN IN FORM                                 */
                    /* ============================================ */
                    <motion.form
                      key="signin-form"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      onSubmit={handleSignInSubmit}
                      className="space-y-4"
                    >
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        Use your work email and password to continue to CapacityConnect.
                      </p>

                      {/* Email address */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            value={signInEmail}
                            onChange={(e) => {
                              setSignInEmail(e.target.value);
                              if (signInErrors.email) setSignInErrors((p) => ({ ...p, email: null }));
                            }}
                            placeholder="you@company.com"
                            className={`w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
                              signInErrors.email
                                ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/30"
                                : "border-slate-800 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                            }`}
                          />
                        </div>
                        {signInErrors.email && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{signInErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setToast({
                                show: true,
                                type: "info",
                                title: "Helpdesk Support",
                                message:
                                  "Please contact your departmental IT administrator or email support@capacityconnect.gov.in.",
                              })
                            }
                            className="text-[11px] text-slate-400 hover:text-slate-300 transition-colors font-medium cursor-pointer"
                          >
                            Contact admin for help
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type={showSignInPassword ? "text" : "password"}
                            value={signInPassword}
                            onChange={(e) => {
                              setSignInPassword(e.target.value);
                              if (signInErrors.password)
                                setSignInErrors((p) => ({ ...p, password: null }));
                            }}
                            placeholder="••••••••••••"
                            className={`w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
                              signInErrors.password
                                ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/30"
                                : "border-slate-800 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignInPassword(!showSignInPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                          >
                            {showSignInPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {signInErrors.password && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{signInErrors.password}</span>
                          </p>
                        )}
                      </div>

                      {/* Fast demo role chips for reviewer */}
                      <div className="pt-1 flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">
                          Quick Roles:
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSignInEmail("aarav.trainee@capacityconnect.gov.in");
                            setSignInPassword("password123");
                          }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700/70 transition-colors"
                        >
                          Trainee
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSignInEmail("dr.priya.trainer@capacityconnect.gov.in");
                            setSignInPassword("password123");
                          }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-[#a99bf0] border border-slate-700/70 transition-colors"
                        >
                          Trainer
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSignInEmail("admin.central@capacityconnect.gov.in");
                            setSignInPassword("password123");
                          }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700/70 transition-colors"
                        >
                          Admin
                        </button>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                              <span>Signing in...</span>
                            </>
                          ) : (
                            <>
                              <span>Sign in</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500 text-center pt-2">
                        Access is managed by your organization administrator.
                      </p>
                    </motion.form>
                  ) : (
                    /* ============================================ */
                    /* REGISTER FORM                                */
                    /* ============================================ */
                    <motion.form
                      key="register-form"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      onSubmit={handleRegisterSubmit}
                      className="space-y-3.5 pb-2"
                    >
                      <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                        Submit your details for administrator review.
                      </p>

                      {/* Full name */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={regFullName}
                            onChange={(e) => {
                              setRegFullName(e.target.value);
                              if (regErrors.fullName) setRegErrors((p) => ({ ...p, fullName: null }));
                            }}
                            placeholder="e.g. Aarav Sharma"
                            className={`w-full pl-9 pr-3 py-2 bg-slate-950/60 border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
                              regErrors.fullName
                                ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/30"
                                : "border-slate-800 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                            }`}
                          />
                        </div>
                        {regErrors.fullName && (
                          <p className="text-[10px] text-rose-400 mt-1">{regErrors.fullName}</p>
                        )}
                      </div>

                      {/* Work email & Password side-by-side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                            Work Email
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              value={regEmail}
                              onChange={(e) => {
                                setRegEmail(e.target.value);
                                if (regErrors.email) setRegErrors((p) => ({ ...p, email: null }));
                              }}
                              placeholder="you@company.com"
                              className={`w-full pl-9 pr-3 py-2 bg-slate-950/60 border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
                                regErrors.email
                                  ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/30"
                                  : "border-slate-800 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                              }`}
                            />
                          </div>
                          {regErrors.email && (
                            <p className="text-[10px] text-rose-400 mt-1">{regErrors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type={showRegPassword ? "text" : "password"}
                              value={regPassword}
                              onChange={(e) => {
                                setRegPassword(e.target.value);
                                if (regErrors.password) setRegErrors((p) => ({ ...p, password: null }));
                              }}
                              placeholder="Min 6 chars"
                              className={`w-full pl-9 pr-8 py-2 bg-slate-950/60 border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
                                regErrors.password
                                  ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/30"
                                  : "border-slate-800 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowRegPassword(!showRegPassword)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
                            >
                              {showRegPassword ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          {regErrors.password && (
                            <p className="text-[10px] text-rose-400 mt-1">{regErrors.password}</p>
                          )}
                        </div>
                      </div>

                      {/* Register as Select */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                          Register as
                        </label>
                        <select
                          value={regRole}
                          onChange={(e) => setRegRole(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                        >
                          <option value="Trainee" className="bg-slate-900 text-white">
                            Trainee (Civil Servant / Enrolled Officer)
                          </option>
                          <option value="Trainer" className="bg-slate-900 text-white">
                            Trainer (Faculty Lead / Program Instructor)
                          </option>
                        </select>
                      </div>

                      {/* Designation & Department side-by-side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                            Designation
                          </label>
                          <div className="relative">
                            <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              value={regDesignation}
                              onChange={(e) => {
                                setRegDesignation(e.target.value);
                                if (regErrors.designation)
                                  setRegErrors((p) => ({ ...p, designation: null }));
                              }}
                              placeholder="e.g. Project Officer"
                              className={`w-full pl-9 pr-3 py-2 bg-slate-950/60 border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
                                regErrors.designation
                                  ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/30"
                                  : "border-slate-800 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                              }`}
                            />
                          </div>
                          {regErrors.designation && (
                            <p className="text-[10px] text-rose-400 mt-1">
                              {regErrors.designation}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                            Department
                          </label>
                          <div className="relative">
                            <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              value={regDepartment}
                              onChange={(e) => {
                                setRegDepartment(e.target.value);
                                if (regErrors.department)
                                  setRegErrors((p) => ({ ...p, department: null }));
                              }}
                              placeholder="e.g. Urban Works"
                              className={`w-full pl-9 pr-3 py-2 bg-slate-950/60 border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all ${
                                regErrors.department
                                  ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/30"
                                  : "border-slate-800 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30"
                              }`}
                            />
                          </div>
                          {regErrors.department && (
                            <p className="text-[10px] text-rose-400 mt-1">
                              {regErrors.department}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* TRAINER-SPECIFIC FIELDS */}
                      {regRole === "Trainer" && (
                        <div className="space-y-3 pt-1 border-t border-slate-800/80">
                          {/* Skills */}
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                              Skills, separated by commas
                            </label>
                            <div className="relative">
                              <Sparkles className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              <input
                                type="text"
                                value={regSkills}
                                onChange={(e) => setRegSkills(e.target.value)}
                                placeholder="e.g. Cloud Computing, Kubernetes, Data Ethics"
                                className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/30 transition-all"
                              />
                            </div>
                          </div>

                          {/* Certificates & Qualifications Box */}
                          <div
                            className={`p-3 rounded-xl border bg-slate-950/40 ${
                              regErrors.certificates
                                ? "border-rose-500/80 bg-rose-950/10"
                                : "border-slate-800"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div>
                                <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                                  Certificates and qualifications
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  At least one document is required for trainer review.
                                </span>
                              </div>

                              <div>
                                <input
                                  type="file"
                                  multiple
                                  ref={fileInputRef}
                                  onChange={handleFileUpload}
                                  className="hidden"
                                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                />
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-sm shrink-0"
                                >
                                  <Plus className="w-3.5 h-3.5 text-slate-900" />
                                  <span>+ Add</span>
                                </button>
                              </div>
                            </div>

                            {/* Uploaded Certificate Items */}
                            {certificates.length > 0 ? (
                              <div className="space-y-1.5 mt-2">
                                {certificates.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs"
                                  >
                                    <div className="flex items-center gap-2 truncate pr-2">
                                      <FileText className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                                      <span className="text-slate-200 font-medium truncate">
                                        {item.name}
                                      </span>
                                      <span className="text-[10px] text-slate-500 shrink-0">
                                        ({item.size})
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveCertificate(item.id)}
                                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : null}

                            {regErrors.certificates && (
                              <p className="text-[10px] text-rose-400 mt-2 flex items-center gap-1 font-semibold">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{regErrors.certificates}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Submit Registration Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                              <span>Submitting application...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit for approval</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Global Interactive Notification Toast */}
      <Toast
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
