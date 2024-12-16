import React from "react";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, description }) => (
  <div className='xs:w-[250px] w-full '>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-8 px-8 flex flex-col justify-between items-center h-[320px] sm:py-3' // Set a fixed height
      >
        <img
          src={icon}
          alt={title.toLowerCase()}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>

        <p className='text-white text-[14px] text-left mt-0'>
          {description}
        </p>
      </div>
    </motion.div>
  </div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] leading-[30px]'
      >
        I am a MERN stack developer with a passion for building dynamic and engaging web applications. Leveraging my expertise in both front-end and back-end technologies, I create responsive and user-friendly interfaces that enhance digital experiences. By merging creativity with technical skills, I aim to deliver innovative solutions that meet the needs of users and clients alike. From initial concept to final deployment, I am committed to exceeding expectations and ensuring seamless functionality in the fast-paced world of web development.
      </motion.p>

      <div
  className="mt-10 flex flex-wrap gap-10  lg:justify-between md:justify-center justify-center"
>
  {services.map((service, index) => (
    <ServiceCard key={service.title} index={index} {...service} />
  ))}
</div>

    </>
  );
};

export default SectionWrapper(About, "about");