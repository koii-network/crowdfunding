// ui
import { Box, BoxProps } from "@chakra-ui/react";

export function FundingContent(props: BoxProps) {
  return (
    <Box
      textAlign="left"
      sx={{
        "& p:not(:first-child)": {
          mt: 2,
          mx: 0
        },
        "& h6, & h5, & h4, & h3, & h2": {
          mt: 3,
          mx: 0
        },
        "& h6": {
          fontSize: "28px"
        },
        "& h4": {
          fontSize: "xl"
        },
        "& a": {
          color: "green.500",
          textDecor: "underline"
        },
        "& ol, ul": {
          mt: "2",
          mx: "0",
          pl: "2",
          listStyleType: "disc"
        },
        "& img": {
          rounded: "md"
        }
      }}
      {...props}
    />
  );
}
