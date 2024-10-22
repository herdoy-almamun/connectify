import { Box, Container, Grid } from "@radix-ui/themes";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Feed from "./feed";

const Home = () => {
  return (
    <Grid className="h-dvh" rows="60px 1fr" columns="1">
      <Navbar />
      <Container size="4">
        <Grid columns="300px 1fr 300px">
          <Sidebar />
          <Feed />
          <Box>Promotion</Box>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;
