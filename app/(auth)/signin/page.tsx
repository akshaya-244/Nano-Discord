"use client"
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";


const Signin = () => {

    const router=useRouter()
    const handleClick =() => {
        router.push('/api/auth/signin')
    }
  // return (
  //   <div>
  //     <div className="flex ">
  //       <div>
  //       <div className="text-white mr-10 mt-20 font-extrabold text-8xl">
  //         {" "}
  //         Nano <br></br>Discord
  //       </div>
  //       {/* <div className="text-white text-md font-bold  mt-10">
  //       "Say hello to smarter conversations 
  //       </div> */}

      //   <div className="text-white mt-5 text-lg  italic">
      //  powered by Gemini Pro AI!
      //   </div>
          
        // <div>
        //     <Button onClick={handleClick} size="lg"  className="text-xl mt-10 font-mono font-bold">Lets Login! </Button>
        // </div>
  //       </div>
       
  //       <Image className="rounded-4xl" width={700} height={500} src="/bg-4.jpg" alt="bg04"/>

  //       {/* <Image width={700} height={500} src="/bg-3.jpg" alt="bg02" /> */}
  //     </div>
  //   </div>
  // );

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
         <div className="text-white mr-10 mt-20 font-mono font-bold text-9xl">
          
          <span className="text-6xl "> Nano </span><br></br> Discord
         </div>
         <div className="text-white mt-5 text-xl font-light font-sans italic">
       powered by Gemini AI
        </div>
        <div>
            <Button onClick={handleClick} size="lg"  className="text-xl mt-10 font-mono font-bold bg-gradient-to-r from-blue-600 to-blue-400">Lets Login! </Button>
        </div>
        {/* Nano Discord <br /> Powered by AI */}
      </motion.h1>
    </LampContainer>
  );
};

export default Signin;
