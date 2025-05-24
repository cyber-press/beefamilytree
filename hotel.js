document.getElementById("aboutBtn").addEventListener("click", () => {
    document.getElementById("aboutContent").classList.toggle("hidden");
    if ("vibrate" in navigator) navigator.vibrate(50); // Adds vibration effect
});
