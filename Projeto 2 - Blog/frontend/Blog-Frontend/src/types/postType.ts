type commentType = {
    content: string,
    username: string,
}

type postType = {
    _id: string,
    title: string,
    content: string,
    author: string,
    date: string,
    comments: commentType[],
}

export type { postType, commentType }