export default function Button({children, className='', ...props}){
  return (
    <button {...props} className={`px-4 py-2 rounded bg-cyan text-primary font-semibold ${className}`}>{children}</button>
  )
}
