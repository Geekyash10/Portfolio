// Works.jsx
import React from "react";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, live_version } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import './Works.css'

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_version_link,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col sm:flex-row items-center gap-8 w-full timeline-card`}
      style={{ flexDirection: isEven ? "row" : "row-reverse" }}
    >
      {/* Horizontal Connection Line */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-1/4 h-1 bg-secondary z-0 timeline-connection-line"
        style={{
          left: isEven ? "calc(37.5%)" : "calc(62.5%)",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      />

      {/* Connecting Circle */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-6 h-6 bg-secondary rounded-full z-10 
                    border-4 border-white timeline-connection-circle"
        style={{ left: "50%" }}
      />

      {/* Photo Section */}
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className="relative z-10 w-full sm:w-1/2 timeline-photo-section"
      >
       
          <div className="relative w-full h-[200px]">
            <img
              src={image}
              alt="project_image"
              className="w-full h-full object-contain rounded-2xl"
            />
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover  works-cards">
              
              {live_version_link && (
                <div
                  onClick={() => window.open(live_version_link, "_blank")}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                >
                  <img
                    src={live_version}
                    alt="live version"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              )}
              {source_code_link && (
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
              )}
            </div>
          </div>
      
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className="w-full sm:w-1/2 flex flex-col gap-4 z-10 timeline-content-section"
      >
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div id="projects" variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described
          with links to code repositories and live demos. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="relative mt-20 flex flex-col gap-12 timeline-container">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondary timeline-line" />

        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");


