export default function TodoCard({ title, createdAt, complete }) {
  return (
    <div style={{ border: "solid white" }}>
      <h2>{title}</h2>
      <p> Date: {createdAt}</p>
      <label htmlFor="">
        <input type="checkbox" checked={complete} />
      </label>
    </div>
  );
}
