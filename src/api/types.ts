export type RepositoriesResponse = {
    incomplete_result: boolean
    items: Repository[]
    total_count: number
}

export type Repository = {
    id: number
    node_id: string
    name: string
    full_name: string
    html_url: string
    description: string

    owner: {

    }
}