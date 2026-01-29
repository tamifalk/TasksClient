export interface TeamResponse {
    id: number;
    name: string;
    created_at: string;
    members_count: number;
}

export interface TeamRequest {
    name: string;
}

export interface TeamAddMemberRequest {
    userId: number;
    role?: string;
}

export interface TeamResponseAdd {
    id: number;
    name: string;
    created_at: string;
}
    

