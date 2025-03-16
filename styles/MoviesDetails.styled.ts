import { styled } from "styled-components";


export const Date = styled.p`
    font-size: 1rem;
    margin-top: 15px;
    color: red;
 `;

export const Vote = styled.p`
    font-size: 1rem;
    margin-top: 15px;
    color: red;
 `; 

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #1a1a1a;
  color: #fff;
  border-radius: 10px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  text-align: left;
  color: #fff;
  margin-bottom: 10px;
`;

export const PosterWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const Poster = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.p`
  font-size: 1rem;
  margin-top: 15px;
  color: #ccc;
`;
 