import { useAuth } from "@/hooks/use-auth"

export default function App() {
  const { user, signOut } = useAuth()

  return (
    <div className="h-screen w-full bg-purple-50/30 p-8">
      <div className="flex flex-col gap-4">
        <div>You're logged in as {JSON.stringify(user, null, 2)}</div>
        <button
          onClick={signOut}
          className="w-fit px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
