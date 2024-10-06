export default function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  return (
    <>
      <h1>id : {id}</h1>
    </>
  );
}
