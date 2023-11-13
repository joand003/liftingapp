import './globals.css'
import Header from './components/Header'
import Provider from './components/Provider'



export const metadata = {
  title: 'Workout App',
  description: 'App to create and track workouts',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
        
        <body className='bg-slate-800 text-white'>
        <Provider>
        <Header />
          {children}
          </Provider>
        </body>
    </html>
  )
}
