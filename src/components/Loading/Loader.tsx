type Props = {
  variant?: "spinner" | "dots";
};

export default function Loader({}: Props) {
  return (
    <div className="size-9 rounded-full flex f-center bg-gray-4 text-gray-12 group-hover:bg-blue-a6">
      <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
    </div>
  );
}
