export type home = {
    headcard: {
        title: string,
        content: string,
        link: string
    }[],
    card: {
        email: string,
        github: string,
        date: string
    }
}
export type articleInfo = {
    file: string,
    title: string,
    abstract: string,
    tag: string,
    date: string
}

export type article = {
    misc: {
        tag: string[],
        list: articleInfo[]
    },
    cs: {
        tag: string[],
        list: articleInfo[]
    }
}

export type project = {
    name: string,
    abstract: string,
    link: string
}[]

export type tool = {
    name: string,
    abstract: string,
    file: string
}[]