import LandingHeader from "/components/landingPage/landingHeader";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { useForm, submitHandler } from "react-hook-form";



export default function SignUp() {

  // form state and validation
  const { register, handleSubmit, formState: {isValid, errors} } = useForm({mode: "onChange"});

  const passRegex= new RegExp(/^[a-zA-Z0-9]{6,16}$/)
  const licenseRegex= new RegExp(/^[a-zA-Z0-9]{10}$/)
  const emailRegex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)

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
              <div className="flex flex-col justify-center py-2 my-2 w-1/4 bg-gray-100  px-6 b-1 rounded-sm">
        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
              
                <div className=" text-2xl font-semibold text-center py-2  text-gray-600">Get Started !</div>
                
                <div className="py-2">
             <Input  

             placeholder="Full Name"  className="h-12  border-gray-300 text-gray-400 bg-gray-200 inputClass"   /> 

                </div>
                <div className="py-2">
                  <Input  placeholder="Email ID"  className="h-12  border-gray-300 text-gray-400 bg-gray-200"  {...register('email',{
              required: true,
              pattern: emailRegex,
            })}/>
        {errors?.email && <span className="text-red-400 text-xs">Enter valid Email ID</span>}

                </div>
                <div className="py-2">
                
                  <Input type="Password" placeholder="Password" className="h-12   border-gray-300 text-gray-400 bg-gray-200" 
                   {...register('password',{
                    required: true,
                    pattern: passRegex,
                  })}
                  />
                  {errors?.password && <span className="text-red-400 text-xs">Password should have atleast 6 characters</span>}
                </div>
                <div className="py-2">
                  <Input  placeholder="LinkedIn"  className="h-12  border-gray-300 text-gray-400 bg-gray-200"/>
                </div>
                <div className="py-2">
                  <Input  placeholder="Website"  className="h-12  border-gray-300 text-gray-400 bg-gray-200"/>
                </div>
                <div className="py-2">
                  <Input  placeholder="License Key"  className="h-12  border-gray-300 text-gray-400 bg-gray-200"
                   {...register('license',{
                    required: true,

                  })}
                  />
                  {errors?.license && <span className="text-red-400 text-xs">License Key is required</span>}

                </div>



               
               <div className="py-2 ">
               <Button
              variant="secondary"
              type='submit'
                  className="bg-blue-600 text-white w-full flex  hover:bg-blue-800 h-12"
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
