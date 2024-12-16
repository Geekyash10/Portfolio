import { motion } from 'framer-motion';
import { styles } from "../styles";

const Hero = () => {
  const text = "Yash Mittal";
  const characters = Array.from(text);

  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const charVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  const floatVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: [0, -10, 0],
      opacity: 1,
      transition: {
        y: {
          duration: 1.8,
          yoyo: Infinity,
          ease: 'easeInOut',
        },
        opacity: { duration: 1.5 },
      },
    },
  };

  return (
    <section className={`relative w-full h-screen mx-auto z-10`}>
      <div className={`absolute inset-0 top-[150px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#ff0132]' />
          <div className='w-1 sm:h-80 h-60 bg-gradient-to-b from-red-500 to-red-800' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <motion.span
              variants={textVariants}
              initial="initial"
              animate="animate"
              className='text-[#ff0132]'
            >
              {characters.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {/* Floating Animation for p */}
          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            variants={floatVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileInView="visible"
          >
            I'm a Mern Stack Web Developer, <br className='sm:block hidden' />
            very passionate coder, always looking<br className='sm:block hidden' />
            to expand my knowledge and create unique things!
          </motion.p>
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
