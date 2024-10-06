export default function Loading() {
  return (
    <div className="flex flex-wrap justify-center items-center pt-20 mx-20">
      {Array(12)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="w-1/4 p-2 flex justify-center gap-1">
            <div className="flex flex-col">
              <div className="w-80 h-80 bg-neutral-300 animate-pulse rounded" />
              <div className="flex flex-col mt-2 justify-center items-center gap-1">
                {' '}
                {/* gap도 줄이기 */}
                <div className="w-44 h-5 bg-neutral-300 animate-pulse rounded-full" />
                <div className="w-32 h-3 bg-neutral-300 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
