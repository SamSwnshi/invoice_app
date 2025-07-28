import { cn } from "@/lib/utils"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Container = ({children, className, ...props}: React.ComponentProps<'div'>) => {
    return(
        <div {...props} className={cn('max-w-5xl mx-auto px-5',className)}>
            {children}
        </div>
    )
}

export default Container