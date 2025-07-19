document.querySelector(".btn").addEventListener('click',()=>{

    const box = document.querySelector(".form");
    box.classList.toggle("hide");
    console.log("clicked")
  

});
console.log("hello")


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