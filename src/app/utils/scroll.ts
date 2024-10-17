export const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const topPosition =
      element.getBoundingClientRect().top + window.scrollY - 220
    window.scrollTo({ top: topPosition, behavior: 'smooth' })
  }
}
