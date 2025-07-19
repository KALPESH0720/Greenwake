document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("galaxyTimeline");
  if (!container) {
    console.warn("Element #galaxyTimeline not found.");
    return;
  }

  const galaxyEvents = [
    { read:"https://www.sugiproject.com/blog/miyawaki-method-for-creating-forests", title: "Urban Forestry Mission", description: "- transforming degraded land into green spaces using the Miyawaki method, creating “green lungs” in cities. Conducting green drives to inspire people" },
{read:"https://swachhindia.ndtv.com/goa-beating-plastic-pollution-keep-sandy-sun-kissed-beaches-pristine-20866/",  title: "Eco-Friendly Tourism", description: "promote responsible behavior among visitors, including proper waste disposal" },
{ read:"https://swachhindia.ndtv.com/goa-beating-plastic-pollution-keep-sandy-sun-kissed-beaches-pristine-20866/", title: "Community Clean-Ups", description: "Encouraging people to contribute to community services like cleaning and use 3R principles" },
{ read:"https://swachhindia.ndtv.com/goa-beating-plastic-pollution-keep-sandy-sun-kissed-beaches-pristine-20866/", title: "School Engagement", description: "Over 400 schools are involved in waste segregation, turning students into “foot soldiers” for sustainability" },   
  ];

  galaxyEvents.forEach(event => {
    const card = document.createElement("div");
    card.className = "galaxy-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.border = "2px solid #48D1CC";
    card.style.borderRadius = "10px";
    card.style.padding = "1rem";
    card.style.marginBottom = "1rem";
    card.style.background = "#1A1A1A";
    card.style.color = "#F5F5F5";
    card.style.fontFamily = "'Orbitron', sans-serif";

    card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>${event.era}</strong></p>
      <p>${event.description}</p>
      <a href=${event.read}>read more</a>
    `;
    container.appendChild(card);
  });

  
  gsap.to(".galaxy-card", {
    opacity: 1,
    y: 0,
    stagger: 0.3,
    duration: 1,
    ease: "power3.out"
  });
});