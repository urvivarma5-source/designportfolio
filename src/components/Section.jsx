export default function Section({ id, title, note, children }) {
  return (
    <section className="section" id={id}>
      <h2 className="section__title">{title}</h2>
      {note && <p className="section__note">{note}</p>}
      {children}
    </section>
  )
}
