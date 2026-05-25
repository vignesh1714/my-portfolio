/** Resolve project image path for Next.js public folder */
export function getProjectImage(project) {
  if (!project?.image) return null;
  return project.image.startsWith("/") ? project.image : `/projects/${project.image}`;
}

export function getProjectGallery(project) {
  const gallery = project?.gallery || [];
  return gallery.map((src) => (src.startsWith("/") ? src : `/projects/${src}`));
}
