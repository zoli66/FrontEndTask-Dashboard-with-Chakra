import { IconButton, Link } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

function AddFavButton({ to }: { to?: string }) {
  return (
    <Link
      href={to || "#"}
      _hover={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <IconButton
        aria-label="Add item"
        borderRadius="full"
        size="lg"
        colorPalette="blue"
        boxShadow="lg"
        // Fixed position
        position="fixed"
        bottom="10"
        right="10"
        zIndex="sticky"
        _hover={{ transform: "scale(1.1)" }}
      >
        <LuPlus />
      </IconButton>
    </Link>
  );
}

export default AddFavButton;
