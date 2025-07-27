"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { useState } from "react";
import { Loader2, Key } from "lucide-react";
import { emailOtp, signIn } from "~/lib/auth/client";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <Button
                disabled={loading}
                className="gap-2"
                onClick={async () => {
                  await emailOtp.sendVerificationOtp(
                    {
                      email,
                      type: "sign-in",
                    },
                    {
                      onRequest: (ctx) => {
                        setLoading(true);
                      },
                      onResponse: (ctx) => {
                        setLoading(false);
                      },
                    }
                  );
                }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  " Sign-in with Magic Link"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Verification</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your otp below to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                value={otp}
              />
              <Button
                disabled={loading}
                className="gap-2"
                onClick={async () => {
                  await signIn.emailOtp(
                    {
                      email,
                      otp,
                    },
                    {
                      onRequest: (ctx) => {
                        console.log("Requesting sign-in with OTP:", ctx);
                        setLoading(true);
                      },
                      onResponse: (ctx) => {
                        setLoading(false);
                      },
                      onError: (ctx) => {
                        console.error("Error during sign-in:", ctx.error);
                      },
                    }
                  );
                }}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Verify with OTP"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
