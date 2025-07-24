'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { TextField, Button, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useSession } from 'next-auth/react';
import { showErrorToast } from './ErrorToast';
import { CommentSectionProps,Comment } from '@/types/comments';


const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 16px;
  color: white;
  max-width: 800px;
  margin: 80px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 24px;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 6px;
  margin: 10px 0 20px;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #facc15, #f59e0b);
  color: white;
  border-radius: 9999px;
  font-weight: bold;
  margin-top: 25px;
  padding: 8px 24px;
  &:hover { background: linear-gradient(to right, #fbbf24, #f59e0b); }
`;

const CommentsList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CommentItem = styled.div`
  background: #2e2e2e;
  padding: 16px;
  border-radius: 12px;
  animation: ${fadeInUp} 0.4s ease forwards;
`;

const CommentHeader = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
  color: #999;
  strong { color: #facc15; }
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 15px;
  color: #ddd;
`;

const NoComment = styled.p`
  text-align: center;
  color: #aaa;
  margin-top: 30px;
  font-style: italic;
`;

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
          console.log("Failed to fetch comments:", data);
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
    <Container>
      <Title>Leave a Review</Title>

      <label>Rating (1–10):</label>
      <StarsContainer>
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
      </StarsContainer>

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

      <StyledButton fullWidth onClick={handleSubmit} disabled={!text || rating === 0}>
        Submit Review
      </StyledButton>

      {comments.length === 0 ? (
        <NoComment>No comments yet. Be the first!</NoComment>
      ) : (
        <CommentsList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentHeader>
                <strong>{comment.username}</strong> ({comment.date} | {comment.rating}/10)
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
        </CommentsList>
      )}
    </Container>
  );
};
