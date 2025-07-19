

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("Email").value.trim();
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if (!name || !email || !file) {
    alert("Please fill in all fields and select an image.");
    return;
  }

  try {
   
    const imageForm = new FormData();
    imageForm.append("file", file);
    imageForm.append("upload_preset", "greenwake_upload");

    const uploadRes = await fetch("https://api.cloudinary.com/v1_1/djqgnr99t/image/upload", {
      method: "POST",
      body: imageForm
    });

    const uploadData = await uploadRes.json();
    const imageUrl = uploadData.secure_url;

    if (!imageUrl) throw new Error("Image upload failed.");

    
    const sheetResponse = await fetch("https://script.google.com/macros/s/AKfycbwAnXKMVazXaRL0pNjAnOwIErsCVtEL9eYgIf5vFW7UWrWwsMW0QrPVFuRfl-QQ0yoQsg/exec", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, 
      body: JSON.stringify({ name, email, imageUrl })
    });

    if (sheetResponse.ok) {
      alert("✅ Success! Your eco-action has been recorded.");
      e.target.reset();
    } else {
      throw new Error("Google Sheet write failed.");
    }

  } catch (error) {
    console.error("❌ Submission error:", error);
    alert("Oops! Something went wrong. Check the console for details.");
  }
});


window.loadHeroes = function(data) {
  const container = document.getElementById("hero-cards");
  if (!container) return;
  container.innerHTML = "";

  data.forEach(hero => {
    if (!hero.name || !hero.imageUrl) return;
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";
    card.innerHTML = `
      <img src="${hero.imageUrl}" class="card-img-top" alt="${hero.name}'s Contribution">
      <div class="card-body">
        <h5 class="card-title">${hero.name}</h5>
        <p class="card-text">Joined the movement this week 🌱</p>
      </div>
    `;
    container.appendChild(card);
  });
};


window.loadAchievements = function(data) {
  const container = document.getElementById("achievement-cards");
  if (!container) return;
  container.innerHTML = "";

  data.forEach(item => {
    if (!item.name || !item.description || !item.imageUrl) return;
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";
    card.innerHTML = `
      <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}'s achievement">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
};


window.addEventListener("DOMContentLoaded", () => {
  const heroesScript = document.createElement("script");
  heroesScript.src = "https://script.google.com/macros/s/AKfycbxhO3KzrlQ25iOL6QJoNi7MBo6akouReImLKcyWKAqT/exec?sheet=Contributions&callback=loadHeroes";
  document.body.appendChild(heroesScript);

  const achievementsScript = document.createElement("script");
  achievementsScript.src = "https://script.google.com/macros/s/AKfycbxhO3KzrlQ25iOL6QJoNi7MBo6akouReImLKcyWKAqT/exec?sheet=Achievements&callback=loadAchievements";
  document.body.appendChild(achievementsScript);
});

window.handleDriveStatus = function(data) {
  const msgContainer = document.getElementById("drive-message");
  const formBox = document.getElementById("volunteer-form-box");

  if (data.hasDrive) {
    msgContainer.innerHTML = `
      <h3>${data.title} 📍</h3>
      <p>${data.description} (Date: ${new Date(data.date).toLocaleDateString()})</p>
      
    `;
    document.getElementById("show-volunteer").addEventListener("click", () => {
      formBox.style.display = "block";
    });
  } else {
    msgContainer.innerHTML = `<h2>Welcome to GreenWake 🌿</h2><p>No upcoming drives at the moment.</p>`;
    formBox.style.display = "none";
  }
};




window.addEventListener("DOMContentLoaded", () => {
  const isEdge = /Edg/.test(navigator.userAgent);
  if (isEdge) {
    document.getElementById("tracking-warning").style.display = "block";
  }
});
const driveScript = document.createElement("script");
driveScript.src = "https://script.google.com/macros/s/AKfycbzZWD494nU4_o4ublBpZ2tjdevYNSg1w9QOjH_pVmpN/exec?callback=handleDriveStatus";
document.body.appendChild(driveScript);



