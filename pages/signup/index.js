import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router"; // Import the useRouter hook
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import LandingHeader from "/components/landingPage/landingHeader";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });
  const router = useRouter(); // Use the useRouter hook to access the router object

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/login"); // Redirect to login page upon successful signup
      } else {
        console.error("Signup failed");
        // Handle signup failure
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <LandingHeader />
        </div>

        <div className="py-20  px-8 mb-0 h-screen flex justify-center items-center  ">
          <div className="flex flex-row space-x-2 w-full justify-between my-2 py-2">
            {/* want the below div to be center vertically */}
            <div className="flex flex-row justify-center w-full h-full items-center">
              <div className="flex flex-col justify-center py-2 my-2 w-1/4 bg-gray-100  px-6 b-1 rounded-sm">
                <form
                  className="w-full max-w-sm"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="text-2xl font-semibold text-center py-2 text-gray-600">
                    Get Started!
                  </div>
                  <div className="py-2">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      {...register("name", { required: true })}
                      className="h-12 border-gray-300 text-gray-400 bg-gray-200 inputClass"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-xs">
                        Full Name is required
                      </span>
                    )}
                  </div>
                  <div className="py-2">
                    <Input
                      type="text"
                      placeholder="Email ID"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      className="h-12 border-gray-300 text-gray-400 bg-gray-200"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs">
                        Enter a valid Email ID
                      </span>
                    )}
                  </div>
                  <div className="py-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      className="h-12 border-gray-300 text-gray-400 bg-gray-200"
                    />
                    {errors.password && (
                      <span className="text-red-400 text-xs">
                        Password should have at least 6 characters
                      </span>
                    )}
                  </div>
                  <div className="py-2">
                    <Input
                      type="text"
                      placeholder="LinkedIn"
                      {...register("linkedIn")}
                      className="h-12 border-gray-300 text-gray-400 bg-gray-200"
                    />
                  </div>
                  <div className="py-2">
                    <Input
                      type="text"
                      placeholder="Website"
                      {...register("website")}
                      className="h-12 border-gray-300 text-gray-400 bg-gray-200"
                    />
                  </div>
                  <div className="py-2">
                    <Input
                      type="text"
                      placeholder="License Key"
                      {...register("license", { required: true })}
                      className="h-12 border-gray-300 text-gray-400 bg-gray-200"
                    />
                    {errors.license && (
                      <span className="text-red-400 text-xs">
                        License Key is required
                      </span>
                    )}
                  </div>
                  <div className="py-2">
                    <Button
                      type="submit"
                      className="bg-blue-600 text-white w-full flex hover:bg-blue-800 h-12"
                      disabled={!isValid}
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
