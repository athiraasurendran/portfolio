import { MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { FocusTags } from '@/components/ui/FocusTags';
import { site } from '@/data/site';

export function About() {
  return (
    <section id="about" className="section-pad scroll-mt-24">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">About</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-balance font-display text-2xl font-medium leading-[1.25] text-ink sm:text-3xl">
                I turn data into models, models into insights, and ideas into
                working applications.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-5 flex items-center gap-2 text-sm text-ink-faint">
                <MapPin size={14} />
                <span>{site.location}</span>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <FocusTags className="mt-6" />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                I&apos;m a Data Science and Analytics professional with hands-on
                experience working with real-world data, building analytical
                solutions, and turning complex information into meaningful insights.
              </p>
              <p>
                I have hands-on experience working with 32M+ records of confidential,
                large-scale data, where I built data-processing workflows and a
                Flask-based analytical dashboard to transform complex data into clear,
                decision-ready insights. This experience strengthened my ability to
                work with large datasets, identify meaningful patterns, and build
                practical solutions to real-world problems.
              </p>
              <p>
                My background in Economics, with a strong foundation in Mathematics
                and Statistics, shapes how I approach every problem. I focus on
                understanding the problem first, breaking it down logically,
                exploring the data, identifying patterns, and choosing the right
                approach to solve it. Combined with hands-on experience in Python,
                Data Science, Machine Learning, and data visualization, this gives me
                both the quantitative foundation and practical skills to turn
                analytical thinking into working solutions.
              </p>
              <p>
                I believe great data work begins long before a model is built — it
                begins with asking the right questions, thinking critically about the
                problem, and finding a meaningful way forward. That is the mindset I
                bring to every dataset, every analysis, and every solution I build.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
