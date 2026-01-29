export interface TaskRequest {
    projectId: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assigneeId: number;
    dueDate: string;
    orderIndex: number;
}

export interface TaskResponse  {
    id: number;
    project_id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee_id: number;
    due_date: string;
    order_index: number;
    created_at: string;
    updated_at: string;
}

export interface TaskUpdateRequest {
    status?: string;
    priority?: string;
}