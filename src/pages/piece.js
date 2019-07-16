import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from "gatsby-image"
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import VanillaTilt from 'vanilla-tilt';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px; 
  height: 400px;
  position: relative;
  transform: perspective(1000px);
  transform-style: preserve-3d;

  .gatsby-image-wrapper {
    position: absolute !Important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

class About extends React.Component {
  constructor(props) {
    super(props);
    this.containerEl = React.createRef();
  }

  componentDidMount() {
    VanillaTilt.init(this.containerEl.current, {
      max: 10,
      speed: 400,
      transition: true,
      scale: 1.05
    })
  }

  render() {
    return (
      <Layout>
        <Head pageTitle={'🍌'} />
        <Box>
          <Container ref={this.containerEl}>
            {
              this.props.data.playgroundJson.testing.map((img, i) => {
                let currentImg = this.props.data.playgroundJson.testing[i];
                
                return (
                  <Img 
                    key={currentImg.position} 
                    style={{
                      zIndex: currentImg.position,
                      transform: `translateZ(${currentImg.position * 10}px)`
                    }}
                    fluid={this.props.data.playgroundJson.testing[i].image.childImageSharp.fluid} alt={":)"}
                  />
                )
              })
            }
            {/* 
            <Img class={".test"} fluid={this.props.data.playgroundJson.testing[2].image.childImageSharp.fluid} alt={":)"}/>
            <Img class={".test"} fluid={this.props.data.playgroundJson.testing[1].image.childImageSharp.fluid} alt={":)"}/>
            <Img class={".test"} fluid={this.props.data.playgroundJson.testing[0].image.childImageSharp.fluid} alt={":)"}/> 
            */}
          </Container>
        </Box>
      </Layout>
    )
  }
}

// About.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default About;

export const query = graphql`
query playgroundQuery {
  playgroundJson {
    testing {
      position
      image {
        childImageSharp {
          fluid(maxHeight: 500, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`;