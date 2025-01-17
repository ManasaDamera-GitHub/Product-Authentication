let container = document.getElementById("container")

async function fetchData() {
    let response = await fetch("https://military-holy-begonia.glitch.me/data")

    try {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        let data = await response.json();
        data.forEach(obj => {
            let item = document.createElement("div")
            item.innerHTML = `
                    <img src = '${obj.image}' alt = '${obj.title}'>
                    <h3>${obj.title}</h3>
                    <p>${obj.category}</p>
                    <p>Rs.${obj.price}</p>
                    <button class="buy-now">Buy Now</button>
            `
            container.appendChild(item)

        })

        // adding event listeners to all buy now buttons
        document.querySelectorAll(".buy-now").forEach(Button => {
            Button.addEventListener("click", () => {
                showToast('success', 'Order placed successfully!'); // Success toast
            });
        });


    } catch (error) {
        console.error(error)
        showToast('failure', 'Failed to keep order'); // Failure toast
    }

}
function showToast(type, message) {
    // Create a new toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    // window.location.href = "user.html"
    // Add the toast to the container
    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    // Remove the toast after the animation ends
    setTimeout(() => {
        toast.remove();
    }, 3000); // Matches the duration of the animation


}

document.addEventListener("DOMContentLoaded", fetchData)