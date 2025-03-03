import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { questions } from "@/constants/questions";
import ROUTES from "@/constants/routes";
import Link from "next/link";

interface SearchParams {
  searchParams: Promise<{
    [key:string]:string
  }>
}

const Home = async ({searchParams} : SearchParams) => {
  const {query = ''} = await searchParams;

  const fillteredQuestions = questions.filter((question) => {
    return question.title.toLowerCase().includes(query?.toLowerCase());
  });
  return (
    <>
      <section className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
          <Link href={ROUTES.ASK_QUESTION}>
            Ask a Question
          </Link>
        </Button>
      </section>
      <section className="mt-11">
      <LocalSearch route='/' imgSrc='/icons/search.svg' placeholder='Search for Questions here...' otherClasses="flex-1"/>
      </section>
      {/* Home Filter */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {fillteredQuestions.map((question) => (
          <h1 key={question.title}>{question.title}</h1>
          ))}
      </div>
    </>
  )
}

export default Home
