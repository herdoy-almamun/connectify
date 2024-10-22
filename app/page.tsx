import { Container, Grid } from "@radix-ui/themes";
import Feed from "./feed";
import Navbar from "./navbar";
import SidebarLeft from "./sidebar-left";
import SidebarRigh from "./sidebar-right";

const Home = () => {
  return (
    <Grid className="h-dvh" rows="60px 1fr" columns="1">
      <Navbar />
      <Container size="4">
        <Grid columns={{ initial: "1", md: "300px 1fr 300px" }}>
          <SidebarLeft />
          <Feed />
          <SidebarRigh />
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;
