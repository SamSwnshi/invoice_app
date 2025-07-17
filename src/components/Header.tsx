import {
    OrganizationSwitcher,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import Container from './Container'
import Link from 'next/link'
const Header = () => {
    return (
        <header className='mt-8 mb-12'>
            <Container>
                <div className='flex justify-between items-center gap-4 '>
                    <div className='flex items-center gap-4'>
                        <p className='font-bold'><Link href='/dashboard'>Invoice</Link></p>
                        <span className='text-slate-400'>/</span>
                        <SignedIn>
                            <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard"/>
                        </SignedIn>
                    </div>
                    <div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header