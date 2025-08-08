import { z } from "zod";

export const CommentCreateSchema = z.object({
  text: z
    .string({ required_error: "Comment is required" })
    .trim()
    .min(5, "Comment must be at least 5 characters")
    .max(1000, "Comment must be at most 1000 characters"),
  rating: z
    .number({ required_error: "Rating is required" })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10"),
  itemId: z.string().min(1),
  type: z.enum(["movie", "series", "other"]).or(z.string().min(1)), // dopasuj do swoich typów
});

export type CommentCreateInput = z.infer<typeof CommentCreateSchema>;
