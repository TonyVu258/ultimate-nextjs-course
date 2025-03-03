interface Question {
    question: {
        _id: string,
        title: string,
        description: string,
        tags: Tag[],
        author: Author
        upvotes: number,
        answers: number,
        views: number,
        createdAt: Date
    }
}

interface Tag {
    _id: string,
    name: string,
}

interface Author {
    _id: string,
    name: string,
    image: string
}

interface SearchParams {
    searchParams: Promise<{
      [key:string]:string
    }>
  }