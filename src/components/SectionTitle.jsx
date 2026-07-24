function SectionTitle({ id, title, lead }) {
  return (
    <div className="section-title">
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

export default SectionTitle;
