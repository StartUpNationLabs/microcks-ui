import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import KeycloakLogo from '../../src/assets/keyclaok-logo.png'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router'

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'form'>) {
    // Using Object destructuring
    const { keycloak, initialized } = useKeycloak()
    let navigate = useNavigate()

    if (keycloak.authenticated) {
        navigate('/dashboard')
        return <div>Redirecting...</div>
    }
    return (
        <form className={cn('flex flex-col gap-6', className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
            </div>
            <div className="grid gap-6">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => keycloak.login({
                        redirectUri: window.location.origin + '/dashboard'
                    })}
                >
                    <img src={KeycloakLogo} alt="" className="w-5 h-5" />
                    Login with Keycloak
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    )
}
