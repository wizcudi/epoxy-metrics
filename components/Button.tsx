type ButtonProps = {
    label: string
    onClick?: () => void
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary'
}

export default function Button({ label, onClick, type = 'button', variant = 'primary' }: ButtonProps) {
    const styles = variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${styles}`}
        >
            {label}
        </button>
    )
}