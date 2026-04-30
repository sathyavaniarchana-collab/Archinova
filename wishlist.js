function toggleSave(button, designName) {

    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (saved.includes(designName)) {
        saved = saved.filter(item => item !== designName);
        button.classList.remove("saved");
        showToast("Removed from Wishlist ❌");
    } else {
        saved.push(designName);
        button.classList.add("saved");
        showToast("Added to Wishlist ❤️");
         createHeartBurst(button);
    }

    localStorage.setItem("wishlist", JSON.stringify(saved));
    updateWishlistCount();
}

function showToast(message) {

    // 🔊 SOUND EFFECT (ADD HERE)
    const sound = new Audio("click.mp3");
    sound.volume = 0.4;
    sound.play();

    const toast = document.createElement("div");
    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "40px";
    toast.style.right = "40px";
    toast.style.padding = "16px 28px";
    toast.style.borderRadius = "14px";
    toast.style.fontWeight = "600";
    toast.style.fontSize = "15px";
    toast.style.backdropFilter = "blur(15px)";
    toast.style.background = "rgba(255,255,255,0.08)";
    toast.style.color = "#ffffff";
    toast.style.border = "1px solid rgba(255,255,255,0.2)";
    toast.style.boxShadow = "0 0 25px rgba(0,255,213,0.6)";
    toast.style.zIndex = "999999999";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(30px)";
    toast.style.transition = "all 0.5s ease";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 10);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(30px)";
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}
function createHeartBurst(button) {

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement("span");
        heart.innerHTML = "❤️";

        heart.style.position = "absolute";
        heart.style.fontSize = "14px";
        heart.style.pointerEvents = "none";
        heart.style.left = button.offsetLeft + 10 + "px";
        heart.style.top = button.offsetTop + 10 + "px";
        heart.style.transition = "all 0.6s ease";
        heart.style.zIndex = "999999";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform =
                `translate(${Math.random()*60-30}px, -${Math.random()*80}px) scale(1.5)`;
            heart.style.opacity = "0";
        }, 10);

        setTimeout(() => heart.remove(), 600);
    }
}
function updateWishlistCount() {
    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    const countElement = document.getElementById("wishlistCount");
    if (countElement) {
        countElement.innerText = saved.length;
    }
}
window.onload = function() {

    updateWishlistCount();

    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

   document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", function() {
        const designName = this.dataset.name;
        toggleSave(this, designName);
    });
});
};
function createHeartBurst(button) {

    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {

        const heart = document.createElement("span");
        heart.innerHTML = "❤️";

        heart.style.position = "fixed";
        heart.style.left = rect.left + rect.width / 2 + "px";
        heart.style.top = rect.top + rect.height / 2 + "px";
        heart.style.fontSize = "14px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999999";
        heart.style.transition = "all 0.7s ease";

        document.body.appendChild(heart);

        const x = (Math.random() - 0.5) * 120;
        const y = -Math.random() * 120;

        setTimeout(() => {
            heart.style.transform = `translate(${x}px, ${y}px) scale(1.5)`;
            heart.style.opacity = "0";
        }, 10);

        setTimeout(() => heart.remove(), 700);
    }
}
