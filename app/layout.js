import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Codesky - Innovation With No Limit',
  description: 'Codesky — modern web, AI and security solutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-primary text-slate-900 dark:text-slate-100">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
