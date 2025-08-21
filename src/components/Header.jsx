import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          mb: 3,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Welcome to My Store
        </Typography>
      </Box>
    </>
  );
};

export default Header;
