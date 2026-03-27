function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function ServiceLines({ services, onAdd, onRemove, onChange, grandTotal }) {
  return (
    <section className="section">
      <h2 className="section__title">Serviços</h2>

      <div className="service-lines">
        {services.map((service, i) => {
          const lineTotal = (Number(service.qty) || 0) * (Number(service.unitPrice) || 0)
          return (
            <div className="service-line" key={i}>
              <div className="form-group">
                {i === 0 && <label>Descrição</label>}
                <input
                  className="input input--sm"
                  type="text"
                  placeholder="Descrição do serviço"
                  value={service.description}
                  onChange={e => onChange(i, 'description', e.target.value)}
                />
              </div>

              <div className="form-group">
                {i === 0 && <label>Qtd.</label>}
                <input
                  className="input input--sm"
                  type="number"
                  min="1"
                  value={service.qty}
                  onChange={e => onChange(i, 'qty', e.target.value)}
                />
              </div>

              <div className="form-group">
                {i === 0 && <label>Preço Unit.</label>}
                <input
                  className="input input--sm"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={service.unitPrice}
                  onChange={e => onChange(i, 'unitPrice', e.target.value)}
                />
              </div>

              <div className="form-group">
                {i === 0 && <label>Total</label>}
                <div className="service-line__total">
                  {formatCurrency(lineTotal)}
                </div>
              </div>

              <div className="form-group">
                {i === 0 && <label>&nbsp;</label>}
                <button
                  className="btn btn--icon btn--danger"
                  onClick={() => onRemove(i)}
                  title="Remover linha"
                  aria-label="Remover serviço"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <button className="btn btn--outline" onClick={onAdd}>
        + Adicionar Serviço
      </button>

      <div className="total-bar">
        <span className="total-bar__label">Total Geral</span>
        <span className="total-bar__value">{formatCurrency(grandTotal)}</span>
      </div>
    </section>
  )
}
