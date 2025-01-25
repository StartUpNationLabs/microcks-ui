import {GalleryVerticalEnd} from "lucide-react"

import {LoginForm} from "@/components/login-form"
import MicrocksLogo from "../../assets/microcks-big.png"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4"/>
                        </div>
                        Acme Inc.
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm/>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <div
                    className="flex items-center justify-center w-full h-full"

                ><img
                    src={MicrocksLogo}
                    alt="Image"
                    style={{
                        width: "50%",
                        aspectRatio: "1.126/1",

                    }}
                    className="  inset-0 object-cover "
                /></div>
            </div>
        </div>
    )
}
