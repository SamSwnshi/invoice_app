
import Container from './Container'
import Link from 'next/link'
const Footer = () => {
    return (
        <footer className='mt-6 mb-8'>
            <Container>
                <div className='flex justify-between items-center gap-4 '>
                    <p className=' text-sm'>Invoice &copy; {new Date().getFullYear()}</p>
                    <p className=' text-sm'>Created by Sameer Suryawanshi</p>
                    
                </div>
            </Container>
        </footer>
    )
}

export default Footer