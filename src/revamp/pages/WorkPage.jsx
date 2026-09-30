// #/work: every project, featured first
import PageTitle from "../components/PageTitle";
import ProjectCard from "../components/ProjectCard";
import { featured, selected } from "../data/projects";

export default function WorkPage() {
  return (
    <section className="px-5 md:px-16 lg:px-20 pt-16 md:pt-28">
      <PageTitle>Work</PageTitle>
      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-14">
        {[...featured, ...selected].map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i % 3} />
        ))}
      </div>
    </section>
  );
}
