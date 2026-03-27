import { useState } from 'react'

export default function PDFActions() {
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('pdf-content')
      if (!element) return

      const opt = {
        margin: 0,
        filename: `orcamento-logistack-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('Erro ao gerar PDF:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className={`btn btn--primary btn--lg btn--full ${loading ? 'btn--loading' : ''}`}
      onClick={handleGenerate}
      disabled={loading}
    >
      {loading ? 'Gerando...' : '📄 Gerar e Baixar PDF'}
    </button>
  )
}
