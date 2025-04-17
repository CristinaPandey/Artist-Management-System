import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          pr: { md: 3, lg: 0, xl: 0 },
          width: { md: "110%", lg: "115%", xl: "120%" },
          maxWidth: "1900px",
        }}
      >
        <Divider />

        <Box
          sx={{
            display: "grid",
            mt: 3,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
              xxl: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        ></Box>
      </Box>
    </>
  );
}
