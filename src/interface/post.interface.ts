export interface CreatePostInput {
    owner_id: number
    title: string
    description: string
}
  
export interface UpdatePostInput {
    id: number
    title: string
    description: string
}
  