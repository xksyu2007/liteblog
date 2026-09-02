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

export type admin_out_post_update = {
    title: string,
    tag: string,
    type: 'cs' | 'misc'
    abs: string
}

export type admin_in_post_tag = {
    cs: string[],
    misc: string[]
}