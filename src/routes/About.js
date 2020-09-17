import React from "react";
import styled from "styled-components";

const About = () => (
  <Wrapper>
    <Container>
      <Header>What is ShotSpots?</Header>
      <Paragraph>
        ShotSpots is first and foremost a search engine for finding great places
        to take photos. Think of it as a mashup between{" "}
        <Link href="https://www.shothotspot.com/">ShotHotspot</Link> and{" "}
        <Link href="https://www.alltrails.com/">AllTrails</Link>... the
        functionality closely mirrors the former and the design was heavily
        inspired by the latter. Use this app to plan out your next shoot, get a
        heads up on what gear to bring, and connect with other like minded
        photographers.
      </Paragraph>
      <Header>How does it work?</Header>
      <Paragraph>
        What makes ShotSpots unique is that it doesn't just pull from user
        created spots, we actually combine the technology behind{" "}
        <Link href="https://cloud.google.com/maps-platform/places">
          Google's Places API
        </Link>{" "}
        and <Link href="https://www.flickr.com/">Flickr's</Link> photo database
        to automatically currate the best spots. You can still create custom
        spots if you like, but because we automatically figure them out, you've
        already got millions to discover.
      </Paragraph>
      <Paragraph>
        Once you've discovered and clicked on a hotspot, we store it in our
        database. We then decide its ranking based on stuff like user reviews
        and the number of views.
      </Paragraph>
      <Paragraph>
        Anyone who signs up can add their own spots or enrich existing spots by
        updating them with more information. This means that over time
        ShotHotspot will get even more accurate as more spots are discovered,
        ranked or enriched.
      </Paragraph>
      <Header>Why did you make this?</Header>
      <Paragraph>
        I created ShotSpots to solve the problem of never being able to find new
        and exciting photography locations. Nobody wants to visit the same old
        locations over and over again, but not many people have the time to
        explore by trial and error either. This is where ShotSpots comes in, it
        does all the heavy lifting for you. By standing on the shoulders of
        those photograpgers who came before us, we can actually enjoy the
        process instead of having to worry so much about the logistics.
      </Paragraph>
      <Paragraph>
        Creating this site also gave me a chance to test my skills and build
        something portfolio worthy! After being inspired by the sites upon which
        this app was based I thought to myself, "I can do this!" and so I set
        out to prove to myself and the world that I could... That being said, I
        am currently in the process of looking for an entry level software
        engineering position. Please feel free to check out my other work here.
      </Paragraph>
      <Paragraph>Thank you for stopping by and good luck shooting!!!</Paragraph>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 90px 20px;
`;

const Container = styled.div`
  padding: 20px 30px;
  background: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 900;
  color: #2d3748;
  padding: 20px 0 10px 0;
`;

const Paragraph = styled.p`
  color: #4a5568;
  padding: 10px 0;
  line-height: 22px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #4299e1;
`;

export default About;
