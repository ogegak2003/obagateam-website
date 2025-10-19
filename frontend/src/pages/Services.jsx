import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      features: ['React & Next.js', 'Responsive Design', 'SEO Optimization', 'E-commerce Solutions', 'CMS Development'],
      price: 'From $2,500',
      popular: true
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Deployment', 'UI/UX Design'],
      price: 'From $5,000'
    },
    {
      icon: '🛠️',
      title: 'ICT Support & Maintenance',
      description: 'Comprehensive IT support services to keep your systems running smoothly.',
      features: ['24/7 Help Desk', 'System Maintenance', 'Troubleshooting', 'Remote Assistance', 'Security Updates'],
      price: 'From $500/mo'
    },
    {
      icon: '🔗',
      title: 'Networking Solutions',
      description: 'Design, implementation, and management of robust network infrastructure.',
      features: ['Network Design', 'Security Implementation', 'Wireless Solutions', 'VPN Setup', 'Cloud Integration'],
      price: 'Custom Quote'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Cloud migration, management, and optimization services for modern businesses.',
      features: ['AWS & Azure', 'Cloud Migration', 'Cost Optimization', 'Security & Compliance', 'DevOps'],
      price: 'From $1,000/mo'
    },
    {
      icon: '🚀',
      title: 'Digital Transformation',
      description: 'Strategic guidance and implementation for your digital transformation journey.',
      features: ['Strategy Consulting', 'Process Automation', 'Digital Innovation', 'Change Management', 'Training'],
      price: 'Custom Quote',
      popular: true
    }
  ];

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
              Our <span className="text-primary-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to drive your business forward and achieve digital excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`card relative ${service.popular ? 'ring-2 ring-primary-500' : ''}`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-primary-600 font-bold text-xl">{service.price}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 text-center block"
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure your project's success from concept to deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We analyze your requirements and define project goals.' },
              { step: '02', title: 'Planning', description: 'Detailed project planning and technology stack selection.' },
              { step: '03', title: 'Development', description: 'Agile development with regular updates and feedback.' },
              { step: '04', title: 'Launch & Support', description: 'Deployment and ongoing maintenance & support.' },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;