"use client"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa"
import Image from "next/image"

const Login = () => {
  const session = useSession()
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    console.log(email, password)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (res.ok) {
      console.log(session)
      event.target.reset()
    }
  }

  const handleGoogleLogin = async () => {
    const res = await signIn("google", { redirect: false })
    if (res.ok) {
      console.log(res)
      console.log(session)
      router.push("/")
    }
  }

  if (session?.status === "authenticated") {
    return router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100 p-4">
      <div className="inset-0 overflow-hidden">
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0">
          <CardHeader className="text-center relative overflow-hidden pb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-md"></div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <CardTitle className="text-4xl font-bold text-white mb-2">Welcome Back!</CardTitle>
              <CardDescription className="text-yellow-100 text-lg">Join us to help make everyone smile</CardDescription>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-white rounded-full p-4 shadow-lg">
                <Image
                  src="/ashroy.jpg"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-yellow-800">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white/50 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-yellow-800">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/50 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Button>
              </motion.div>
            </form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-yellow-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-yellow-600">Or continue with</span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={handleGoogleLogin}
                  className="w-full bg-white hover:bg-yellow-50 text-yellow-800 border border-yellow-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <FaGoogle className="mr-2 text-yellow-500" />
                  Sign in with Google
                </Button>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6 text-center text-sm text-yellow-800"
            >
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
                Register here
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login

