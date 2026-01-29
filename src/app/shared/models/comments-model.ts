export interface CommentRequest{
    taskId: number;
    body: string;
}

export interface CommentResponse{
    id: number;
    task_id: number;
    user_id: number;
    body: string;
    created_at: string;
    author_name: string;
}
     

export interface CommentResponseAfterCreate{
    id: number;
    task_id: number;
    user_id: number;
    body: string;
    created_at: string;
}