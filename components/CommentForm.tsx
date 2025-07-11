'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TextField, Button, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

type Comment = {
  id: string;
  username: string;
  date: string;
  text: string;
  rating: number;
};

type Props = {
  itemId: string;
  type: 'movie';
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`;

const Label = styled.p`
  font-weight: bold;
  margin: 16px 0 8px;
  font-size: 1rem;
`;

const StarsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0 20px;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #facc15, #f59e0b);
  color: white;
  border-radius: 9999px;
  padding: 8px 24px;
  text-transform: none;
  font-weight: bold;

  &:hover {
    background: linear-gradient(to right, #fbbf24, #f59e0b);
  }
`;

const CommentsList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CommentItem = styled.div`
  background: #2e2e2e;
  color: #f1f1f1;
  padding: 16px;
  border-radius: 12px;
  position: relative;
  animation: ${fadeInUp} 0.4s ease forwards;
`;

const CommentHeader = styled.div`
  margin-bottom: 6px;
  font-size: 14px;

  strong {
    color: #facc15;
  }

  span {
    color: #999;
    font-size: 13px;
    margin-left: 6px;
  }
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #ddd;
`;

const NoComment = styled.p`
  text-align: center;
  color: #aaa;
  margin-top: 30px;
  font-style: italic;
`;

export const CommentForm = ({ itemId, type }: Props) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?itemId=${itemId}&type=${type}`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to load comments', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [itemId, type]);

  const handleSubmit = async () => {
    if (!text || rating === 0) return;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'TestUser',
          rating,
          text,
          itemId,
          type,
        }),
      });

      const newComment = await res.json();

      if (res.ok) {
        setComments((prev) => [
          ...prev,
          {
            ...newComment,
            username: 'TestUser',
            rating,
            text,
            date: new Date().toLocaleDateString(),
          },
        ]);
        setText('');
        setRating(0);
      } else {
        console.error('Server error:', newComment.message);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <Container>
      <Title>Leave a Review</Title>

      <Label>Rating (1–10):</Label>
      <StarsContainer>
        {[...Array(10)].map((_, index) => (
          <Tooltip title={`${index + 1}/10`} key={index}>
            <StarIcon
              onClick={() => handleStarClick(index)}
              style={{
                cursor: 'pointer',
                color: index < rating ? '#facc15' : '#555',
                fontSize: '30px',
                transition: 'color 0.3s',
              }}
            />
          </Tooltip>
        ))}
      </StarsContainer>

      <Label>Your Comment:</Label>
      <TextField
        fullWidth
        placeholder="Write something about the movie or series..."
        multiline
        rows={3}
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          backgroundColor: '#2c2c2c',
          borderRadius: '12px',
          marginBottom: '20px',
          input: { color: '#f1f1f1' },
          textarea: { color: '#f1f1f1' },
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
        <NoComment>No comments yet. Be the first to write one!</NoComment>
      ) : (
        <CommentsList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentHeader>
                <strong>{comment.username}</strong>
                <span>
                  ({comment.date ?? 'Recently'} | Rating: {comment.rating}/10)
                </span>
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
        </CommentsList>
      )}
    </Container>
  );
};
