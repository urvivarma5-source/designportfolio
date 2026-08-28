export default function Section({ id, index, title, note }) {
  return (
    <section className="section" id={id}>
      <p className="section__index">{index}</p>
      <h2 className="section__title">{title}</h2>
      <p className="section__note">{note}</p>
    </section>
  )
}
