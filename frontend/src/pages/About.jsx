import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const team = [
    {
      name: 'obaga kevin',
      role: 'CEO & Founder',
      bio: '20+ years in technology leadership and digital transformation.',
      image: '👨‍💼',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Expert in cloud architecture and scalable software solutions.',
      image: '👩‍💻',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Development',
      bio: 'Full-stack developer specializing in modern web technologies.',
      image: '👨‍🔧',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Emily Davis',
      role: 'UX/UI Lead',
      bio: 'Creative designer focused on user-centered design principles.',
      image: '👩‍🎨',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'David Kim',
      role: 'DevOps Engineer',
      bio: 'Infrastructure and deployment automation specialist.',
      image: '👨‍💻',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Lisa Thompson',
      role: 'Project Manager',
      bio: 'Agile project management and client relationship expert.',
      image: '👩‍💼',
      social: { twitter: '#', linkedin: '#' }
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we deliver.'
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'We work collaboratively with our clients as true partners.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We embrace new technologies and creative solutions.'
    },
    {
      icon: '⚡',
      title: 'Agility',
      description: 'We adapt quickly to changing requirements and market needs.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">obagaTeam</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We are a passionate team of developers, designers, and technology experts dedicated to 
              transforming ideas into exceptional digital experiences that drive business growth and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, obagaTeam began as a small group of technology enthusiasts with a shared vision: 
                  to make high-quality digital solutions accessible to businesses of all sizes.
                </p>
                <p>
                  What started as a passion project has grown into a full-service technology partner, 
                  serving clients across various industries with innovative web and mobile solutions, 
                  comprehensive ICT support, and strategic digital transformation services.
                </p>
                <p>
                  Today, we're proud to have helped numerous businesses achieve their digital goals 
                  while maintaining our commitment to excellence, innovation, and client satisfaction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white"
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-primary-100">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-primary-100">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">3+</div>
                  <div className="text-primary-100">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-primary-100">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as a team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-primary-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to delivering exceptional results for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.social.twitter} className="text-gray-400 hover:text-primary-600 transition-colors duration-200">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-current rounded"></div>
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-primary-600 transition-colors duration-200">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-current rounded"></div>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;