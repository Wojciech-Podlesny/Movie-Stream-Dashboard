"use client";
import { useState } from "react";
import { Typography, Button } from "@mui/material";

type ReadMoreProps = {
  text: string;
  limit?: number;
};

export const DescriptionReadMore = ({ text, limit = 100 }: ReadMoreProps) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > limit;
  const preview = text.slice(0, limit) + "...";

  return (
    <>
      <Typography
        variant="body1"
        color="white"
        sx={{
          lineHeight: 1.8,
          fontSize: "1rem",
          whiteSpace: "pre-line",
          letterSpacing: "0.3px",
          textAlign: "justify",
        }}
      >
        {expanded || !isLong ? text : preview}
      </Typography>

      {isLong && (
        <Button
          onClick={() => setExpanded((prev) => !prev)}
          size="small"
          sx={{
            mt: 1,
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "#90caf9",
            textTransform: "none",
            padding: "2px 0",
            minWidth: 0,
            '&:hover': {
              color: "#64b5f6",
              backgroundColor: "transparent",
            },
          }}
        >
          {expanded ? "Read less" : "Read more"}
        </Button>
      )}
    </>
  );
};
