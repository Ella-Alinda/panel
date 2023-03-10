import ErrorMessage from '@/components/elements/ErrorMessage'
import styled from '@emotion/styled'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { ComponentProps, FocusEvent, useEffect, useState } from 'react'
import tw from 'twin.macro'

export type Size = 'md' | 'lg'

export interface TextareaProps extends ComponentProps<'textarea'> {
    error?: string
    label?: string
    size?: Size
    wrapperClassName?: string
}

const StyledTextarea = styled.textarea<{
    size?: Size
    error?: string
}>`
    ${tw`px-3 bg-transparent outline-0 py-2 disabled:cursor-not-allowed w-full`}

    ${({ error }) =>
        error ? tw`placeholder:text-error-lighter text-error` : tw`placeholder:text-accent-400 text-foreground`}

    ${({ size }) => (size === 'lg' ? tw`min-h-[3rem]` : tw`min-h-[2.25rem] text-sm`)})}
`

const Textarea = ({
    label,
    className,
    wrapperClassName,
    error,
    onBlur,
    onFocus,
    ...props
}: Omit<ComponentProps<'textarea'>, 'size' | 'ref' | 'prefix' | 'onFocus' | 'onBlur'> & TextareaProps) => {
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        if (props.disabled) {
            setFocused(false)
        }
    }, [props.disabled])

    const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false)
        onBlur && onBlur(e)
    }

    const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        setFocused(true)
        onFocus && onFocus(e)
    }

    return (
        <div className={wrapperClassName}>
            {label && <label className='text-xs font-medium text-accents-500'>{label}</label>}
            <div
                className={`flex border ${
                    error ? 'border-error' : focused ? 'border-accent-500' : 'border-accent-200'
                } transition-colors rounded ${label && 'mt-1'} ${
                    props.disabled ? 'bg-accent-100 cursor-not-allowed' : 'bg-background'
                } ${className}`}
            >
                <StyledTextarea
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    error={error}
                    {...props}
                />
            </div>
            {error && (
                <ErrorMessage>{ error }</ErrorMessage>
            )}
        </div>
    )
}

export default Textarea
