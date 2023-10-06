/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ErrorBlock(props: { title: any; message: any }) {
  const { title, message } = props;
  return (
    <div className="error-block">
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
