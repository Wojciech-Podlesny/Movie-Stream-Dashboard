import { styled } from "styled-components";

const List = styled.div`
  background-color: #1a1a2e;
  width: 250px;
`;

const Heading = styled.p`
  color: white;
  font-size: 22px;
  padding: 45px;
`

export const FavouritesList = () => {
  return (
    <List>
      <Heading>Favourites</Heading>
    </List>
  );
};