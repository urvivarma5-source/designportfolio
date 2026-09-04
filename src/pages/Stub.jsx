import Nav from '../components/Nav'

/**
 * A page whose content does not exist yet. Photography and Contact were
 * placeholder *sections* in the home scroll; they are their own routes now
 * (see DESIGN.md §7.1), so they need somewhere to land that does not pretend
 * to be finished.
 */
export default function Stub({ title, note }) {
  return (
    <>
      <Nav inset />
      <article className="about">
        <h1 className="about__title">{title}</h1>
        <p className="about__stub">{note}</p>
      </article>
    </>
  )
}
