import LandingHeader from "/components/landingPage/landingHeader";
import { Input } from "/components/ui/input";

import { Button } from "/components/ui/button";
import { useForm, submitHandler } from "react-hook-form";

export default function Login(){
  const passRegex = new RegExp(/^[a-zA-Z0-9]{6,16}$/)
  const licenseRegex = new RegExp(/^[a-zA-Z0-9]{10}$/)
  const emailRegex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
  const { register, handleSubmit, formState: {isValid, errors} } = useForm({mode: "onChange"});
  const onSubmit = (data) => {
    console.log(data);
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
               
                <div className="flex flex-col justify-center py-4 my-2 w-1/4 bg-gray-100  px-6 b-1 rounded-sm">
                <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>

                  <div className=" text-2xl font-semibold text-center py-4  text-gray-600">Welcome Back !</div>
                  <div className="py-4">
                    <Input  placeholder="Username"  className="h-12  border-gray-300 text-gray-400 bg-gray-200"
                      {...register('username',{
                        required: true,

                      })}

                    />
                    {errors?.password && <span className="text-red-400 text-xs">Please enter username</span>}
              
                 </div>
                  <div className="py-2">
                    <Input type="Password" placeholder="Password" className="h-12   border-gray-300 text-gray-400 bg-gray-200"
                      {...register('password',{
                        required: true,
    
                      })}

                    />
                  {errors?.password && <span className="text-red-400 text-xs">Please enter password</span>}
                
                  </div>
                 
                 <div className="py-4 ">
                 <Button
              variant="secondary"
                  className="bg-blue-600 text-white w-full flex  hover:bg-blue-800 h-12"
              onClick={() => {
                  
              }}
            >
           Login
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