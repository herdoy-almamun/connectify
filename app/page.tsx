import { Container, Grid } from "@radix-ui/themes";
import Navbar from "./_components/navbar";
import Feed from "./feed";
import SidebarLeft from "./sidebar-left";
import SidebarRigh from "./sidebar-right";

const Home = () => {
  return (
    <Grid className="h-dvh" rows="60px 1fr" columns="1">
      <Navbar />
      <Container size="4">
        <Grid columns="300px 1fr 300px">
          <SidebarLeft />
          <Feed />
          <SidebarRigh />
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;
