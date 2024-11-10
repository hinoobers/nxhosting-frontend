document.addEventListener('DOMContentLoaded', function() {
    let game = "";
    if(window.location.href.includes("minecraft")) {
        game = "Minecraft";
    }

    fetch(`http://srv2.byenoob.com:5080/api/plans?game=${game}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => {
        return response.json();
    }).then(data => {
        if(data.plans) {
            const plans = data.plans;
            const parent = document.getElementById("plans");
            for(let i = 0; i < plans.length; i++) {
                const plan = plans[i];
                const planDiv = document.createElement("div");
                planDiv.className = "plan";

                // Plan Name
                const planName = document.createElement("h2");
                planName.innerText = plan.name;
                planDiv.appendChild(planName);

                // Plan Price
                const planPrice = document.createElement("p");
                planPrice.classList.add("plan-price");
                planPrice.innerText = `${parseFloat(plan.price).toFixed(2)}€`;
                planDiv.appendChild(planPrice);

                // Plan Specifications (RAM, Cores, Storage)
                const specsDiv = document.createElement("div");
                specsDiv.className = "plan-specs";
                const ram = document.createElement("p");
                ram.innerText = `RAM: ${plan.ram} GB`;
                specsDiv.appendChild(ram);
                const cores = document.createElement("p");
                cores.innerText = `Cores: ${plan.cores}`;
                specsDiv.appendChild(cores);
                const storage = document.createElement("p");
                storage.innerText = `Storage: ${plan.storage} GB`;
                specsDiv.appendChild(storage);
                planDiv.appendChild(specsDiv);

                // Plan Description
                const planDescription = document.createElement("p");
                planDescription.classList.add("plan-description");
                planDescription.innerText = plan.description;
                planDiv.appendChild(planDescription);

                // Order Button
                const orderButton = document.createElement("button");
                orderButton.innerText = "Order Now";
                orderButton.addEventListener("click", function() {
                    if(!localStorage.getItem("token")) {
                        window.location.href = "/auth/login.html";
                        return;
                    }
                });
                planDiv.appendChild(orderButton);

                parent.appendChild(planDiv);
            }
        }
    }).catch(error => {
        console.error('Plans fetching failed', error);
    });
});