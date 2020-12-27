export interface IComment {
  id: number;
  content: string;
  nickname: string;
  createdAt: number;
}
export interface IArticleRes {
  id: number;
  title: string;
  content: string;
  brief: string;
  author: {
    id: number;
    username: string;
  };
  created_at: string;
  updatedAt: string;
  tags: string;
  comments: IComment[];
  cover: string;
}
export interface IArticle {
  id: number;
  title: string;
  content: string;
  brief: string;
  author: {
    id: number;
    username: string;
  };
  created_at: string;
  updatedAt: string;
  splitedTags: string[];
  comments: IComment[];
  cover: string;
}
