import { useState, useCallback } from 'react'
import ClientForm from './components/ClientForm'
import ServiceLines from './components/ServiceLines'
import PDFPreview from './components/PDFPreview'
import PDFActions from './components/PDFActions'

const INITIAL_SERVICE = { description: '', qty: 1, unit: '', unitPrice: 0 }

export default function App() {
  const [client, setClient] = useState({ name: '', email: '' })
  const [services, setServices] = useState([{ ...INITIAL_SERVICE }])

  const updateClient = useCallback((field, value) => {
    setClient(prev => ({ ...prev, [field]: value }))
  }, [])

  const addService = useCallback(() => {
    setServices(prev => [...prev, { ...INITIAL_SERVICE }])
  }, [])

  const removeService = useCallback((index) => {
    setServices(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev)
  }, [])

  const updateService = useCallback((index, field, value) => {
    setServices(prev => prev.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    ))
  }, [])

  const grandTotal = services.reduce(
    (sum, s) => sum + (Number(s.qty) || 0) * (Number(s.unitPrice) || 0),
    0
  )

  return (
    <div className="app">
      <aside className="app__sidebar">
        <div className="brand">
          <img src="/logo.png" alt="LogiStack BR" className="brand__logo" />
          <div className="brand__text">
            <h1>LogiStack BR</h1>
            <p>Gerador de Orçamentos</p>
          </div>
        </div>

        <ClientForm client={client} onChange={updateClient} />

        <ServiceLines
          services={services}
          onAdd={addService}
          onRemove={removeService}
          onChange={updateService}
          grandTotal={grandTotal}
        />

        <div className="actions-footer">
          <PDFActions />
        </div>
      </aside>

      <main className="app__main">
        <PDFPreview client={client} services={services} grandTotal={grandTotal} />
      </main>
    </div>
  )
}
