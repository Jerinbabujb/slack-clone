import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SignInFlow } from "../types"
import { Button } from "@/components/ui/button";
import  {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
    setState:(state:SignInFlow)=>void;
};

export const SignUpCard=({setState}:SignUpCardProps)=>{
    const {signIn}=useAuthActions();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error,setError]=useState("");
    const [pending, setPending]= useState(false);

    const onPasswrodSignUp=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password !=confirmPassword){
            setError("Password does not match");
            return;
        }

        setPending(true);
        signIn('password',{username, email,password,flow:'signUp'})
        .catch(()=>{
            setError("Something went wrong")
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
                    Sign Up to continue
                </CardTitle>
                <CardDescription>
                    Create an account to get started.
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
                <form  onSubmit={onPasswrodSignUp} className="space-y-2.5">
                    <Input 
                     type="text"
                     placeholder="Username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        disabled={false}
                        required/>
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
                            <Input 
                     type="password"
                     placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        disabled={false}
                        required/>
                        <Button type="submit" className="w-full" size="lg" disabled={pending}>Sign Up</Button>
                
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
                        Already have an account? <span className="text-primary cursor-pointer" onClick={() => setState("signIn")}>Sign in</span>
                        </p>
                    
                </CardContent>
                </Card>
       
    )
}