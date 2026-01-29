export interface ProjectResponse {
    id:number,
    team_id: number,
    name: string,
    description: string,
    status: string,
    created_at: string
}

export interface ProjectRequest {
    team_id: number,
    name: string,
    description: string,
}