document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById("gallery-grid");

    // ✅ Fetch images dynamically
    fetch("/gallery-images/")
        .then(response => response.json())
        .then(images => {
            images.forEach(filename => {
                const imgDiv = document.createElement("div");
                imgDiv.className = "gallery-item";

                const image = document.createElement("img");
                image.src = `/gallery-images/${filename}`;
                image.alt = filename;
                image.loading = "lazy";
                image.onerror = () => { image.src = "/images/fallback.jpg"; };

                // ✅ Create Download Button
                const downloadBtn = document.createElement("button");
                downloadBtn.className = "download-btn";
                downloadBtn.innerHTML = "⬇️ Download";
                downloadBtn.onclick = () => {
                    const link = document.createElement("a");
                    link.href = image.src;
                    link.download = filename;
                    link.click();
                };

                // ✅ Create Share Button
                const shareBtn = document.createElement("button");
                shareBtn.className = "share-btn";
                shareBtn.innerHTML = "📤 Share";
                shareBtn.onclick = () => {
                    const shareData = {
                        title: "Check out this Bee Family photo!",
                        text: "Sharing an awesome family memory!",
                        url: image.src,
                    };
                    if (navigator.share) {
                        navigator.share(shareData).catch(console.error);
                    } else {
                        alert("Sharing is not supported on this device.");
                    }
                };

                imgDiv.appendChild(image);
                imgDiv.appendChild(downloadBtn);
                imgDiv.appendChild(shareBtn);
                galleryGrid.appendChild(imgDiv);
            });
        })
        .catch(error => console.error("Error loading images:", error));
});

// ✅ Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("theme-toggle").innerText = 
        document.body.classList.contains("dark-mode") ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";
});

// ✅ Smooth Scroll Effect for Navbar
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.top = "-80px";  
    } else {
        navbar.style.top = "0";  
    }
});
