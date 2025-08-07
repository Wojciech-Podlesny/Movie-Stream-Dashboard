'use client';

import React, { useState, useEffect } from 'react';

import { TextField, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useSession } from 'next-auth/react';
import { showErrorToast } from './ErrorToast';
import { CommentSectionProps, Comment } from '@/types/comments';
import { EmptyReviewMessage, ReviewContainer, ReviewList, ReviewMeta, ReviewText, ReviewTitle, SingleReview, StarRating, SubmitReviewButton } from '@/styles/CommentForm.styled';

export const CommentForm = ({ itemId, type }: CommentSectionProps) => {
  const { data: session } = useSession();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/account/comments?itemId=${itemId}&type=${type}`);
        const data = await res.json();
        if (res.ok) {
          const formatted = data.map((c) => ({
            id: c.id,
            username: c.username,
            text: c.text,
            rating: c.rating,
            date: new Date(c.createdAt).toLocaleDateString(),
          }));
          setComments(formatted);
        } else {
          console.error("Fetch error:", data.error);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    fetchComments();
  }, [itemId, type]);

  const handleSubmit = async () => {
    if (!text || rating === 0) return;

    if (!session?.user?.idToken) {
      showErrorToast("You must be logged in to comment.");
      return;
    }

    try {
      const res = await fetch('/api/account/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.idToken}`,
        },
        body: JSON.stringify({ text, rating, itemId, type }),
      });

      const result = await res.json();

      if (!res.ok) {
        showErrorToast(result.error || "Error submitting comment.");
        return;
      }

      setComments((prev) => [
        {
          id: result.id,
          username: session.user.name || session.user.email || "User",
          text,
          rating,
          date: new Date().toLocaleDateString(),
        },
        ...prev,
      ]);

      setText('');
      setRating(0);
    } catch (error) {
      showErrorToast(`Unexpected error. Please try again, ${error}`);
    }
  };

  return (
    <ReviewContainer>
      <ReviewTitle>Leave a Review</ReviewTitle>

      <label>Rating (1–10):</label>
      <StarRating>
        {[...Array(10)].map((_, index) => (
          <Tooltip title={`${index + 1}/10`} key={index}>
            <StarIcon
              onClick={() => setRating(index + 1)}
              style={{
                cursor: 'pointer',
                color: index < rating ? '#facc15' : '#555',
                fontSize: '30px',
              }}
            />
          </Tooltip>
        ))}
      </StarRating>

      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#444',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#666',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#facc15',
          },
        }}
      />

      <SubmitReviewButton fullWidth onClick={handleSubmit} disabled={!text || rating === 0}>
        Submit Review
      </SubmitReviewButton>

      {comments.length === 0 ? (
        <EmptyReviewMessage>No comments yet. Be the first!</EmptyReviewMessage>
      ) : (
        <ReviewList>
          {comments.map((comment) => (
            <SingleReview key={comment.id}>
              <ReviewMeta>
                <strong>{comment.username}</strong> ({comment.date} | {comment.rating}/10)
              </ReviewMeta>
              <ReviewText>{comment.text}</ReviewText>
            </SingleReview>
          ))}
        </ReviewList>
      )}
    </ReviewContainer>
  );
};
