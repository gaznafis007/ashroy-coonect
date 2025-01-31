"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, DollarSign, Coffee, Gift, Loader2, CookingPot } from "lucide-react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const DonationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast({
      title: "Thank you for your donation!",
      description: "Your generosity makes a difference.",
      duration: 5000,
    })
    console.log(data)
  }

  const donationAmount = watch("amount")

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-yellow-800 mb-2">Make a Difference Today</CardTitle>
            <CardDescription className="text-lg text-yellow-700">
              Your donation helps us continue our mission to spread joy and support those in need.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/50 hover:bg-white/80 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <CookingPot className="h-12 w-12 text-yellow-600 mb-2" />
                    <p className="text-lg font-semibold text-yellow-800">BDT 100</p>
                    <p className="text-sm text-yellow-600">Donate a Meal</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 hover:bg-white/80 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Gift className="h-12 w-12 text-yellow-600 mb-2" />
                    <p className="text-lg font-semibold text-yellow-800">BDT 1000</p>
                    <p className="text-sm text-yellow-600">Support a family</p>
                  </CardContent>
                </Card>
              </div>
              <RadioGroup defaultValue="25" className="grid grid-cols-4 gap-4">
                {[10, 25, 50, 100].map((amount) => (
                  <Label
                    key={amount}
                    className={`flex flex-col items-center justify-center rounded-md border-2 border-yellow-400 bg-white p-4 hover:bg-yellow-100 ${
                      donationAmount == amount ? "border-yellow-600 bg-yellow-100" : ""
                    }`}
                  >
                    <RadioGroupItem
                      value={amount.toString()}
                      id={`amount-${amount}`}
                      className="sr-only"
                      {...register("amount")}
                    />
                    <span className="text-xl font-semibold">${amount}</span>
                  </Label>
                ))}
              </RadioGroup>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600" />
                <Input
                  type="number"
                  placeholder="Other amount"
                  className="pl-10 bg-white/50 border-yellow-400 focus:border-yellow-500"
                  {...register("customAmount")}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" /> Donate Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-yellow-700">
            Note: This is a dummy donation page. The functionality has not been integrated yet.
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default DonationPage

