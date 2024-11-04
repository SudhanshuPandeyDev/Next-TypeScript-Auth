export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-500 to-gray-900 text-white py-10 px-6">
      <div className="bg-gray-500 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-4">
          User Profile
        </h1>
        <hr className="border-gray-500 mb-4" />
        <p className="text-xl text-center">
          Profile ID:{" "}
          <span className="p-2 rounded-lg bg-orange-500 text-black font-bold">
            {params.id}
          </span>
        </p>
      </div>
    </div>
  );
}
