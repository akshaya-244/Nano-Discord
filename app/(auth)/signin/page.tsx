"use client"
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";


const Signin = () => {

    const router=useRouter()
    const handleClick =() => {
        router.push('/api/auth/signin')
    }
  return (
    <div>
      <div className="flex ">
        <div>
        <div className="text-white mr-10 font-extrabold text-8xl">
          {" "}
          Nano <br></br>Discord
        </div>
        <div>
            <Button onClick={handleClick} size="lg"  className="text-xl mt-10 font-mono font-bold">Lets Login! </Button>
        </div>
        </div>
       
        <Image width={700} height={500} src="/bg-4.jpg" alt="bg04"/>

        {/* <Image width={700} height={500} src="/bg-3.jpg" alt="bg02" /> */}
      </div>
    </div>
  );
};

export default Signin;
