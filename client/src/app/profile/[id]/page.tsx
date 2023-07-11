export default function UserProfile({ params }: any) {
  return (
    <div className="items-center  flex flex-col min-h-screen py-2 justify-center">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page{" "}
        <span className="p-2 rounded bg-orange-500"> {params.id}</span>
      </p>
    </div>
  );
}
