import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SignInFlow } from "../types"
import { Button } from "@/components/ui/button";
import  {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import { useState } from "react";

interface SignUpCardProps {
    setState:(state:SignInFlow)=>void;
};

export const SignUpCard=({setState}:SignUpCardProps)=>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
            <CardContent className="space-y-4 px-0 pb-0">
                <form className="space-y-2.5">
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
                        <Button type="submit" className="w-full" size="lg" disabled={false}>Sign Up</Button>
                
                </form>
                  <Separator/>
                    <div className="flex flex-col gap-y-2.5">
                        <Button 
                            variant="outline"
                            className="w-full"
                            size="lg"
                            disabled={false}
                            onClick={()=>{}}
                        > <FcGoogle className="mr-2"/> Sign in with Google</Button>
                          <Button 
                            variant="outline"
                            className="w-full"
                            size="lg"
                            disabled={false}
                            onClick={()=>{}}
                        > <FaGithub className="mr-2"/> Sign in with GitHub</Button>


                    </div>
                    <p className="text-xs text-muted-foreground">
                        Already have an account? <span className="text-primary cursor-pointer" onClick={() => setState("signIn")}>Sign in</span>
                        </p>
                    
                </CardContent>
                </Card>
       
    )
}