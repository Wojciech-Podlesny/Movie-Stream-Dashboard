export type Comment = {
  id: string;
  username: string;
  date: string;
  text: string;
  rating: number;
};

export type CommentSectionProps = {
  itemId: string;
  type: 'movie' | 'series';
};
