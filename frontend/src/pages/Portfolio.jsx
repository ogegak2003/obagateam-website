import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'Full-featured online store with payment integration and inventory management.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'mobile',
      description: 'Secure mobile banking application with biometric authentication.',
      image: '📱',
      technologies: ['React Native', 'Firebase', 'Plaid API'],
      link: '#'
    },
    {
      id: 3,
      title: 'Corporate Website',
      category: 'web',
      description: 'Modern corporate website with CMS and multilingual support.',
      image: '🏢',
      technologies: ['Next.js', 'Tailwind CSS', 'Contentful'],
      link: '#'
    },
    {
      id: 4,
      title: 'Fitness Tracking App',
      category: 'mobile',
      description: 'Health and fitness tracking application with social features.',
      image: '💪',
      technologies: ['Flutter', 'Firebase', 'HealthKit'],
      link: '#'
    },
    {
      id: 5,
      title: 'Cloud Migration',
      category: 'cloud',
      description: 'Enterprise cloud infrastructure migration and optimization.',
      image: '☁️',
      technologies: ['AWS', 'Docker', 'Kubernetes'],
      link: '#'
    },
    {
      id: 6,
      title: 'IoT Dashboard',
      category: 'web',
      description: 'Real-time monitoring dashboard for IoT devices.',
      image: '📊',
      technologies: ['Vue.js', 'WebSocket', 'Chart.js'],
      link: '#'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'cloud', label: 'Cloud Solutions' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary-600">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our latest projects and see how we've helped businesses achieve their digital goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="card group cursor-pointer"
                >
                  <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-200">
                    {project.image}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-center">
                    <a
                      href={project.link}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Project
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try selecting a different filter category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Let's work together to bring your ideas to life with our expertise and creativity.
            </p>
            <a
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-2xl inline-block"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;