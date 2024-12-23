import '@/styles/globals.css'

export const metadata = {
  title: 'Estadísticas de Pastel y Barras',
  description: 'Una aplicación para visualizar y personalizar datos estadísticos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <style>{`
          body {
            background: linear-gradient(135deg, #2D0F3E, #0F3A2D);
            min-height: 100vh;
            color: #ffffff;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}

