export interface IComment {
  id: number;
  content: string;
  nickname: string;
  created_at: number;
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
  updated_at: string;
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
  updated_at: string;
  splitedTags: string[];
  comments: IComment[];
  cover: string;
}

export interface Index {
  title: string;
  indent: number;
}
