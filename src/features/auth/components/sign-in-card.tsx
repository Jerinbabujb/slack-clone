import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import  {FcGoogle} from "react-icons/fc"
import {FaExclamationTriangle, FaGithub} from "react-icons/fa"
import { SignInFlow } from "../types"
import { useState } from "react";
import {TriangleAlert} from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";



interface SignInCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignInCard=({setState}:SignInCardProps)=>{
    const {signIn}=useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState("");
    const [pending, setPending]= useState(false);

    const onPasswrodSignIn=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setPending(true);
        signIn('password',{email,password,flow:'signIn'})
        .catch(()=>{
            setError("Invalid Email or Passowrd")
        })
        .finally(()=>{
            setPending(false);
        })
    }

    const handleProviderSubmit = (value:"github"|"google")=>{
        setPending(true);
        signIn(value)
        .finally(()=>{
                setPending(false);

        })
    };
    return(
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
            Login to continue
            </CardTitle>
            <CardDescription>
                Use email or another service to sign in.
            </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4"/>
                    <p>
                        {error}
                    </p>
                </div>
            )}
            <CardContent className="space-y-4 px-0 pb-0"> 
                <form onSubmit={onPasswrodSignIn} className="space-y-2.5">
                    <Input
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     disabled={false}
                     required/>
                          <Input
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     disabled={false}
                     required/>

                     <Button type="submit" className="w-full" size="lg" disabled={pending}>Continue</Button>
                    </form>
                    <Separator/>
                    <div className="flex flex-col gap-y-2.5">
                        <Button 
                            variant="outline"
                            className="w-full"
                            size="lg"
                            disabled={pending}
                            onClick={()=>handleProviderSubmit("google")}
                        > <FcGoogle className="mr-2"/> Sign in with Google</Button>
                          <Button 
                            variant="outline"
                            className="w-full"
                            size="lg"
                            disabled={pending}
                            onClick={()=>handleProviderSubmit("github")}
                        > <FaGithub className="mr-2"/> Sign in with GitHub</Button>


                    </div>
                    <p className="text-xs text-muted-foreground">
                        Don't have an account? <span className="text-primary cursor-pointer" onClick={() => setState("signUp")}>Sign up</span>
                    </p>
                </CardContent>
        </Card>
    )
}