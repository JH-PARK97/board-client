export interface PostListItem {
    map(arg0: (post: any, idx: number) => import("react").JSX.Element): import("react").ReactNode
    id: number
    title: string
    content: string
    likeCount: number
    createdAt: string
    updatedAt: string
    userId: number
    user: User
  }
  
  export interface User {
    nickname: string
  }
  