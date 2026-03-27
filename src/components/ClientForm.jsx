export default function ClientForm({ client, onChange }) {
  return (
    <section className="section">
      <h2 className="section__title">Dados do Cliente</h2>

      <div className="form-group">
        <label htmlFor="client-name">Empresa / Pessoa Física</label>
        <input
          id="client-name"
          className="input"
          type="text"
          placeholder="Ex: Empresa Exemplo Ltda"
          value={client.name}
          onChange={e => onChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="client-email">E-mail / Contato (opcional)</label>
        <input
          id="client-email"
          className="input"
          type="text"
          placeholder="email@exemplo.com"
          value={client.email}
          onChange={e => onChange('email', e.target.value)}
        />
      </div>
    </section>
  )
}
