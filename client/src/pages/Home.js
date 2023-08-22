import About from "../components/About";
import LandingPage from "../components/Landing";
import { Stack } from '@chakra-ui/react'

const Home = () => {
  return (
    <Stack>
      <LandingPage />
      <About />
    </Stack>
  );
};

export default Home;
