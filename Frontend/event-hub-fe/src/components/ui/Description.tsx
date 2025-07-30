export default function Description({ text }: { text: string }) {
  return (
    <div className="px-3 w-auto p-1 bg-primary-light rounded-md border border-gray-400 py-1 my-2">
      {text}
    </div>
  );
}
