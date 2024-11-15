import { Container, Grid } from "@radix-ui/themes";
import ChatArea from "./chat-area";
import MessageArea from "./message-area";

const Messenger = () => {
  return (
    <Container>
      <Grid className="h-dvh" columns={{ initial: "1", md: "300px 1fr" }}>
        <ChatArea />
        <MessageArea />
      </Grid>
    </Container>
  );
};

export default Messenger;
