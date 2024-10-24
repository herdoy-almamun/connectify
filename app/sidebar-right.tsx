import { Box } from "@radix-ui/themes";
import ActiveFriends from "./_components/active-friends";
import FriendRequests from "./_components/friend-requests";

const SidebarRigh = () => {
  return (
    <Box
      display={{ initial: "none", md: "block" }}
      py="2"
      className="space-y-2 h-[calc(100dvh-60px)] overflow-auto ps-6"
    >
      <FriendRequests />
      <ActiveFriends />
    </Box>
  );
};

export default SidebarRigh;
