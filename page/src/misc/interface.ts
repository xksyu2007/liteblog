export type home = {
    headcard: {
        title: string,
        content: string,
        link: string
    }[],
    card: {
        email: string,
        github: string
    }
}

export type article = {
    misc: {
        tag: string[],
        list: {
            file: string,
            title: string,
            abstract: string,
            tag: string,
            date: string
        }[]
    },
    cs: {
        tag: string[],
        list: {
            file: string,
            title: string,
            abstract: string,
            tag: string,
            date: string
        }[]
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