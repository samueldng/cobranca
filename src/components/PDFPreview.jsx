function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function formatDate() {
  return new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function PDFPreview({ client, services, grandTotal }) {
  const hasServices = services.some(s => s.description || s.unitPrice > 0)

  return (
    <div className="preview-wrapper">
      <p className="preview-label">Pré-visualização do PDF</p>

      <div className="pdf-container">
        <div className="pdf-page" id="pdf-content">
          {/* ===== HEADER ===== */}
          <div className="pdf-header">
            <div className="pdf-header__brand">
              <img src="/logo.png" alt="LogiStack BR" className="pdf-header__logo" />
              <div className="pdf-header__info">
                <h2>SAMUEL OLIVEIRA DA SILVA</h2>
                <p>Tech Lead — LogiStack BR</p>
              </div>
            </div>
            <div className="pdf-header__meta">
              <span className="pdf-tag">Orçamento / Cobrança</span>
              <p>
                <strong>Data de Emissão</strong><br />
                {formatDate()}
              </p>
            </div>
          </div>

          {/* ===== CLIENT ===== */}
          <div className="pdf-client">
            <p className="pdf-client__label">Cliente</p>
            <p className="pdf-client__name">
              {client.name || 'Nome do cliente'}
            </p>
            {client.email && (
              <p className="pdf-client__email">{client.email}</p>
            )}
          </div>

          {/* ===== TABLE ===== */}
          {hasServices ? (
            <>
              <table className="pdf-table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Qtd.</th>
                    <th>Unid.</th>
                    <th>Preço Unit.</th>
                    <th>Preço Total</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s, i) => {
                    const lineTotal = (Number(s.qty) || 0) * (Number(s.unitPrice) || 0)
                    return (
                      <tr key={i}>
                        <td>{s.description || '—'}</td>
                        <td>{s.qty}</td>
                        <td>{s.unit || '—'}</td>
                        <td>{formatCurrency(s.unitPrice)}</td>
                        <td>{formatCurrency(lineTotal)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="pdf-total">
                <div className="pdf-total__box">
                  <span className="pdf-total__label">Total Geral</span>
                  <span className="pdf-total__value">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">📋</div>
              <p className="empty-state__text">Adicione serviços para visualizar a tabela</p>
            </div>
          )}

          {/* ===== PAYMENT ===== */}
          <div className="pdf-payment">
            <h3 className="pdf-payment__title">Informações de Pagamento</h3>
            <div className="pdf-payment__grid">
              <div className="pdf-payment__item">
                <span>Método</span>
                <span>Pagamento via PIX</span>
              </div>
              <div className="pdf-payment__item">
                <span>Banco</span>
                <span>RECARGAPAY IP LTDA</span>
              </div>
              <div className="pdf-payment__item pdf-payment__item--highlight">
                <span>Chave PIX (Celular)</span>
                <span>99 98514-3916</span>
              </div>
              <div className="pdf-payment__item">
                <span>Titular</span>
                <span>Samuel Oliveira da Silva</span>
              </div>
            </div>
          </div>

          {/* ===== SIGNATURE ===== */}
          <div className="pdf-signature">
            <div className="pdf-signature__line"></div>
            <p className="pdf-signature__name">Assinatura do Cliente</p>
          </div>
        </div>
      </div>
    </div>
  )
}
