import Hero from "../../components/new_component/Hero";
import About from "../../components/new_component/About";
import call_to_action from "../../components/new_component/call_to_action";
import contact from "../../components/new_component/contact";
import faq from "../../components/new_component/faq";
import features from "../../components/new_component/features";
import Header from "../../components/Header_temp";
import Hero_client from "../../components/new_component/Hero_client";
import portfolio from "../../components/new_component/portfolio";
import pricing from "../../components/new_component/pricing";
import recents_posts_section from "../../components/new_component/recents_posts_section";
import service from "../../components/new_component/service";
// import Stats from "../../components/new_component/stats";
// import Team from "../../components/new_component/Team";
// import Testimonials from "../../components/new_component/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Hero />
      <Hero />
      <Hero />
      <Header />
      <Hero_client />
      <portfolio />
      <pricing />
      <recents_posts_section />
      <service />
      {/* <Stats /> */}
      {/* <Team /> */}
      {/* <Testimonials /> */}
    </>
  );
};

export default Home;
