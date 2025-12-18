import { motion } from 'framer-motion';

const testimonials = [
  {
    text: 'These components have completely transformed how I approach UI development. The animations are buttery smooth.',
    author: '@johndoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  },
  {
    text: 'Core UI is really professional. It saved me countless hours. The quality is top-notch.',
    author: '@janedeveloper',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
  },
  {
    text: 'I used this awesome Core UI library to create components in my project. Definitely worth checking out!',
    author: '@designerdev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer',
  },
  {
    text: 'Been using Core UI for my latest project. The animations are incredible and the components are highly customizable.',
    author: '@webwizard',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wizard',
  },
  {
    text: 'Today, I explored Core UI, a collection of lightweight, copy-paste React components.',
    author: '@codecraft',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=craft',
  },
  {
    text: 'Core UI has set the bar for React component libraries. These are quality components.',
    author: '@techbuilder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=builder',
  },
  {
    text: 'I love using Core UI library. It helps me create stunning UIs with minimal effort.',
    author: '@uidevmaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master',
  },
  {
    text: 'Simply the easiest React components library to use. Love the variety of quality pre-built components.',
    author: '@reactfanatic',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fanatic',
  },
  {
    text: 'Core UI lets you get the best tech stack in your projects. It\'s easy and powerful.',
    author: '@fullstackflow',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=flow',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">
            Loved by <span className="text-gradient">devs worldwide</span>
          </h2>
          <p className="text-gray-400">See what developers are saying about Core UI</p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-8 h-8 rounded-full bg-purple-500/20"
                />
                <span className="text-sm text-purple-400 font-medium">
                  {testimonial.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
