import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
  const session = await auth();
  return (
  <>
    <h1 className="text-3xl text-violet-700 font-black">Wellcome to the world of NextJS</h1>
    <form className="px-10 pt-[100px]"
        action={async () => {
          "use server"
          await signOut({ redirectTo: ROUTES.SIGN_IN});
        }}
    >
      <Button type="submit" className="bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Log out
      </Button>
    </form>
  </>    
  )
}

export default Home
