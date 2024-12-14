import { Stack } from "@mui/material";
import { BouncingSkeleton } from "./styles/StyleComponent";

const TypingLoader = () => {
    return (
      <Stack
        spacing={"0.5rem"}
        direction={"row"}
        padding={"0.5rem"}
        justifyContent={"center"}
      >
        <BouncingSkeleton
          variant="circular"
          width={15}
          height={15}
          style={{
            animationDelay: "0.1s",
          }}
        />
        <BouncingSkeleton
          variant="circular"
          width={15}
          height={15}
          style={{
            animationDelay: "0.2s",
          }}
        />
        <BouncingSkeleton
          variant="circular"
          width={15}
          height={15}
          style={{
            animationDelay: "0.4s",
          }}
        />
        <BouncingSkeleton
          variant="circular"
          width={15}
          height={15}
          style={{
            animationDelay: "0.6s",
          }}
        />
      </Stack>
    );
  };

  export default TypingLoader