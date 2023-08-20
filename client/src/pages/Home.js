import About from "../components/About";
import Footer from "../components/Footer";
import LandingPage from "../components/Landing";
import { Stack } from '@chakra-ui/react'

const Home = () => {
  return (
    <Stack>
      <LandingPage />
      <About />
      <Footer />
    </Stack>
  );
};

export default Home;
