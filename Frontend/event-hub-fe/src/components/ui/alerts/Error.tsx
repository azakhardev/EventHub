export default function Error({ error }: { error: string }) {
  return (
    <div className="w-full text-red-500 border border-red-500 rounded-lg p-2">
      <h2 className="text-2xl font-bold text-red-500">
        Oops... An Error Occured
      </h2>
      <p className="text-xl my-2">{error}</p>
    </div>
  );
}
